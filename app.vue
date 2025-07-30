<template>
  <NuxtLayout>
    <Analytics />
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import { useTheme } from '~/composables/useTheme'
import { Analytics } from '@vercel/analytics/nuxt'
import { useOwnerStore } from '~/stores/ownerStore'
import { computed, onMounted, ref, watch } from 'vue'

const ownerStore = useOwnerStore()
const isOwnerLoaded = ref(false)

// Base SEO configuration
const siteUrl = 'https://oseahumen-agboifoh-john.vercel.app'
const defaultTitle = 'Oseahumen Agboifoh John – Full-stack Developer'
const defaultDescription = 'Full-stack web developer (Laravel, FastAPI, Vue, React) based in Nigeria. I build clean, scalable web apps.'
const defaultImage = 'https://oseahumen-agboifoh-john.vercel.app/preview.jpg'

// Computed values for dynamic content
const owner = computed(() => ownerStore.owner)

const dynamicTitle = computed(() => {
  if (!isOwnerLoaded.value || !owner.value?.name) return defaultTitle
  return `${owner.value.name} – ${owner.value.headline || 'Full-stack Developer'}`
})

const dynamicDescription = computed(() => {
  if (!isOwnerLoaded.value || !owner.value?.bio) return defaultDescription
  return owner.value.bio.slice(0, 160) // SEO optimal length
})

const dynamicImage = computed(() => {
  if (!isOwnerLoaded.value || !owner.value?.avatar) return defaultImage
  return owner.value.avatar
})

const keywords = computed(() => {
  if (!isOwnerLoaded.value || !owner.value?.tech_stack) {
    return 'Laravel, FastAPI, Vue, React, Full-stack Developer, Web Development'
  }
  return owner.value.tech_stack.map(tech => tech.technology || tech.name || tech).join(', ')
})

// JSON-LD structured data
const structuredData = computed(() => {
  const baseData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": owner.value?.name || "Oseahumen Agboifoh John",
    "jobTitle": owner.value?.headline || "Full-stack Developer",
    "description": owner.value?.bio || defaultDescription,
    "image": dynamicImage.value,
    "url": siteUrl,
    "worksFor": {
      "@type": "Organization", 
      "name": "Freelance"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Lagos",
      "addressCountry": "Nigeria"
    },
    "knowsAbout": keywords.value.split(', ')
  }

  // Add social links if available
  if (owner.value?.social_links) {
    baseData.sameAs = [
      owner.value.social_links.linkedin,
      owner.value.social_links.github,
      owner.value.social_links.twitter
    ].filter(Boolean)
  }

  return baseData
})

// Set initial SEO head
useHead({
  title: dynamicTitle,
  meta: [
    { name: 'description', content: dynamicDescription },
    
    // Basic SEO
    { name: 'author', content: () => owner.value?.name || 'Oseahumen Agboifoh John' },
    { name: 'keywords', content: keywords },
    { name: 'robots', content: 'index, follow' },
    { name: 'googlebot', content: 'index, follow' },
    
    // Open Graph
    { property: 'og:title', content: dynamicTitle },
    { property: 'og:description', content: dynamicDescription },
    { property: 'og:image', content: dynamicImage },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:image:alt', content: () => `${owner.value?.name || 'Developer'} - Portfolio Preview` },
    { property: 'og:url', content: siteUrl },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: () => `${owner.value?.name || 'Developer'} Portfolio` },
    { property: 'og:locale', content: 'en_US' },

    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: dynamicTitle },
    { name: 'twitter:description', content: dynamicDescription },
    { name: 'twitter:image', content: dynamicImage },
    { name: 'twitter:image:alt', content: () => `${owner.value?.name || 'Developer'} - Portfolio Preview` },
    { name: 'twitter:site', content: () => owner.value?.social_links?.twitter || '@yourhandle' },
    { name: 'twitter:creator', content: () => owner.value?.social_links?.twitter || '@yourhandle' },

    // App specific
    { name: 'application-name', content: () => `${owner.value?.name || 'Developer'} Portfolio` },
    { name: 'msapplication-TileColor', content: '#3B82F6' },
    { name: 'theme-color', content: '#3B82F6' },
  ],
  link: [
    // Canonical URL
    { rel: 'canonical', href: siteUrl },
    
    // Favicon and app icons
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
    { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
    { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
    { rel: 'manifest', href: '/site.webmanifest' },
    
    // Preconnect for performance
    { rel: 'preconnect', href: 'https://res.cloudinary.com' },
    { rel: 'dns-prefetch', href: 'https://res.cloudinary.com' },
    { rel: 'preconnect', href: 'https://oseahumen-agboifoh-john.duckdns.org' },
  ],
  script: [
    // Structured Data
    {
      type: 'application/ld+json',
      children: () => JSON.stringify(structuredData.value)
    }
  ]
})

// Initialize theme
const { initTheme, setupSystemWatcher } = useTheme()

// Watch for owner data changes and update loaded state
watch(owner, (newOwner) => {
  isOwnerLoaded.value = !!newOwner
}, { immediate: true })

// Client-side initialization
onMounted(async () => {
  // Initialize theme first (synchronous)
  initTheme()
  setupSystemWatcher()
  
  // Check if owner data is already available (from layout or other components)
  if (ownerStore.owner) {
    isOwnerLoaded.value = true
  } else {
    // Only fetch if not already available - let layout handle the main fetch
    // This is a backup in case layout doesn't load for some reason
    setTimeout(async () => {
      if (!ownerStore.owner && !ownerStore.loading) {
        try {
          await ownerStore.ensureOwner()
        } catch (error) {
          console.warn('Backup owner fetch failed:', error)
        }
      }
    }, 100)
  }
})
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