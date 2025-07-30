<template>
  <div class="min-h-screen bg-white dark:bg-gray-900">
    <!-- Hero Section -->
    <section class="relative py-20 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20 overflow-hidden">
      <!-- Background Elements -->
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute top-20 left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
        <div class="absolute bottom-20 right-10 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl animate-float-delayed"></div>
      </div>

      <div class="relative max-w-6xl mx-auto px-6">
        <div v-if="ownerStore.loading" class="text-center animate-pulse">
          <div class="w-40 h-40 mx-auto mb-8 relative">
            <NuxtImg 
              src="/images/default_avatar.png" 
              alt="Loading..."
              class="w-full h-full rounded-full object-cover opacity-50"
            />
          </div>
          <div class="h-12 bg-gray-300 dark:bg-gray-700 rounded-lg mb-4 max-w-md mx-auto"></div>
          <div class="h-6 bg-gray-300 dark:bg-gray-700 rounded mb-2 max-w-lg mx-auto"></div>
        </div>

        <div v-else-if="ownerStore.owner" class="text-center animate-fade-in">
          <!-- Avatar -->
          <div class="relative inline-block mb-8">
            <div class="relative w-40 h-40 mx-auto group">
              <NuxtImg :src="ownerStore.owner.avatar || '/images/default_avatar.png'" :alt="ownerStore.owner.name"
                class="w-full h-full rounded-full object-cover shadow-2xl border-4 border-white dark:border-gray-800 group-hover:scale-105 transition-transform duration-500 animate-zoom-in"
              />
              <div class="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500/20 to-cyan-500/20 group-hover:from-blue-500/30 group-hover:to-cyan-500/30 transition-all duration-500"></div>
              <div class="absolute inset-0 rounded-full border-4 border-blue-400/30 animate-ping"></div>
            </div>
          </div>

          <!-- Name & Headline -->
          <h1 class="text-5xl lg:text-6xl font-bold mb-4 animate-slide-up">
            <span class="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
              {{ ownerStore.owner.name }}
            </span>
          </h1>
          <p class="text-2xl text-gray-600 dark:text-gray-300 font-light mb-8 animate-slide-up-delayed">
            {{ ownerStore.owner.headline }}
          </p>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <section v-if="ownerStore.owner" class="py-20">
      <div class="max-w-6xl mx-auto px-6">
        <div class="grid lg:grid-cols-3 gap-12">
          
          <!-- Bio Section -->
          <div class="lg:col-span-2 space-y-8">
            <div class="animate-slide-up">
              <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg mr-3 animate-pulse"></div>
                About Me
              </h2>
              <div class="prose prose-lg dark:prose-invert max-w-none">
                <p class="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line animate-fade-in-up">
                  {{ ownerStore.owner.bio }}
                </p>
              </div>
            </div>

            <!-- Professional Journey with Scrollable Container -->
            <div v-if="ownerStore.owner.professional_journey?.length" class="animate-slide-up-delayed">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <div class="w-6 h-6 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-md mr-3 animate-pulse"></div>
                Professional Journey
              </h3>
              
              <!-- Scrollable Container -->
              <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-blue-100 dark:border-gray-700 overflow-hidden">
                <div class="max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-300 dark:scrollbar-thumb-blue-600 scrollbar-track-gray-100 dark:scrollbar-track-gray-700">
                  <div class="p-6 space-y-6">
                    <div 
                      v-for="(job, index) in ownerStore.owner.professional_journey" 
                      :key="index"
                      :style="{ animationDelay: `${index * 0.1}s` }"
                      class="relative pl-8 border-l-2 border-blue-100 dark:border-blue-800 animate-fade-in-up"
                    >
                      <div class="absolute -left-2 top-0 w-4 h-4 rounded-full animate-pulse"
                           :class="job.is_current ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gradient-to-r from-blue-500 to-cyan-500'"></div>
                      <div class="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-700 hover:shadow-md transition-all duration-300 group">
                        <div class="flex items-start justify-between mb-2">
                          <h4 class="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">{{ job.position }}</h4>
                          <span v-if="job.is_current" class="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 text-xs rounded-full animate-pulse">
                            Current
                          </span>
                        </div>
                        <p class="text-blue-600 dark:text-blue-400 font-medium mb-1">{{ job.company }}</p>
                        <p class="text-gray-600 dark:text-gray-400 text-sm mb-3">{{ job.period }}</p>
                        <p class="text-gray-700 dark:text-gray-300">{{ job.description }}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <!-- Scroll Indicator -->
                <div class="flex justify-center py-2 bg-gray-50 dark:bg-gray-700/50">
                  <div class="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                    <svg class="w-4 h-4 mr-1 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m0 0l7-7 7 7z"/>
                    </svg>
                    Scroll to see more
                  </div>
                </div>
              </div>
            </div>

            <!-- Enhanced Tech Stack with Better Presentation -->
            <div class="animate-slide-up">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <div class="w-6 h-6 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-md mr-3 animate-pulse"></div>
                Tech Stack & Skills
              </h3>
              
              <!-- Tech Stack Categories -->
              <div class="space-y-6">
                <!-- Frontend Technologies -->
                <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-blue-100 dark:border-gray-700">
                  <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <span class="text-2xl mr-2">🎨</span>
                    Frontend Technologies
                  </h4>
                  <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    <div 
                      v-for="(tech, index) in frontendTech" 
                      :key="tech.technology"
                      :style="{ animationDelay: `${index * 0.05}s` }"
                      class="group relative p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-lg border border-blue-200 dark:border-blue-700 hover:shadow-md hover:scale-105 transition-all duration-300 animate-fade-in-up cursor-pointer"
                    >
                      <div class="text-center">
                        <div class="text-2xl mb-2">{{ getTechIcon(tech.technology) }}</div>
                        <div class="font-medium text-blue-800 dark:text-blue-200 text-sm mb-2">{{ tech.technology }}</div>
                        <div v-if="tech.rating" class="flex items-center justify-center space-x-1 mb-2">
                          <span v-for="i in 5" :key="i" 
                                :class="i <= tech.rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'"
                                class="text-xs">★</span>
                        </div>
                        <div v-if="tech.years_experience" class="text-xs text-gray-600 dark:text-gray-400">
                          {{ tech.years_experience }} year{{ tech.years_experience > 1 ? 's' : '' }}
                        </div>
                      </div>
                      
                      <!-- Hover tooltip -->
                      <div class="absolute -top-12 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                        {{ tech.technology }}
                        <span v-if="tech.rating"> • {{ tech.rating }}/5 ★</span>
                        <div class="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-gray-700"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Backend Technologies -->
                <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-blue-100 dark:border-gray-700">
                  <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <span class="text-2xl mr-2">⚙️</span>
                    Backend Technologies
                  </h4>
                  <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    <div 
                      v-for="(tech, index) in backendTech" 
                      :key="tech.technology"
                      :style="{ animationDelay: `${index * 0.05}s` }"
                      class="group relative p-4 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/30 dark:to-teal-900/30 rounded-lg border border-emerald-200 dark:border-emerald-700 hover:shadow-md hover:scale-105 transition-all duration-300 animate-fade-in-up cursor-pointer"
                    >
                      <div class="text-center">
                        <div class="text-2xl mb-2">{{ getTechIcon(tech.technology) }}</div>
                        <div class="font-medium text-emerald-800 dark:text-emerald-200 text-sm mb-2">{{ tech.technology }}</div>
                        <div v-if="tech.rating" class="flex items-center justify-center space-x-1 mb-2">
                          <span v-for="i in 5" :key="i" 
                                :class="i <= tech.rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'"
                                class="text-xs">★</span>
                        </div>
                        <div v-if="tech.years_experience" class="text-xs text-gray-600 dark:text-gray-400">
                          {{ tech.years_experience }} year{{ tech.years_experience > 1 ? 's' : '' }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Database & Tools -->
                <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-blue-100 dark:border-gray-700">
                  <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <span class="text-2xl mr-2">🛠️</span>
                    Database & Tools
                  </h4>
                  <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    <div 
                      v-for="(tech, index) in databaseAndTools" 
                      :key="tech.technology"
                      :style="{ animationDelay: `${index * 0.05}s` }"
                      class="group relative p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg border border-purple-200 dark:border-purple-700 hover:shadow-md hover:scale-105 transition-all duration-300 animate-fade-in-up cursor-pointer"
                    >
                      <div class="text-center">
                        <div class="text-2xl mb-2">{{ getTechIcon(tech.technology) }}</div>
                        <div class="font-medium text-purple-800 dark:text-purple-200 text-sm mb-2">{{ tech.technology }}</div>
                        <div v-if="tech.rating" class="flex items-center justify-center space-x-1 mb-2">
                          <span v-for="i in 5" :key="i" 
                                :class="i <= tech.rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'"
                                class="text-xs">★</span>
                        </div>
                        <div v-if="tech.years_experience" class="text-xs text-gray-600 dark:text-gray-400">
                          {{ tech.years_experience }} year{{ tech.years_experience > 1 ? 's' : '' }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="space-y-8">
            
            <!-- Expertise Areas -->
            <div v-if="ownerStore.owner.expertise_areas?.length" class="animate-slide-up">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <div class="w-5 h-5 bg-gradient-to-r from-emerald-400 to-teal-400 rounded mr-2 animate-pulse"></div>
                Expertise Areas
              </h3>
              <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-blue-100 dark:border-gray-700">
                <div class="space-y-3">
                  <div 
                    v-for="(area, index) in ownerStore.owner.expertise_areas" 
                    :key="area.area"
                    :style="{ animationDelay: `${index * 0.1}s` }"
                    class="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/30 dark:to-teal-900/30 rounded-lg border border-emerald-200 dark:border-emerald-700 animate-fade-in-up hover:shadow-md transition-all duration-300 group"
                  >
                    <div class="flex items-center space-x-3">
                      <div class="w-3 h-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full animate-pulse"></div>
                      <span class="font-medium text-emerald-800 dark:text-emerald-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition-colors duration-300">{{ area.area }}</span>
                    </div>
                    <div v-if="area.level" class="text-sm text-gray-600 dark:text-gray-400 capitalize bg-white dark:bg-gray-700 px-2 py-1 rounded-full">
                      {{ area.level }}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Languages -->
            <div v-if="ownerStore.owner.languages?.length" class="animate-slide-up-delayed">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <div class="w-5 h-5 bg-gradient-to-r from-cyan-400 to-blue-400 rounded mr-2 animate-pulse"></div>
                Languages
              </h3>
              <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-blue-100 dark:border-gray-700">
                <div class="space-y-3">
                  <div 
                    v-for="(language, index) in ownerStore.owner.languages" 
                    :key="language.language"
                    :style="{ animationDelay: `${index * 0.1}s` }"
                    class="flex items-center justify-between animate-fade-in-up p-3 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 group"
                  >
                    <div class="flex items-center space-x-3">
                      <div class="w-2 h-2 rounded-full animate-pulse"
                           :class="language.is_native ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gradient-to-r from-blue-500 to-cyan-500'"></div>
                      <span class="text-gray-700 dark:text-gray-300 font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">{{ language.language }}</span>
                    </div>
                    <div class="flex items-center space-x-2">
                      <span class="text-sm text-gray-500 dark:text-gray-400 capitalize">{{ language.proficiency }}</span>
                      <span v-if="language.is_native" class="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 text-xs rounded-full animate-pulse">
                        Native
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Enhanced Hobbies & Interests -->
            <div v-if="ownerStore.owner.hobbies?.length" class="animate-slide-up-delayed">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <div class="w-5 h-5 bg-gradient-to-r from-purple-400 to-pink-400 rounded mr-2 animate-pulse"></div>
                Hobbies & Interests
              </h3>
              <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-blue-100 dark:border-gray-700">
                <div class="space-y-3">
                  <div 
                    v-for="(hobby, index) in ownerStore.owner.hobbies" 
                    :key="hobby.name"
                    :style="{ animationDelay: `${index * 0.1}s` }"
                    class="group relative p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg border border-purple-200 dark:border-purple-700 hover:shadow-md transition-all duration-300 animate-fade-in-up cursor-pointer"
                    @click="toggleHobbyDescription(index)"
                  >
                    <div class="flex items-center space-x-4">
                      <div class="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <span class="text-white text-lg">{{ hobby.icon || '🎯' }}</span>
                      </div>
                      <div class="flex-1 min-w-0">
                        <div class="font-medium text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">{{ hobby.name }}</div>
                        <div 
                          v-if="hobby.description" 
                          class="text-sm text-gray-600 dark:text-gray-400 mt-1 transition-all duration-300"
                          :class="expandedHobbies.includes(index) ? 'line-clamp-none' : 'line-clamp-2 md:line-clamp-1'"
                        >
                          {{ hobby.description }}
                        </div>
                      </div>
                      <div v-if="hobby.description && hobby.description.length > 80" class="md:hidden">
                        <svg 
                          class="w-4 h-4 text-gray-400 transition-transform duration-300"
                          :class="expandedHobbies.includes(index) ? 'rotate-180' : ''"
                          fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        >
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                        </svg>
                      </div>
                    </div>
                    
                    <!-- Enhanced Tooltip for desktop -->
                    <div 
                      v-if="hobby.description && hobby.description.length > 80"
                      class="hidden md:block absolute left-1/2 transform -translate-x-1/2 -top-2 translate-y-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10"
                    >
                      <div class="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-sm rounded-lg p-3 max-w-xs shadow-lg">
                        {{ hobby.description }}
                        <div class="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900 dark:border-b-gray-100"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Enhanced Connect Section -->
            <div class="animate-slide-up-delayed">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <div class="w-5 h-5 bg-gradient-to-r from-cyan-400 to-blue-400 rounded mr-2 animate-pulse"></div>
                Connect
              </h3>
              <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-blue-100 dark:border-gray-700">
                <div class="space-y-3">
                  <!-- Social Links -->
                  <a 
                    v-for="(url, platform) in ownerStore.owner.social_links" 
                    :key="platform"
                    v-show="url"
                    :href="getPlatformUrl(platform, url)" 
                    target="_blank"
                    class="flex items-center space-x-3 p-3 rounded-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 dark:hover:from-blue-900/20 dark:hover:to-cyan-900/20 transition-all duration-300 group animate-fade-in-up"
                  >
                    <div class="w-8 h-8 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/40 dark:to-cyan-900/40 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                      <span class="text-blue-600 dark:text-blue-400 text-sm">{{ getPlatformIcon(platform) }}</span>
                    </div>
                    <div class="flex-1">
                      <div class="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 capitalize">{{ getPlatformLabel(platform) }}</div>
                      <div class="text-sm text-gray-500 dark:text-gray-400">{{ getPlatformDescription(platform) }}</div>
                    </div>
                    <div class="ml-auto">
                      <svg class="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                      </svg>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            <!-- Enhanced Status -->
            <div class="animate-slide-up-delayed">
              <div class="bg-gradient-to-r from-blue-600 to-cyan-600 p-6 rounded-xl text-white relative overflow-hidden">
                <!-- Animated background pattern -->
                <div class="absolute inset-0 opacity-10">
                  <div class="absolute top-0 left-0 w-full h-full" 
                       style="background-image: radial-gradient(circle at 25% 25%, white 2px, transparent 2px); background-size: 20px 20px;"></div>
                </div>
                
                <div class="relative z-10">
                  <div class="flex items-center space-x-3 mb-3">
                    <div class="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span class="font-semibold">Available for Projects</span>
                  </div>
                  <p class="text-blue-100 text-sm mb-4">
                    Currently accepting new freelance projects and collaboration opportunities.
                  </p>
                  <NuxtLink 
                    to="/contact"
                    class="inline-flex items-center px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-all duration-200 group"
                  >
                    Get In Touch
                    <svg class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                    </svg>
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useOwnerStore } from '~/stores/ownerStore'
import { computed, ref, onMounted } from 'vue'
import { useAboutPageMeta } from '~/composables/usePageMeta'

const ownerStore = useOwnerStore()
const expandedHobbies = ref([])

useAboutPageMeta(ownerStore.owner)

// Initialize head with default values
const headData = ref({
  title: 'About - Portfolio',
  meta: [
    { name: 'description', content: 'Learn more about my background, skills, and professional journey as a full-stack developer.' }
  ]
})

const { data } = useHead(headData)

// Categorize tech stack
const frontendTech = computed(() => {
  if (!ownerStore.owner?.tech_stack) return []
  const frontendKeywords = ['React', 'Vue', 'Angular', 'HTML', 'CSS', 'JavaScript', 'TypeScript', 'Tailwind', 'Bootstrap', 'SASS', 'Next.js', 'Nuxt.js', 'Webpack', 'Vite']
  return ownerStore.owner.tech_stack.filter(tech => 
    frontendKeywords.some(keyword => tech.technology.toLowerCase().includes(keyword.toLowerCase()))
  )
})

const backendTech = computed(() => {
  if (!ownerStore.owner?.tech_stack) return []
  const backendKeywords = ['Node.js', 'Python', 'Java', 'PHP', 'Laravel', 'Django', 'Express', 'C++', 'C#', 'Go', 'Rust']
  return ownerStore.owner.tech_stack.filter(tech => 
    backendKeywords.some(keyword => tech.technology.toLowerCase().includes(keyword.toLowerCase()))
  )
})

const databaseAndTools = computed(() => {
  if (!ownerStore.owner?.tech_stack) return []
  const toolKeywords = ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'Docker', 'AWS', 'Git', 'GitHub', 'Firebase', 'Vercel', 'Netlify']
  return ownerStore.owner.tech_stack.filter(tech => 
    toolKeywords.some(keyword => tech.technology.toLowerCase().includes(keyword.toLowerCase()))
  )
})

