import { unstable_reactRouterRSC } from '@react-router/dev/vite'
import tailwindcss from '@tailwindcss/vite'
import rsc from '@vitejs/plugin-rsc'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [unstable_reactRouterRSC(), rsc(), tailwindcss()],
  resolve: { tsconfigPaths: true },
})
