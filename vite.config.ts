import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// Generate static HTML files for each route (SEO-friendly)
function prerenderPages() {
  return {
    name: 'prerender-pages',
    closeBundle() {
      const dist = path.resolve(__dirname, 'dist')
      const indexHtml = fs.readFileSync(path.join(dist, 'index.html'), 'utf-8')
      
      const routes = [
        'about',
        'posterous',
        'docs/getting-started',
        'docs/api',
        'docs/workflows',
        'workflows'
      ]
      
      routes.forEach(route => {
        const dir = path.join(dist, route)
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true })
        }
        fs.writeFileSync(path.join(dir, 'index.html'), indexHtml)
      })
    }
  }
}

export default defineConfig({
  plugins: [react(), prerenderPages()],
  base: '/clawederous/',
  build: {
    outDir: 'dist'
  }
})
