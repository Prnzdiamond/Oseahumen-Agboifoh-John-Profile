<template>
  <div class="min-h-screen bg-white dark:bg-gray-900">

    <!-- Hero Section -->
    <section class="relative py-20 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20 overflow-hidden">
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute top-20 left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
        <div class="absolute bottom-20 right-10 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl animate-float-delayed"></div>
      </div>

      <div class="relative max-w-6xl mx-auto px-6">
        <div v-if="ownerStore.loading" class="text-center animate-pulse">
          <div class="w-40 h-40 mx-auto mb-8">
            <div class="w-full h-full rounded-full bg-gray-200 dark:bg-gray-700"></div>
          </div>
          <div class="h-12 bg-gray-300 dark:bg-gray-700 rounded-lg mb-4 max-w-md mx-auto"></div>
          <div class="h-6 bg-gray-300 dark:bg-gray-700 rounded mb-2 max-w-lg mx-auto"></div>
        </div>

        <div v-else-if="ownerStore.owner" class="text-center animate-fade-in">
          <!-- Avatar -->
          <div class="relative inline-block mb-8">
            <div class="relative w-40 h-40 mx-auto group">
              <NuxtImg
                :src="ownerStore.owner.avatar || '/images/default_avatar.png'"
                :alt="ownerStore.owner.name"
                class="w-full h-full rounded-full object-cover shadow-2xl border-4 border-white dark:border-gray-800 group-hover:scale-105 transition-transform duration-500 animate-zoom-in"
              />
              <div class="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500/20 to-cyan-500/20 group-hover:from-blue-500/30 group-hover:to-cyan-500/30 transition-all duration-500"></div>
              <div class="absolute inset-0 rounded-full border-4 border-blue-400/30 animate-ping"></div>
            </div>
          </div>

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

      <!-- Scroll indicator -->
      <div class="absolute bottom-8 left-1/2 animate-scroll-bounce pointer-events-none">
        <div class="flex flex-col items-center gap-1 text-blue-500 dark:text-blue-400 opacity-70">
          <span class="text-xs font-medium tracking-widest uppercase">Scroll</span>
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
          </svg>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <section v-if="ownerStore.owner" class="py-20">
      <div class="max-w-6xl mx-auto px-6">
        <div class="grid lg:grid-cols-3 gap-12">

          <!-- ── Left column ──────────────────────────────────────── -->
          <div class="lg:col-span-2 space-y-8">

            <!-- Bio -->
            <div class="animate-slide-up">
              <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <LucideIcon name="user" class="w-5 h-5 text-white" />
                </div>
                About Me
              </h2>
              <div class="prose prose-lg dark:prose-invert max-w-none">
                <p class="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line animate-fade-in-up">
                  {{ ownerStore.owner.bio }}
                </p>
              </div>
            </div>

            <!-- Professional Journey -->
            <div v-if="ownerStore.owner.professional_journey?.length" class="animate-slide-up-delayed">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                <div class="w-6 h-6 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-md flex items-center justify-center flex-shrink-0">
                  <LucideIcon name="briefcase" class="w-4 h-4 text-white" />
                </div>
                Professional Journey
              </h3>
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
                          <span v-if="job.is_current" class="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 text-xs rounded-full animate-pulse">Current</span>
                        </div>
                        <p class="text-blue-600 dark:text-blue-400 font-medium mb-1">{{ job.company }}</p>
                        <p class="text-gray-600 dark:text-gray-400 text-sm mb-3">{{ job.period }}</p>
                        <p class="text-gray-700 dark:text-gray-300">{{ job.description }}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="flex justify-center py-2 bg-gray-50 dark:bg-gray-700/50">
                  <div class="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                    <svg class="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m0 0l7-7 7 7z"/>
                    </svg>
                    Scroll to see more
                  </div>
                </div>
              </div>
            </div>

            <!-- ── Tech Stack — devicons replace emojis ───────────── -->
            <div class="animate-slide-up">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                <div class="w-6 h-6 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-md flex items-center justify-center flex-shrink-0">
                  <LucideIcon name="cpu" class="w-4 h-4 text-white" />
                </div>
                Tech Stack & Skills
              </h3>

              <div class="space-y-6">

                <!-- Frontend -->
                <div v-if="frontendTech.length" class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-blue-100 dark:border-gray-700">
                  <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <LucideIcon name="monitor" class="w-5 h-5 text-blue-500" />
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
                        <!-- Devicon if available, otherwise Lucide code icon -->
                        <div class="flex justify-center mb-2">
                          <i v-if="getIconClass(tech.technology)"
                             :class="getIconClass(tech.technology)"
                             class="text-3xl leading-none"></i>
                          <LucideIcon v-else name="code-2" class="w-7 h-7 text-blue-500" />
                        </div>
                        <div class="font-medium text-blue-800 dark:text-blue-200 text-sm mb-2">{{ tech.technology }}</div>
                        <div v-if="tech.rating" class="flex items-center justify-center space-x-0.5 mb-1">
                          <span v-for="i in 5" :key="i"
                                :class="i <= tech.rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'"
                                class="text-xs">★</span>
                        </div>
                        <div v-if="tech.years_experience" class="text-xs text-gray-600 dark:text-gray-400">
                          {{ tech.years_experience }}yr{{ tech.years_experience > 1 ? 's' : '' }}
                        </div>
                      </div>
                      <!-- Tooltip -->
                      <div class="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                        {{ tech.technology }}<span v-if="tech.rating"> • {{ tech.rating }}/5★</span>
                        <div class="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-gray-700"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Backend -->
                <div v-if="backendTech.length" class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-blue-100 dark:border-gray-700">
                  <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <LucideIcon name="server" class="w-5 h-5 text-blue-500" />
                    Backend Technologies
                  </h4>
                  <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    <div
                      v-for="(tech, index) in backendTech"
                      :key="tech.technology"
                      :style="{ animationDelay: `${index * 0.05}s` }"
                      class="group relative p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-lg border border-blue-200 dark:border-blue-700 hover:shadow-md hover:scale-105 transition-all duration-300 animate-fade-in-up cursor-pointer"
                    >
                      <div class="text-center">
                        <div class="flex justify-center mb-2">
                          <i v-if="getIconClass(tech.technology)"
                             :class="getIconClass(tech.technology)"
                             class="text-3xl leading-none"></i>
                          <LucideIcon v-else name="terminal" class="w-7 h-7 text-blue-500" />
                        </div>
                        <div class="font-medium text-blue-800 dark:text-blue-200 text-sm mb-2">{{ tech.technology }}</div>
                        <div v-if="tech.rating" class="flex items-center justify-center space-x-0.5 mb-1">
                          <span v-for="i in 5" :key="i"
                                :class="i <= tech.rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'"
                                class="text-xs">★</span>
                        </div>
                        <div v-if="tech.years_experience" class="text-xs text-gray-600 dark:text-gray-400">
                          {{ tech.years_experience }}yr{{ tech.years_experience > 1 ? 's' : '' }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Database & Tools -->
                <div v-if="databaseAndTools.length" class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-blue-100 dark:border-gray-700">
                  <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <LucideIcon name="database" class="w-5 h-5 text-blue-500" />
                    Database & Tools
                  </h4>
                  <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    <div
                      v-for="(tech, index) in databaseAndTools"
                      :key="tech.technology"
                      :style="{ animationDelay: `${index * 0.05}s` }"
                      class="group relative p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-lg border border-blue-200 dark:border-blue-700 hover:shadow-md hover:scale-105 transition-all duration-300 animate-fade-in-up cursor-pointer"
                    >
                      <div class="text-center">
                        <div class="flex justify-center mb-2">
                          <i v-if="getIconClass(tech.technology)"
                             :class="getIconClass(tech.technology)"
                             class="text-3xl leading-none"></i>
                          <LucideIcon v-else name="wrench" class="w-7 h-7 text-blue-500" />
                        </div>
                        <div class="font-medium text-blue-800 dark:text-blue-200 text-sm mb-2">{{ tech.technology }}</div>
                        <div v-if="tech.rating" class="flex items-center justify-center space-x-0.5 mb-1">
                          <span v-for="i in 5" :key="i"
                                :class="i <= tech.rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'"
                                class="text-xs">★</span>
                        </div>
                        <div v-if="tech.years_experience" class="text-xs text-gray-600 dark:text-gray-400">
                          {{ tech.years_experience }}yr{{ tech.years_experience > 1 ? 's' : '' }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Other / uncategorised -->
                <div v-if="otherTech.length" class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-blue-100 dark:border-gray-700">
                  <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <LucideIcon name="layers" class="w-5 h-5 text-blue-500" />
                    Other Skills
                  </h4>
                  <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    <div
                      v-for="(tech, index) in otherTech"
                      :key="tech.technology"
                      :style="{ animationDelay: `${index * 0.05}s` }"
                      class="group relative p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-lg border border-blue-200 dark:border-blue-700 hover:shadow-md hover:scale-105 transition-all duration-300 animate-fade-in-up cursor-pointer"
                    >
                      <div class="text-center">
                        <div class="flex justify-center mb-2">
                          <i v-if="getIconClass(tech.technology)"
                             :class="getIconClass(tech.technology)"
                             class="text-3xl leading-none"></i>
                          <LucideIcon v-else name="sparkles" class="w-7 h-7 text-blue-500" />
                        </div>
                        <div class="font-medium text-blue-800 dark:text-blue-200 text-sm mb-2">{{ tech.technology }}</div>
                        <div v-if="tech.rating" class="flex items-center justify-center space-x-0.5 mb-1">
                          <span v-for="i in 5" :key="i"
                                :class="i <= tech.rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'"
                                class="text-xs">★</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          <!-- ── Sidebar ──────────────────────────────────────────── -->
          <div class="space-y-8">

            <!-- Languages -->
            <div v-if="ownerStore.owner.languages?.length" class="animate-slide-up-delayed">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <div class="w-5 h-5 bg-gradient-to-r from-cyan-400 to-blue-400 rounded flex-shrink-0"></div>
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
                    <div class="flex items-center gap-3">
                      <div class="w-2 h-2 rounded-full animate-pulse"
                           :class="language.is_native ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gradient-to-r from-blue-500 to-cyan-500'"></div>
                      <span class="text-gray-700 dark:text-gray-300 font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">{{ language.language }}</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <span class="text-sm text-gray-500 dark:text-gray-400 capitalize">{{ language.proficiency }}</span>
                      <span v-if="language.is_native" class="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 text-xs rounded-full animate-pulse">Native</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Hobbies with LucideIcon -->
            <div v-if="ownerStore.owner.hobbies?.length" class="animate-slide-up-delayed">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <div class="w-5 h-5 bg-gradient-to-r from-blue-400 to-cyan-400 rounded flex-shrink-0"></div>
                Hobbies & Interests
              </h3>
              <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-blue-100 dark:border-gray-700">
                <div class="space-y-3">
                  <div
                    v-for="(hobby, index) in ownerStore.owner.hobbies"
                    :key="hobby.name"
                    :style="{ animationDelay: `${index * 0.1}s` }"
                    class="group relative p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg border border-blue-200 dark:border-blue-700 hover:shadow-md transition-all duration-300 animate-fade-in-up cursor-pointer"
                    @click="toggleHobbyDescription(index)"
                  >
                    <div class="flex items-center gap-4">
                      <div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <!-- Real Lucide icon if it's a valid name, emoji fallback for legacy data -->
                        <LucideIcon
                          v-if="hobby.icon && isLucideName(hobby.icon)"
                          :name="hobby.icon"
                          class="text-white w-6 h-6"
                          :stroke-width="2"
                        />
                        <span v-else class="text-white text-lg">{{ hobby.icon || '🎯' }}</span>
                      </div>
                      <div class="flex-1 min-w-0">
                        <div class="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">{{ hobby.name }}</div>
                        <div
                          v-if="hobby.description"
                          class="text-sm text-gray-600 dark:text-gray-400 mt-1 transition-all duration-300"
                          :class="expandedHobbies.includes(index) ? 'line-clamp-none' : 'line-clamp-1'"
                        >{{ hobby.description }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Social/Connect — devicons replace emoji -->
            <div v-if="ownerStore.owner.urls?.length" class="animate-slide-up-delayed">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <div class="w-5 h-5 bg-gradient-to-r from-cyan-400 to-blue-400 rounded flex-shrink-0"></div>
                Connect
              </h3>
              <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-blue-100 dark:border-gray-700">
                <div class="space-y-3">
                  <a
                    v-for="link in ownerStore.owner.urls"
                    :key="link.platform"
                    v-show="link.url"
                    :href="buildPlatformUrl(link.platform, link.url)"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="flex items-center gap-3 p-3 rounded-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 dark:hover:from-blue-900/20 dark:hover:to-cyan-900/20 transition-all duration-300 group animate-fade-in-up"
                  >
                    <div class="w-9 h-9 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/40 dark:to-cyan-900/40 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200 flex-shrink-0">
                      <!-- Devicon for known platforms, Lucide link for others -->
                      <i v-if="getPlatformDeviconClass(link.platform)"
                         :class="getPlatformDeviconClass(link.platform)"
                         class="text-lg leading-none"></i>
                      <LucideIcon v-else name="link" class="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div class="flex-1 min-w-0">
                      <div class="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 capitalize">{{ getPlatformLabel(link.platform) }}</div>
                      <div class="text-sm text-gray-500 dark:text-gray-400 truncate">{{ getPlatformDescription(link.platform) }}</div>
                    </div>
                    <LucideIcon name="arrow-up-right" class="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors duration-200 flex-shrink-0" />
                  </a>
                </div>
              </div>
            </div>

            <!-- Available status -->
            <div class="animate-slide-up-delayed">
              <div class="bg-gradient-to-r from-blue-600 to-cyan-600 p-6 rounded-xl text-white relative overflow-hidden">
                <div class="absolute inset-0 opacity-10" style="background-image: radial-gradient(circle at 25% 25%, white 2px, transparent 2px); background-size: 20px 20px;"></div>
                <div class="relative z-10">
                  <div class="flex items-center gap-3 mb-3">
                    <div class="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span class="font-semibold">Available for Projects</span>
                  </div>
                  <p class="text-blue-100 text-sm mb-4">Currently accepting new freelance projects and collaboration opportunities.</p>
                  <NuxtLink to="/contact"
                    class="inline-flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-all duration-200 group">
                    Get In Touch
                    <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
import { useOwnerStore }    from '~/stores/ownerStore'
import { useTechnologyStore } from '~/stores/technologyStore'
import { useTechnology }    from '~/composables/useTechnology'
import { useAboutPageMeta } from '~/composables/usePageMeta'
import { computed, ref, onMounted } from 'vue'

const ownerStore  = useOwnerStore()
const techStore   = useTechnologyStore()
const { getIconClass } = useTechnology()
const expandedHobbies = ref([])

// ── Tech stack categories ─────────────────────────────────────────────────────
// Uses the technology catalog's category field — dynamic, not hardcoded keywords.
// Falls back to keyword matching for techs not in the catalog.

const categorise = (tech) => {
  const entry = techStore.resolve(tech.technology)
  if (entry?.category && entry.category !== 'other') return entry.category
  // Fallback keyword grouping for uncatalogued techs
  const name = tech.technology.toLowerCase()
  if (/react|vue|angular|html|css|tailwind|bootstrap|sass|next|nuxt|vite|webpack|svelte/.test(name)) return 'javascript'
  if (/node|python|php|laravel|django|flask|express|fastapi|java|go|rust|c\+\+|c#/.test(name)) return 'backend'
  if (/mysql|postgres|mongo|redis|sqlite|firebase|supabase/.test(name)) return 'database'
  if (/docker|aws|git|github|vercel|netlify|nginx|linux/.test(name)) return 'devops'
  return 'other'
}

const frontendTech    = computed(() => (ownerStore.owner?.tech_stack ?? []).filter(t => ['javascript','css','html'].includes(categorise(t))))
const backendTech     = computed(() => (ownerStore.owner?.tech_stack ?? []).filter(t => ['php','python','systems','backend','mobile'].includes(categorise(t))))
const databaseAndTools= computed(() => (ownerStore.owner?.tech_stack ?? []).filter(t => ['database','devops'].includes(categorise(t))))
const otherTech       = computed(() => (ownerStore.owner?.tech_stack ?? []).filter(t => {
  const c = categorise(t)
  return !['javascript','css','html','php','python','systems','backend','mobile','database','devops'].includes(c)
}))

const toggleHobbyDescription = (i) => {
  const idx = expandedHobbies.value.indexOf(i)
  idx > -1 ? expandedHobbies.value.splice(idx, 1) : expandedHobbies.value.push(i)
}

// ── Icon helpers ──────────────────────────────────────────────────────────────

// Returns true for kebab-case Lucide names (e.g. "gamepad-2", "music")
// Returns false for emoji strings or blank
const isLucideName = (str) => str && /^[a-z0-9-]+$/.test(str)

// Devicon CSS class for social platform icons
const getPlatformDeviconClass = (platform) => {
  const map = {
    github:    'devicon-github-original',
    gitlab:    'devicon-gitlab-plain colored',
    linkedin:  'devicon-linkedin-plain colored',
    twitter:   'devicon-twitter-original colored',
    discord:   'devicon-discord-plain colored',
    youtube:   'devicon-youtube-plain colored',
    facebook:  'devicon-facebook-plain colored',
    instagram: null,  // not in devicon, use Lucide fallback
    slack:     'devicon-slack-plain colored',
    medium:    null,
    behance:   'devicon-behance-plain colored',
    dribbble:  'devicon-dribbble-plain colored',
    reddit:    null,
    tiktok:    null,
    telegram:  null,
    whatsapp:  null,
    website:   null,
    portfolio: null,
    blog:      null,
  }
  return map[platform] ?? null
}

const getPlatformLabel = (platform) => {
  const labels = { github:'GitHub',linkedin:'LinkedIn',twitter:'Twitter/X',instagram:'Instagram',facebook:'Facebook',youtube:'YouTube',tiktok:'TikTok',snapchat:'Snapchat',pinterest:'Pinterest',reddit:'Reddit',medium:'Medium',behance:'Behance',dribbble:'Dribbble',discord:'Discord',telegram:'Telegram',whatsapp:'WhatsApp',skype:'Skype',website:'Website',portfolio:'Portfolio',blog:'Blog' }
  return labels[platform] ?? (platform.charAt(0).toUpperCase() + platform.slice(1))
}

const getPlatformDescription = (platform) => {
  const desc = { github:'View code repositories',linkedin:'Professional network',twitter:'Follow updates',instagram:'Visual content',facebook:'Social updates',youtube:'Video content',tiktok:'Short videos',discord:'Gaming & chat',telegram:'Messaging',whatsapp:'Instant messaging',medium:'Articles & blogs',behance:'Creative portfolio',dribbble:'Design showcase',website:'Personal website' }
  return desc[platform] ?? 'Connect here'
}

const buildPlatformUrl = (platform, url) => {
  if (!url) return ''
  const msg = 'Hi! Found your profile and would like to connect.'
  switch (platform) {
    case 'whatsapp': return `https://wa.me/${url.replace(/\D/g,'')}?text=${encodeURIComponent(msg)}`
    case 'telegram': return `https://t.me/${url.replace('@','')}`
    case 'github':   return url.includes('github.com') ? url : `https://github.com/${url}`
    case 'linkedin': return url.includes('linkedin.com') ? url : `https://linkedin.com/in/${url}`
    case 'twitter':  return url.includes('twitter.com') || url.includes('x.com') ? url : `https://twitter.com/${url}`
    default:         return url.startsWith('http') ? url : `https://${url}`
  }
}

onMounted(async () => {
  await Promise.all([ownerStore.fetchOwner(), techStore.fetchCatalog()])
  if (ownerStore.owner) useAboutPageMeta(ownerStore.owner)
})
</script>

<style scoped>
@keyframes float         { 0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-20px) rotate(180deg)} }
@keyframes float-delayed { 0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-30px) rotate(-180deg)} }
@keyframes fade-in       { from{opacity:0}to{opacity:1} }
@keyframes slide-up      { from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)} }
@keyframes slide-up-delayed { from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)} }
@keyframes fade-in-up    { from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)} }
@keyframes zoom-in       { from{opacity:0;transform:scale(0.5)}to{opacity:1;transform:scale(1)} }