const toggleHobbyDescription = (index) => {
  const hobbyIndex = expandedHobbies.value.indexOf(index)
  if (hobbyIndex > -1) {
    expandedHobbies.value.splice(hobbyIndex, 1)
  } else {
    expandedHobbies.value.push(index)
  }
}

onMounted(async () => {
  await ownerStore.fetchOwner()
  
  // Only update head data if owner exists and has required properties
  if (ownerStore.owner && ownerStore.owner.name && ownerStore.owner.bio) {
    headData.value.title = `About ${ownerStore.owner.name} - ${ownerStore.owner.headline || 'Portfolio'}`
    
    // Safely handle bio substring with proper checks
    const bioDescription = ownerStore.owner.bio && ownerStore.owner.bio.length > 160 
      ? `${ownerStore.owner.bio.substring(0, 160)}...`
      : ownerStore.owner.bio || 'Learn more about my background, skills, and professional journey.'
    
    headData.value.meta[0].content = `Learn more about ${ownerStore.owner.name} - ${bioDescription}`
  }
})

// Tech Icons Mapping
const getTechIcon = (techName) => {
  const icons = {
    'JavaScript': '🟨',
    'TypeScript': '🔷',
    'React': '⚛️',
    'Vue': '💚',
    'Angular': '🔴',
    'Node.js': '💚',
    'Python': '🐍',
    'Java': '☕',
    'PHP': '🐘',
    'Laravel': '🔴',
    'Django': '🐍',
    'Express': '🚂',
    'Next.js': '⚫',
    'Nuxt.js': '💚',
    'HTML': '🧡',
    'CSS': '🔵',
    'SASS': '🌸',
    'Tailwind': '🌊',
    'Bootstrap': '🟣',
    'MySQL': '🐬',
    'PostgreSQL': '🐘',
    'MongoDB': '🍃',
    'Redis': '🔴',
    'Docker': '🐳',
    'AWS': '🟠',
    'Git': '🌿',
    'GitHub': '🐙',
    'Firebase': '🔥',
    'Vercel': '▲',
    'Netlify': '🌐',
    'C++': '⚙️',
    'C#': '🔷',
    'Go': '🐹',
    'Rust': '🦀',
    'Swift': '🍎',
    'Kotlin': '🟣',
    'Flutter': '💙',
    'React Native': '📱',
    'GraphQL': '💜',
    'REST': '🌐',
    'Webpack': '📦',
    'Vite': '⚡',
    'Jest': '🃏',
    'Cypress': '🌲'
  }
  
  return icons[techName] || '⚡'
}

