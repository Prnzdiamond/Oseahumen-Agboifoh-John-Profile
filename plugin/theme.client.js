import { useTheme } from '~/composables/useTheme'

export default defineNuxtPlugin(() => {
    const { initTheme, setupSystemWatcher } = useTheme()
    initTheme()
    setupSystemWatcher()
})