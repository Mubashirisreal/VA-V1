import { defineConfig } from 'vite';

export default defineConfig({
  // ... other config options
  resolve: {
    alias: {
      buffer: 'rollup-plugin-node-polyfills/polyfills/buffer-es6',
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
    },
  },
});