const getPlatformUrl = (platform, url) => {
  const defaultMessage = `Hi! I found your profile and would like to connect with you regarding potential collaboration opportunities.`

  if (!url || typeof url !== 'string') return ''

  switch (platform) {
    case 'whatsapp':
      return `https://wa.me/${url.replace(/[^\d]/g, '')}?text=${encodeURIComponent(defaultMessage)}`
    case 'telegram':
      return `https://t.me/${url.replace('@', '')}`
    case 'twitter':
      return `https://twitter.com/messages/compose?recipient_id=${url}&text=${encodeURIComponent(defaultMessage)}`
    case 'instagram':
      return url.includes('instagram.com') ? url : `https://instagram.com/${url}`
    case 'linkedin':
      return url.includes('linkedin.com') ? url : `https://linkedin.com/in/${url}`
    case 'github':
      return url.includes('github.com') ? url : `https://github.com/${url || ''}`
    case 'discord':
      return `https://discord.com/users/${url}`
    case 'skype':
      return `skype:${url}?chat`
    case 'facebook':
      return `https://m.me/${url}`
    case 'youtube':
      return url.includes('youtube.com') ? url : `https://youtube.com/@${url}`
    case 'tiktok':
      return url.includes('tiktok.com') ? url : `https://tiktok.com/@${url}`
    case 'snapchat':
      return `https://snapchat.com/add/${url}`
    case 'pinterest':
      return url.includes('pinterest.com') ? url : `https://pinterest.com/${url}`
    case 'reddit':
      return url.includes('reddit.com') ? url : `https://reddit.com/u/${url}`
    case 'medium':
      return url.includes('medium.com') ? url : `https://medium.com/@${url}`
    case 'behance':
      return url.includes('behance.net') ? url : `https://behance.net/${url}`
    case 'dribbble':
      return url.includes('dribbble.com') ? url : `https://dribbble.com/${url}`
    default:
      return url
  }
}

