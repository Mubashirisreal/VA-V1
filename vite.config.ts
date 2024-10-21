import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      include: ['buffer', 'process', 'util', 'stream', 'events']
    })
  ],
  define: {
    'process.env': {}
  },
  resolve: {
    alias: {
      buffer: 'buffer',
    },
  },
})