import { readFile } from 'fs/promises'

const mod = await WebAssembly.instantiate(await readFile('build/knowngood.wasm'), {
  wasi_snapshot_preview1: {
    proc_exit () {}
  },
  env: {
    test_callback: (ret, vin) => globalThis.test_callback(ret, vin)
  }
})
export const { add, test, test_callout, malloc, free, memory } = mod.instance.exports