// Platform icons
const getPlatformIcon = (platform) => {
  const icons = {
    github: '🐙',
    linkedin: '💼',
    twitter: '🐦',
    instagram: '📷',
    facebook: '📘',
    youtube: '📺',
    tiktok: '🎵',
    snapchat: '👻',
    pinterest: '📌',
    reddit: '🤖',
    medium: '📝',
    behance: '🎨',
    dribbble: '🏀',
    discord: '🎮',
    telegram: '✈️',
    whatsapp: '💬',
    skype: '☎️',
    website: '🌐',
    portfolio: '💼',
    blog: '📝',
    other: '🔗'
  }
  return icons[platform] || '🔗'
}

// Platform labels
const getPlatformLabel = (platform) => {
  const labels = {
    github: 'GitHub',
    linkedin: 'LinkedIn',
    twitter: 'Twitter/X',
    instagram: 'Instagram',
    facebook: 'Facebook',
    youtube: 'YouTube',
    tiktok: 'TikTok',
    snapchat: 'Snapchat',
    pinterest: 'Pinterest',
    reddit: 'Reddit',
    medium: 'Medium',
    behance: 'Behance',
    dribbble: 'Dribbble',
    discord: 'Discord',
    telegram: 'Telegram',
    whatsapp: 'WhatsApp',
    skype: 'Skype',
    website: 'Website',
    portfolio: 'Portfolio',
    blog: 'Blog'
  }
  return labels[platform] || platform.charAt(0).toUpperCase() + platform.slice(1)
}

