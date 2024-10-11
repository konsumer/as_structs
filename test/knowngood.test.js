import * as w from './knowngood.js'

test('should have tests', () => {
  expect(1 + 1).toBe(2)
})

test('should have add tester wasm function', () => {
  expect(w.add(5, 5)).toBe(10)
})

test('should work with struct input/output', () => {
  // View for WebAssembly memory, can be shared across the host
  const v = new DataView(w.memory.buffer)

  // Setup param (allocate 4 bytes for the Vector struct input)
  const pi = w.malloc(4)
  const po = w.malloc(4)

  // Set the values for x and y at the correct byte offsets (pi and pi + 2)
  v.setUint16(pi, 100, true)
  v.setUint16(pi + 2, 200, true)

  // Call the test function
  w.test(po, pi)

  // Check that the input values were set correctly
  expect(v.getUint16(pi, true)).toBe(100)
  expect(v.getUint16(pi + 2, true)).toBe(200)

  // Check that the copied struct has the correct values
  expect(v.getUint16(po, true)).toBe(200)
  expect(v.getUint16(po + 2, true)).toBe(300)

  // Free the allocated memory
  w.free(pi)
  w.free(po)
})
