// basic tester function
export function add(a: i32, b: i32): i32 {
  return a + b;
}

// our test struct
class Vector {
  x: u16;
  y: u16;
  constructor(x: u16 = 0, y: u16 = 0) {
    this.x = x;
    this.y = y;
  }
}

// test function that takes a struct-pointer param, and returns a pointer to a new one that is a copy, added to 100
export function test(ret: Vector, vin:  Vector): void {
  ret.x = vin.x + 100
  ret.y = vin.y + 100
}

// expose memory-management
export function malloc(size: usize, id: u32 = 0): usize {
   const pout = __new(size, id)
  __pin(pout)
  return pout
}

export function free(pointer:usize): void {
  __unpin(pointer)
}
