import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['./src/index.ts', './src/*/{domain,dto}/*.ts'],
  minify: true,
  shims: true,
  dts: true,
  outputOptions: {
    chunkFileNames: '_internal/[name]-[hash].mjs',
  },
})
