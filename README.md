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

I expose `malloc`, `alloca`, and `free` from wasm, so it all works the same as the C null0-carts.