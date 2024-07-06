import { defineConfig } from 'vite';
import dotenv from 'dotenv';
import envCompatible from 'vite-plugin-env-compatible';
import react from '@vitejs/plugin-react';

// Load environment variables from .env file
dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    envCompatible(),
  ],
  build: {
    outDir: 'dist', // Ensure the output directory is set to 'dist'
    rollupOptions: {
      output: {
        // Ensure correct asset paths
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]'
      }
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://backend-api-pi-black.vercel.app',
        changeOrigin: true,
        secure: false
      }
    }
  }
});