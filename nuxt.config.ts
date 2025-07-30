// https://nuxt.com/docs/api/configuration/nuxt-config

import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: ['@pinia/nuxt', 'nuxt-security', '@nuxt/image'],
  image: {
    provider: 'ipx',              // Built-in optimizer
    domains: ['res.cloudinary.com'],
    quality: 80,
    format: ['webp', 'avif'],
    screens: { xs: 320, sm: 640, md: 768, lg: 1024, xl: 1280 }
  },
  vite: {
    plugins: [
      tailwindcss(),
    ]
  },
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.BACKEND_URL || 'https://oseahumen-agboifoh-john.duckdns.org/api',
      // apiBaseUrl: process.env.BACKEND_URL || 'http://localhost:8000/api',

    }
  },
  security: {
    headers: {
      contentSecurityPolicy: {
        'img-src': [
          "'self'",
          'data:',
          'https://res.cloudinary.com',
          'https://*.cloudinary.com'
        ],
        'script-src': [
          "'self'",
          "'unsafe-inline'",
          ...(process.env.NODE_ENV === 'development' ? ["'unsafe-eval'"] : [])
        ]
      }
    }
  }
})