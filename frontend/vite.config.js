import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/user': 'http://localhost:3000',
      '/api': 'http://localhost:3000',
      '/protected': 'http://localhost:3000',
    }
  }
})
