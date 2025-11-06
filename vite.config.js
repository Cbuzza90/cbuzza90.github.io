// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // important for CF Pages + clean URLs/assets at domain root
  base: '/',
})
