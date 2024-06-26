import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:4001',
      '/ws': {
        target: 'ws://localhost:4001',
        ws: true,
      },
    },
  },
});