.animate-float            { animation: float 6s ease-in-out infinite }
.animate-float-delayed    { animation: float-delayed 8s ease-in-out infinite }
.animate-fade-in          { animation: fade-in 0.8s ease-out }
.animate-slide-up         { animation: slide-up 0.8s ease-out }
.animate-slide-up-delayed { animation: slide-up-delayed 0.8s ease-out 0.2s both }
.animate-fade-in-up       { animation: fade-in-up 0.6s ease-out both }
.animate-zoom-in          { animation: zoom-in 0.8s ease-out 0.3s both }

.line-clamp-1  { display:-webkit-box;-webkit-line-clamp:1;-webkit-box-orient:vertical;overflow:hidden }
.line-clamp-none { display:block;-webkit-line-clamp:unset;-webkit-box-orient:unset;overflow:visible }

.scrollbar-thin { scrollbar-width:thin }
.scrollbar-thin::-webkit-scrollbar { width:6px }
.scrollbar-thin::-webkit-scrollbar-track { background:#f1f5f9;border-radius:3px }
.dark .scrollbar-thin::-webkit-scrollbar-track { background:#374151 }
.scrollbar-thin::-webkit-scrollbar-thumb { background:#93c5fd;border-radius:3px }
.dark .scrollbar-thin::-webkit-scrollbar-thumb { background:#2563eb }
</style>
