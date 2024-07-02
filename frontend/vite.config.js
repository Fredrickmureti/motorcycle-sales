import { defineConfig } from 'vite'
import dotenv from 'dotenv';
import envCompatible from 'vite-plugin-env-compatible';
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
    envCompatible(),
  ],
})
