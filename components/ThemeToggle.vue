<template>
    <div class="relative">
      <!-- Desktop Theme Toggle -->
      <div class="hidden sm:block">
        <button @click="cycleTheme" 
                class="relative group p-3 rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-700 hover:from-blue-100 hover:to-cyan-100 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-300 border border-blue-200/50 dark:border-gray-600/50 hover:border-blue-300 dark:hover:border-gray-500 shadow-sm hover:shadow-md">
          
          <!-- Theme Icon Container -->
          <div class="relative w-6 h-6 overflow-hidden">
            <!-- Sun Icon -->
            <div :class="{ 'translate-y-0 opacity-100': currentTheme === 'light', '-translate-y-8 opacity-0': currentTheme !== 'light' }" 
                 class="absolute inset-0 transition-all duration-500 ease-in-out">
              <svg class="w-6 h-6 text-amber-500 group-hover:text-amber-600 transition-colors duration-200" 
                   fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"/>
              </svg>
            </div>
            
            <!-- Moon Icon -->
            <div :class="{ 'translate-y-0 opacity-100': currentTheme === 'dark', '-translate-y-8 opacity-0': currentTheme !== 'dark' }" 
                 class="absolute inset-0 transition-all duration-500 ease-in-out">
              <svg class="w-6 h-6 text-blue-400 group-hover:text-blue-300 transition-colors duration-200" 
                   fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clip-rule="evenodd"/>
              </svg>
            </div>
            
            <!-- System Icon -->
            <div :class="{ 'translate-y-0 opacity-100': currentTheme === 'system', '-translate-y-8 opacity-0': currentTheme !== 'system' }" 
                 class="absolute inset-0 transition-all duration-500 ease-in-out">
              <svg class="w-6 h-6 text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-200" 
                   fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
            </div>
          </div>
  
          <!-- Tooltip -->
          <div class="absolute -top-12 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
            {{ currentThemeData.label }} Theme
            <div class="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-gray-700"></div>
          </div>
  
          <!-- Ripple Effect -->
          <div class="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/20 to-cyan-400/20 scale-0 group-active:scale-100 transition-transform duration-200"></div>
        </button>
      </div>
  
      <!-- Mobile Theme Toggle -->
      <div class="sm:hidden">
        <button @click="cycleTheme" 
                class="relative group p-2.5 rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-700 hover:from-blue-100 hover:to-cyan-100 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-300 border border-blue-200/50 dark:border-gray-600/50">
          
          <div class="relative w-5 h-5 overflow-hidden">
            <!-- Mobile Icons (same structure but smaller) -->
            <div :class="{ 'translate-y-0 opacity-100': currentTheme === 'light', '-translate-y-6 opacity-0': currentTheme !== 'light' }" 
                 class="absolute inset-0 transition-all duration-500 ease-in-out">
              <svg class="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"/>
              </svg>
            </div>
            
            <div :class="{ 'translate-y-0 opacity-100': currentTheme === 'dark', '-translate-y-6 opacity-0': currentTheme !== 'dark' }" 
                 class="absolute inset-0 transition-all duration-500 ease-in-out">
              <svg class="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clip-rule="evenodd"/>
              </svg>
            </div>
            
            <div :class="{ 'translate-y-0 opacity-100': currentTheme === 'system', '-translate-y-6 opacity-0': currentTheme !== 'system' }" 
                 class="absolute inset-0 transition-all duration-500 ease-in-out">
              <svg class="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
            </div>
          </div>
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useTheme } from '~/composables/useTheme'
  import { computed } from 'vue'
  
  const { currentTheme, setTheme } = useTheme()
  
  const themes = [
    { value: 'light', icon: '☀️', label: 'Light' },
    { value: 'dark', icon: '🌙', label: 'Dark' },
    { value: 'system', icon: '🖥️', label: 'System' }
  ]
  
  const currentThemeData = computed(() => 
    themes.find(theme => theme.value === currentTheme.value) || themes[0]
  )
  
  const cycleTheme = () => {
    const currentIndex = themes.findIndex(theme => theme.value === currentTheme.value)
    const nextIndex = (currentIndex + 1) % themes.length
    const nextTheme = themes[nextIndex].value
    setTheme(nextTheme)
  }
  </script>
  