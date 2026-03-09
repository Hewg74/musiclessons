import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon-jungle.png'],
      manifest: {
        name: 'Sarah Practice Plan',
        short_name: 'Practice Plan',
        description: 'A music practice planning app',
        theme_color: '#2c2825',
        background_color: '#2c2825',
        display: 'standalone',
        icons: [
          {
            src: 'icon-jungle.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: 'icon-jungle.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,mp3,wav,m4a,webm}'],
        maximumFileSizeToCacheInBytes: 20 * 1024 * 1024 // 20 MB limit to allow caching of audio tracks
      }
    })
  ],
})
