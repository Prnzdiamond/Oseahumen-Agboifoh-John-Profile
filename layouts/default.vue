<template>
  <div class="min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors duration-300">
    <!-- Mobile Menu Overlay -->
    <div v-if="mobileMenuOpen" 
         @click="mobileMenuOpen = false"
         class="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"></div>

    <!-- Enhanced Navbar with Project Highlighting -->
    <header class="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-blue-100/50 dark:border-gray-700/50 transition-all duration-300">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Enhanced Logo -->
          <NuxtLink to="/" class="flex items-center space-x-3 group">
            <div class="relative">
              <div class="w-10 h-10 bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-blue-500/25 overflow-hidden">
                <NuxtImg v-if="owner?.avatar && !avatarError" 
                     :src="owner.avatar" 
                     :alt="owner.name"
                     @error="avatarError = true"
                     class="w-full h-full object-cover rounded-xl" />
                <span v-else class="text-white font-bold text-lg">
                  {{ getInitials(owner?.name || 'Portfolio') }}
                </span>
              </div>
              <div class="absolute inset-0 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
            </div>
            <div class="hidden sm:block">
              <span class="text-xl font-bold bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
                {{ owner?.name || 'Portfolio' }}
              </span>
              <div class="text-xs text-gray-500 dark:text-gray-400 -mt-1">
                {{ owner?.headline || 'Professional Portfolio' }}
              </div>
            </div>
          </NuxtLink>

          <!-- Desktop Navigation with Project Highlighting -->
          <nav class="hidden lg:flex items-center space-x-1">
            <NuxtLink v-for="link in navLinks" :key="link.to" :to="link.to" 
                      :class="[
                        'relative px-4 py-2 rounded-lg font-medium transition-all duration-200 group',
                        isActiveLink(link.to) 
                          ? 'text-blue-600 dark:text-blue-400' 
                          : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                      ]">
              <span class="relative z-10">{{ link.name }}</span>
              <div :class="[
                'absolute inset-0 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg transition-opacity duration-200',
                isActiveLink(link.to) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              ]"></div>
              <!-- Active indicator -->
              <div :class="[
                'absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-300',
                isActiveLink(link.to) ? 'w-full' : 'w-0 group-hover:w-full'
              ]"></div>
            </NuxtLink>
          </nav>

          <!-- Theme Toggle & Mobile Menu -->
          <div class="flex items-center space-x-3">
            <ThemeToggle />
            
            <!-- Enhanced Mobile Menu Button -->
            <button @click="mobileMenuOpen = !mobileMenuOpen" 
                    class="lg:hidden relative p-2 rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-700 text-gray-700 dark:text-gray-300 hover:from-blue-100 hover:to-cyan-100 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-200 group">
              <div class="w-6 h-6 flex flex-col justify-center items-center">
                <span class="block w-5 h-0.5 bg-current transform transition-all duration-300" 
                      :class="{ 'rotate-45 translate-y-1': mobileMenuOpen }"></span>
                <span class="block w-5 h-0.5 bg-current mt-1 transition-all duration-300" 
                      :class="{ 'opacity-0': mobileMenuOpen }"></span>
                <span class="block w-5 h-0.5 bg-current mt-1 transform transition-all duration-300" 
                      :class="{ '-rotate-45 -translate-y-1': mobileMenuOpen }"></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      <!-- Enhanced Mobile Navigation - Improved Responsiveness -->
      <div :class="{ 
        'translate-x-0 opacity-100 visible': mobileMenuOpen, 
        'translate-x-full opacity-0 hidden': !mobileMenuOpen 
      }" 
           class="lg:hidden fixed top-16 right-0 w-full max-w-sm h-[calc(100vh-4rem)] bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-2xl transform transition-all duration-300 ease-out z-50 border-l border-blue-100 dark:border-gray-700 overflow-hidden">

        <!-- Mobile Nav Header -->
        <div class="p-4 sm:p-6 border-b border-blue-100 dark:border-gray-700">
          <div class="flex items-center space-x-3">
            <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
              <NuxtImg v-if="owner?.avatar && !mobileAvatarError" 
                   :src="owner.avatar" 
                   :alt="owner.name"
                   @error="mobileAvatarError = true"
                   class="w-full h-full object-cover rounded-lg" />
              <span v-else class="text-white font-bold text-sm">
                {{ getInitials(owner?.name || 'Portfolio') }}
              </span>
            </div>
            <div class="min-w-0 flex-1">
              <div class="font-semibold text-gray-900 dark:text-white truncate">{{ owner?.name || 'Portfolio' }}</div>
              <div class="text-xs text-gray-500 dark:text-gray-400">Navigation Menu</div>
            </div>
          </div>
        </div>

        <!-- Mobile Nav Links with Project Highlighting -->
        <nav class="p-4 sm:p-6 space-y-2 overflow-y-auto flex-1">
          <NuxtLink v-for="(link, index) in navLinks" :key="link.to" :to="link.to" 
                    @click="mobileMenuOpen = false"
                    :style="{ animationDelay: `${index * 0.1}s` }"
                    :class="[
                      'flex items-center space-x-3 py-3 px-4 rounded-xl font-medium transition-all duration-200 group animate-slide-in',
                      isActiveLink(link.to)
                        ? 'bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 text-blue-600 dark:text-blue-400'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 dark:hover:from-blue-900/20 dark:hover:to-cyan-900/20 hover:text-blue-600 dark:hover:text-blue-400'
                    ]">
            <component :is="link.icon" class="w-5 h-5 group-hover:scale-110 transition-transform duration-200 flex-shrink-0" />
            <span class="truncate">{{ link.name }}</span>
            <div :class="[
              'ml-auto w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-opacity duration-200 flex-shrink-0',
              isActiveLink(link.to) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
            ]"></div>
          </NuxtLink>
        </nav>

        <!-- Mobile Nav Footer -->
        <div class="p-4 sm:p-6 border-t border-blue-100 dark:border-gray-700 mt-auto">
          <div class="text-center">
            <div class="text-sm text-gray-500 dark:text-gray-400 mb-2">Connect with me</div>
            <div class="flex justify-center space-x-3">
              <a v-if="owner?.social_links?.github" 
                 :href="owner.social_links.github" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 class="w-8 h-8 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-200 flex-shrink-0">
                <svg class="w-4 h-4 text-gray-600 dark:text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a v-if="owner?.social_links?.linkedin" 
                 :href="owner.social_links.linkedin" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 class="w-8 h-8 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-200 flex-shrink-0">
                <svg class="w-4 h-4 text-gray-600 dark:text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a v-if="owner?.social_links?.twitter" 
                 :href="owner.social_links.twitter" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 class="w-8 h-8 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-200 flex-shrink-0">
                <svg class="w-4 h-4 text-gray-600 dark:text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1">
      <slot />
    </main>

    <!-- Enhanced Footer -->
    <footer class="bg-gradient-to-r from-gray-50 to-blue-50/30 dark:from-gray-800 dark:to-gray-900 border-t border-blue-100/50 dark:border-gray-700/50 mt-auto">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          
          <!-- Footer Brand -->
          <div class="space-y-4">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0">
                <NuxtImg v-if="owner?.avatar && !footerAvatarError" 
                     :src="owner.avatar" 
                     :alt="owner.name"
                     @error="footerAvatarError = true"
                     class="w-full h-full object-cover rounded-xl" />
                <span v-else class="text-white font-bold">
                  {{ getInitials(owner?.name || 'Portfolio') }}
                </span>
              </div>
              <div class="min-w-0 flex-1">
                <div class="font-bold text-gray-900 dark:text-white truncate">{{ owner?.name || 'Portfolio' }}</div>
                <div class="text-sm text-gray-500 dark:text-gray-400 truncate">{{ owner?.headline || 'Professional Portfolio' }}</div>
              </div>
            </div>
            <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              {{ owner?.bio?.slice(0,150) || 'Crafting exceptional digital experiences with modern technologies and innovative solutions.' }}
            </p>
          </div>

          <!-- Quick Links -->
          <div class="space-y-4">
            <h3 class="font-semibold text-gray-900 dark:text-white">Quick Links</h3>
            <div class="space-y-2">
              <NuxtLink v-for="link in navLinks" :key="link.to" :to="link.to"
                        :class="[
                          'block text-sm transition-colors duration-200',
                          isActiveLink(link.to)
                            ? 'text-blue-600 dark:text-blue-400'
                            : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
                        ]">
                {{ link.name }}
              </NuxtLink>
            </div>
          </div>

          <!-- Contact Info -->
          <div class="space-y-4">
            <h3 class="font-semibold text-gray-900 dark:text-white">Get In Touch</h3>
            <div class="space-y-3">
              <div class="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <div class="w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex-shrink-0"></div>
                <span>Available for new projects</span>
              </div>
              <div class="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <div class="w-2 h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full animate-pulse flex-shrink-0"></div>
                <span>Currently online</span>
              </div>
              <div v-if="owner?.contact_methods?.email" class="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <div class="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex-shrink-0"></div>
                <a :href="`mailto:${owner.contact_methods.email}`" class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors truncate">
                  {{ owner.contact_methods.email }}
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer Bottom -->
        <div class="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-blue-100 dark:border-gray-700 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div class="text-sm text-gray-500 dark:text-gray-400 text-center md:text-left">
            &copy; {{ new Date().getFullYear() }} {{ owner?.name || 'Portfolio' }}. Built with ❤️ using Nuxt & Laravel
          </div>
          <div class="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
            <span class="flex items-center space-x-1">
              <div class="w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-pulse flex-shrink-0"></div>
              <span class="truncate">{{ getRandomTechStack() }}</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useOwnerStore } from '~/stores/ownerStore'
