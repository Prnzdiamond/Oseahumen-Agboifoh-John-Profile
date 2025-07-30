<template>
  <NuxtLayout>
    <Analytics />
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import { useTheme } from '~/composables/useTheme'
import { Analytics } from '@vercel/analytics/nuxt'

useHead({
  title: 'Oseahumen Agboifoh John – Full-stack Developer',
  meta: [
    { name: 'description', content: 'Full-stack web developer (Laravel, FastAPI, Vue, React) based in Nigeria. I build clean, scalable web apps.' },
    
    // Open Graph (Facebook, LinkedIn)
    { property: 'og:title', content: 'Oseahumen Agboifoh John – Full-stack Developer' },
    { property: 'og:description', content: 'Skilled in Laravel, FastAPI, Vue, React. I build modern web solutions that work.' },
    { property: 'og:image', content: 'https://oseahumen-agboifoh-john.vercel.app/ChatGPT Image Jun 27, 2025, 01_09_53 PM.jpg' },
    { property: 'og:url', content: 'https://oseahumen-agboifoh-john.vercel.app/' },
    { property: 'og:type', content: 'website' },

    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Oseahumen Agboifoh John – Full-stack Developer' },
    { name: 'twitter:description', content: 'I specialize in Laravel, FastAPI, Vue, and React. Let’s build something great.' },
    { name: 'twitter:image', content: 'https://oseahumen-agboifoh-john.vercel.app/ChatGPT Image Jun 27, 2025, 01_09_53 PM.jpg' }
  ]
})


const { initTheme, setupSystemWatcher } = useTheme()

// Initialize theme immediately
if (process.client) {
  initTheme()
  setupSystemWatcher()
}

</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.4s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
