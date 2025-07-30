<template>
  <NuxtLayout>
    <Analytics />
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import { useTheme } from '~/composables/useTheme'
import { Analytics } from '@vercel/analytics/nuxt'



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
