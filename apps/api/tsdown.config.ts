import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: './src/worker.ts',
  minify: true,
  shims: true,
  dts: true,
})
