import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Set base to '/pookmon-smp/' for GitHub Pages (matches your repo name)
export default defineConfig({
  plugins: [react()],
  base: '/pookmonsmp/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
})
