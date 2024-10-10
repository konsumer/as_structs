import * as w from '../build/debug.js'

test('should have tests', () => {
  expect(1 + 1).toBe(2)
})

test('should have add tester wasm function', () => {
  expect(w.add(5, 5)).toBe(10)
})

test('should work with struct input/output', () => {
  // View for WebAssembly memory, can be shared across the host
  const v = new DataView(w.memory.buffer)

  // Setup param (allocate 4 bytes for the Vector struct)
  const pi = w.allocate(4)

  // Set the values for x and y at the correct byte offsets (pi and pi + 2)
  v.setUint16(pi, 100, true) // Set x = 100 at pi (little-endian)
  v.setUint16(pi + 2, 200, true) // Set y = 200 at pi + 2 (little-endian)

  // Call the test function
  const po = w.test(pi) // Get the pointer to the copied struct

  // Check that the input values were set correctly
  expect(v.getUint16(pi, true)).toBe(100) // Expect x to be 100
  expect(v.getUint16(pi + 2, true)).toBe(200) // Expect y to be 200

  // Check that the copied struct has the correct values
  expect(v.getUint16(po, true)).toBe(100) // Expect x to be 100 in the output
  expect(v.getUint16(po + 2, true)).toBe(200) // Expect y to be 200 in the output

  // Free the allocated memory
  w.free(pi)
  w.free(po)
})