import { HomeIcon, UserIcon, FolderIcon, MailIcon } from 'lucide-vue-next'

const mobileMenuOpen = ref(false)
const ownerStore = useOwnerStore()
const route = useRoute()

// Separate error states for each avatar instance
const avatarError = ref(false)
const mobileAvatarError = ref(false)
const footerAvatarError = ref(false)

const navLinks = [
  { name: 'Home', to: '/', icon: HomeIcon },
  { name: 'About', to: '/about', icon: UserIcon },
  { name: 'Projects', to: '/projects', icon: FolderIcon },
  { name: 'Contact', to: '/contact', icon: MailIcon }
]

const owner = computed(() => ownerStore.owner)

// Enhanced active link detection with project highlighting
const isActiveLink = (linkPath) => {
  const currentPath = route.path
  
  // Exact match for home
  if (linkPath === '/' && currentPath === '/') {
    return true
  }
  
  // For projects, highlight both /projects and individual project pages
  if (linkPath === '/projects') {
    return currentPath === '/projects' || currentPath.startsWith('/projects/')
  }
  
  // For other pages, check if current path starts with link path
  if (linkPath !== '/') {
    return currentPath.startsWith(linkPath)
  }
  
  return false
}

// Reset error states when owner data changes
watch(owner, () => {
  avatarError.value = false
  mobileAvatarError.value = false
  footerAvatarError.value = false
}, { deep: true })

// Close mobile menu when route changes
watch(() => route.path, () => {
  mobileMenuOpen.value = false
})

// Fetch owner data when component is mounted
onMounted(async () => {
  if (!ownerStore.owner) {
    await ownerStore.fetchOwner()
  }
})

// Helper function to get initials from name
const getInitials = (name) => {
  if (!name) return 'P'
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .join('')
    .substring(0, 2)
}

// Helper function to get a random tech from the stack
const getRandomTechStack = () => {
  if (!owner.value?.tech_stack || owner.value.tech_stack.length === 0) {
    return 'Modern Tech Stack'
  }
  
  const randomTech = owner.value.tech_stack[Math.floor(Math.random() * owner.value.tech_stack.length)]
  return `Built with ${randomTech.technology || randomTech.name || randomTech}`
}
</script>

<style scoped>
@keyframes slide-in {
  from { opacity: 0; transform: translateX(20px); }
  to { opacity: 1; transform: translateX(0); }
}

.animate-slide-in {
  animation: slide-in 0.3s ease-out both;
}
</style>
