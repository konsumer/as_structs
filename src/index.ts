// our test struct
class Vector {
  x: u16;
  y: u16;
  static _size:i32 = 4;
  constructor(x: u16 = 0, y: u16 = 0) {
    this.x = x;
    this.y = y;
  }
}

// basic tester function
export function add(a: i32, b: i32): i32 {
  return a + b;
}

// expose memory-management
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

// test function that takes a struct-pointer param, and returns a pointer to a new one that is a copy
export function test(pin: usize): usize {
  const x = load<u16>(pin);
  const y = load<u16>(pin + 2); // skip the size of first param
  const vector = new Vector(x, y);

  // copy to a new struct
  const pout = malloc(Vector._size)
  store<u16>(pout, x);
  store<u16>(pout + 2, y);

  return pout;
}
