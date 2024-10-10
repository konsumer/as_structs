# as_structs

An example of passing C-structs to and from assemblyscript.

Here I have a simple struct that would look like this, in C:

```c
typedef struct {
  uint16_t x;
  uint16_t y;
} Vector;
```

I pass it to an assemblyscript function (`test`) that will add `100` to `x`/`y` and return it. Pointers (to wasm-memory) are used for all.

## memory management

I expose `malloc`, `alloca`, and `free` from wasm, so it works the same in any wasm-language. Wasm-languages that do not have a way to manage their own memory will need some sort of adapter (maybe expose host functions?)

In null0, the return-pointer of functions is always first param, if it returns a struct, so no memory-management needs to be exposed to host. These functions might still be useful wasm-side, to allocate return-values, though.

### examples

in assemblyscript-made wasm, that looks like this:

```ts
export function malloc(size: usize, id: u32 = 0): usize {
   const pout = __new(size, id)
  __pin(pout)
  return pout
}

// there might be a better way to do alloca, but currently it's just a copy of malloc
export const alloca=malloc

export function free(pointer:usize): void {
  __unpin(pointer)
}
```

In wasm made with C, it would look like this:

```c
#define NULL0_EXPORT(n) __attribute__((export_name(n)))

NULL0_EXPORT("malloc")
void* _null0_malloc(size_t size) {
  return malloc(size);
}

NULL0_EXPORT("alloca")
void* _null0_alloca(size_t size) {
  return __builtin_alloca(size);
}

NULL0_EXPORT("free")
void _null0_free(void* ptr) {
  free(ptr);
}
```

In rust-made wasm, that would look like this:

```rust
#![no_std]
extern crate alloc;

use core::alloc::Layout;

pub unsafe extern "C" fn malloc(size: u32, alignment: u32) -> *mut u8 {
  let layout = Layout::from_size_align_unchecked(size as usize, alignment as usize);
  alloc::alloc::alloc(layout)
}

pub unsafe extern "C" fn free(ptr: *mut u8, size: u32, alignment: u32) {
  let layout = Layout::from_size_align_unchecked(size as usize, alignment as usize);
  alloc::alloc::dealloc(ptr, layout);
}
```
