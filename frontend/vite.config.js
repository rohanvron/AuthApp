import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/AuthApp/',
  server: {
    proxy: {
      '/api': 'https://auth-app-wine-one.vercel.app'
    }
  }
})
