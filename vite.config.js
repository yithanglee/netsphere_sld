import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    root: '.',
    server: {
      port: 5274,
      open: true,
      proxy: {
        '/css': {
          target: env.VITE_API_URL,
          changeOrigin: true,
          secure: false
        },
        '/js': {
          target: env.VITE_API_URL,
          changeOrigin: true,
          secure: false
        },
        '/webfonts': {
          target: env.VITE_API_URL,
          changeOrigin: true,
          secure: false
        },
        '/images': {
          target: env.VITE_API_URL,
          changeOrigin: true,
          secure: false
        },
        '/vendor': {
          target: env.VITE_API_URL,
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
      host: '127.0.0.1',
      open: true,
      allowedHosts: ['netspheremall.com', 'www.netspheremall.com']
    },
    build: {
      outDir: 'dist',
      emptyOutDir: true,
    }
  };
});
