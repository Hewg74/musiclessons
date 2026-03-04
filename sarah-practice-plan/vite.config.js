import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-icon-180.png', 'vite.svg'],
      manifest: {
        name: 'Sarah Practice Plan',
        short_name: 'Practice Plan',
        description: 'A music practice planning app',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: 'manifest-icon-192.maskable.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: 'manifest-icon-512.maskable.png',
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
