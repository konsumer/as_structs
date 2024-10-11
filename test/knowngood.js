import { readFile } from 'fs/promises'

const mod = await WebAssembly.instantiate(await readFile('build/knowngood.wasm'), { wasi_snapshot_preview1: { proc_exit () {} } })
export const { add, test, malloc, free, memory } = mod.instance.exports
