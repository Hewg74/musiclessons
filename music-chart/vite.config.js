import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon-jungle.png'],
      manifest: {
        name: 'Music Chart',
        short_name: 'Music Chart',
        description: 'Strum chart builder and music tools',
        theme_color: '#2c2825',
        background_color: '#2c2825',
        display: 'standalone',
        icons: [
          {
            src: 'icon-jungle.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'icon-jungle.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,mp3,wav,m4a,webm}'],
        maximumFileSizeToCacheInBytes: 20 * 1024 * 1024
      }
    })
  ],
})
