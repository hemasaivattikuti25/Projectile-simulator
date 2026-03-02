import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// Use '/Projectile-simulator/' for GitHub Pages, '/' for Vercel and local dev
export default defineConfig({
  plugins: [react()],
  base: process.env.GITHUB_PAGES === 'true' ? '/Projectile-simulator/' : '/',
})
