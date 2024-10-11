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

export function free(pointer:usize): void {
  __unpin(pointer)
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
export function test(retp: usize, vinp:  usize): void {
  const ret = changetype<Vector>(retp)
  const vin = changetype<Vector>(vinp)
  ret.x = vin.x + 100
  ret.y = vin.y + 100
}

@external("env", "test_callback")
declare function _host_test_callback(ret:usize, vin:usize): void

// test function that calls host function that takes/returns struct, return value that host passed
export function test_callout(): Vector {
  const ret = new Vector(0, 0)
  const vin = new Vector(100, 100)
  _host_test_callback(changetype<usize>(ret), changetype<usize>(vin))
  return ret
}


