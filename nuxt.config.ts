// https://nuxt.com/docs/api/configuration/nuxt-config

import tailwindcss from "@tailwindcss/vite";
import url from "./server/api/url";

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: ['@pinia/nuxt', 'nuxt-security', '@nuxt/image', 'nuxt-gtag', '@nuxtjs/sitemap'],


  site: {
    url: "https://oseahumen-agboifoh-john.vercel.app",
    name: "Oseahumen Agboifoh John",
    description: "Oseahumen Agboifoh John is a software engineer and web developer with a passion for building innovative web applications. Explore my projects and learn more about my work.",
  },
  sitemap: {
    defaults: {
      changefreq: 'monthly',
      priority: 0.5,
      lastmod: new Date().toISOString(),
    },
    urls: [
      {
        loc: '/',
        changefreq: 'daily',
        priority: 1.0, // highest priority
      },
      {
        loc: '/about',
        changefreq: 'monthly',
        priority: 0.8,
      },
      {
        loc: '/contact',
        changefreq: 'monthly',
        priority: 0.8,
      },
      {
        loc: '/projects',
        changefreq: 'weekly',
        priority: 0.9,
      }
    ],
    sources: ['/api/url']
  }
  ,
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
          'https://*.cloudinary.com',
          'https://www.googletagmanager.com'
        ],
        'script-src': [
          "'self'",
          "'unsafe-inline'",
          ...(process.env.NODE_ENV === 'development' ? ["'unsafe-eval'"] : []),
          'https://www.googletagmanager.com',
          'https://www.google-analytics.com',
          'https://va.vercel-scripts.com'
        ],
        'connect-src': [
          "'self'",
          'https://oseahumen-agboifoh-john.duckdns.org',
          'https://www.google-analytics.com',
          'https://www.googletagmanager.com',
          'https://va.vercel-scripts.com'
        ],
        'style-src': [
          "'self'",
          'https:',
          "'unsafe-inline'"
        ],
        'base-uri': ["'none'"],
        'form-action': ["'self'"],
        'frame-ancestors': ["'self'"],
        'object-src': ["'none'"],
        'script-src-attr': ["'none'"],
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
      meta: [
        { name: 'author', content: 'Oseahumen Agboifoh John' },
        { name: 'publisher', content: 'Oseahumen Agboifoh John' }
      ],
      link: [
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'manifest', href: '/site.webmanifest' }
      ]
    }
  },

  gtag: {
    id: 'G-WQY37LSGQW'
  }
})