// Platform descriptions
const getPlatformDescription = (platform) => {
  const descriptions = {
    github: 'View code repositories',
    linkedin: 'Professional network',
    twitter: 'Follow updates',
    instagram: 'Visual content',
    facebook: 'Social updates',
    youtube: 'Video content',
    tiktok: 'Short videos',
    snapchat: 'Quick messages',
    pinterest: 'Visual inspiration',
    reddit: 'Community discussions',
    medium: 'Articles & blogs',
    behance: 'Creative portfolio',
    dribbble: 'Design showcase',
    discord: 'Gaming & chat',
    telegram: 'Messaging',
    whatsapp: 'Instant messaging',
    skype: 'Video calls',
    website: 'Personal website',
    portfolio: 'Work showcase',
    blog: 'Written content'
  }
  return descriptions[platform] || 'Connect here'
}
</script>

<style scoped>
@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
}

@keyframes float-delayed {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-30px) rotate(-180deg); }
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slide-up {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slide-up-delayed {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes zoom-in {
  from { opacity: 0; transform: scale(0.5); }
  to { opacity: 1; transform: scale(1); }
}

.animate-float { animation: float 6s ease-in-out infinite; }
.animate-float-delayed { animation: float-delayed 8s ease-in-out infinite; }
.animate-fade-in { animation: fade-in 0.8s ease-out; }
.animate-slide-up { animation: slide-up 0.8s ease-out; }
.animate-slide-up-delayed { animation: slide-up-delayed 0.8s ease-out 0.2s both; }
.animate-fade-in-up { animation: fade-in-up 0.6s ease-out both; }
.animate-zoom-in { animation: zoom-in 0.8s ease-out 0.3s both; }

.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-none {
  display: block;
  -webkit-line-clamp: unset;
  -webkit-box-orient: unset;
  overflow: visible;
}

/* Custom scrollbar */
.scrollbar-thin {
  scrollbar-width: thin;
}

.scrollbar-thumb-blue-300 {
  scrollbar-color: #93c5fd #f1f5f9;
}

.dark .scrollbar-thumb-blue-600 {
  scrollbar-color: #2563eb #374151;
}

.scrollbar-track-gray-100 {
  scrollbar-color: #f3f4f6 #f3f4f6;
}

.dark .scrollbar-track-gray-700 {
  scrollbar-color: #374151 #374151;
}

/* Webkit scrollbar styles */
.scrollbar-thin::-webkit-scrollbar {
  width: 6px;
}

.scrollbar-thin::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 3px;
}

.dark .scrollbar-thin::-webkit-scrollbar-track {
  background: #374151;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
  background: #93c5fd;
  border-radius: 3px;
}

.dark .scrollbar-thin::-webkit-scrollbar-thumb {
  background: #2563eb;
}

.scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background: #60a5fa;
}

.dark .scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background: #1d4ed8;
}
</style>