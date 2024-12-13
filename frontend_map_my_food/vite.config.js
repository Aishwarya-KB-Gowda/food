import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: 'localhost',
    port: 5173,
    open: true,
    proxy: {
      '/api': 'http://localhost:8080', // Proxy API calls to the backend server
    },
  },
})
