import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({ 
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,jpg,png,svg}']
      },
      manifest: {
        name: 'Textera - Messaging App',
        short_name: 'Textera',
        description: 'A simple messaging app',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/dist/assets/ico192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/dist/assets/ico512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
     })
  ],
})