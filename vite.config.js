import { defineConfig } from "vite";

export default defineConfig({
  root: '.',
  server: {
    port: 5274,
    open: true,
    proxy: {
      '/css': {
        target: 'http://localhost:4700',
        changeOrigin: true,
        secure: false
      },
      '/js': {
        target: 'http://localhost:4700',
        changeOrigin: true,
        secure: false
      },
      '/webfonts': {
        target: 'http://localhost:4700',
        changeOrigin: true,
        secure: false
      },
      '/images': {
        target: 'http://localhost:4700',
        changeOrigin: true,
        secure: false
      },
      '/vendor': {
        target: 'http://localhost:4700',
        changeOrigin: true,
        secure: false
      }
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
    }
  },
  preview: {
    port: 5274,
    open: true
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  }
});
