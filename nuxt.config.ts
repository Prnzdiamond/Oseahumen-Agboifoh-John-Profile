// https://nuxt.com/docs/api/configuration/nuxt-config

import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: ['@pinia/nuxt', 'nuxt-security', '@nuxt/image', '@nuxtjs/sitemap'],
  image: {
    provider: 'ipx',
    domains: ['res.cloudinary.com'],
    quality: 80,
    format: ['webp', 'avif'],
    screens: { xs: 320, sm: 640, md: 768, lg: 1024, xl: 1280 }
  },
  vite: {
    plugins: [
      tailwindcss(),
    ],
    server: {
      allowedHosts: ['ed64e78b8c36.ngrok-free.app']
    },
  },
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.BACKEND_URL || 'https://oseahumen-agboifoh-john.duckdns.org/api',
      // Add your production domain to allowed hosts
      allowedHosts: [
        'oseahumen-agboifoh-john.vercel.app',
        'oseahumen-agboifoh-john-profile-82mmpd8fy-prnzdiamonds-projects.vercel.app'
      ]
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
        ],
        'connect-src': [
          "'self'",
          'https://oseahumen-agboifoh-john.duckdns.org'
        ]
      }
    }
  },
  nitro: {
    prerender: {
      routes: ['/sitemap.xml', '/robots.txt']
    }
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    }
  },
  sitemap: {

    sitemapName: 'sitemap',
    siteUrl: process.env.NUXT_SITE_URL || 'https://oseahumen-agboifoh-john.vercel.app',
    xsl: false,
    routes: async () => {
      return [
        {
          url: '/',
          changefreq: 'weekly',
          priority: 1,
          lastmod: new Date().toISOString(),
          images: [
            {
              loc: 'https://oseahumen-agboifoh-john.vercel.app/preview.jpg',
              caption: 'Oseahumen Agboifoh John - Full-stack Developer Portfolio'
            }
          ]
        },
        {
          url: '/about',
          changefreq: 'monthly',
          priority: 0.8,
          lastmod: new Date().toISOString()
        },
        {
          url: '/projects',
          changefreq: 'weekly',
          priority: 0.9,
          lastmod: new Date().toISOString()
        },
        {
          url: '/contact',
          changefreq: 'monthly',
          priority: 0.7,
          lastmod: new Date().toISOString()
        }
      ];
    }

  }
})