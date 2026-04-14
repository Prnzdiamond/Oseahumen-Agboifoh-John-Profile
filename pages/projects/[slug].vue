<template>
  <div class="min-h-screen bg-white dark:bg-gray-900">

    <!-- Loading State -->
    <div v-if="projectStore.loading" class="animate-pulse">
      <div class="h-48 sm:h-64 lg:h-96 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600"></div>
      <div class="max-w-full mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-4 sm:space-y-6">
        <div class="h-8 sm:h-12 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-lg"></div>
        <div class="h-4 sm:h-6 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded w-3/4"></div>
        <div class="h-3 sm:h-4 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded w-1/2"></div>
      </div>
    </div>

    <!-- Project Content -->
    <div v-else-if="projectStore.project" class="animate-fade-in">

      <!-- Hero Section -->
      <section class="relative h-48 sm:h-64 lg:h-96 overflow-hidden">
        <NuxtImg
          :src="heroImage"
          :alt="projectStore.project?.title || 'Project'"
          class="w-full h-full object-cover"
          @error="$event.target.src = '/images/default_pro_cover.png'"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

        <div class="absolute bottom-0 left-0 right-0 p-3 sm:p-6 lg:p-8">
          <div class="max-w-full mx-auto">
            <h1 class="text-xl sm:text-2xl lg:text-4xl xl:text-5xl font-bold text-white mb-2 sm:mb-4 animate-slide-up leading-tight break-words">
              {{ projectStore.project.title }}
            </h1>
            <div class="flex flex-col sm:flex-row gap-2 sm:gap-4 animate-slide-up-delayed">
              <a
                v-if="projectStore.project.demo_url"
                :href="projectStore.project.demo_url"
                target="_blank"
                class="inline-flex items-center justify-center px-3 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg sm:rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 gap-2 text-sm sm:text-base"
              >
                <span>View Live Demo</span>
                <svg class="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                </svg>
              </a>
              <NuxtLink
                to="/projects"
                class="inline-flex items-center justify-center px-3 sm:px-6 py-2 sm:py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-lg sm:rounded-xl font-semibold transition-all duration-300 gap-2 text-sm sm:text-base"
              >
                <svg class="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                </svg>
                <span>Back to Projects</span>
              </NuxtLink>
            </div>
          </div>
        </div>
      </section>

      <!-- Project Details -->
      <section class="py-8 sm:py-12 lg:py-20">
        <div class="max-w-full mx-auto px-4 sm:px-6 lg:max-w-6xl">
          <div class="grid lg:grid-cols-3 gap-6 lg:gap-12">

            <!-- Main Content -->
            <div class="lg:col-span-2 space-y-6 sm:space-y-8 lg:space-y-12 min-w-0">

              <!-- Description -->
              <div class="animate-slide-up">
                <h2 class="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 flex items-center">
                  <div class="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg mr-2 sm:mr-3 flex-shrink-0"></div>
                  <span class="break-words">Project Overview</span>
                </h2>
                <div class="prose prose-sm sm:prose-base lg:prose-lg dark:prose-invert max-w-none">
                  <p class="text-gray-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base lg:text-lg break-words">
                    {{ projectStore.project.description }}
                  </p>
                </div>
              </div>

              <!-- Image Gallery -->
              <div v-if="projectStore.project.images?.length" class="animate-slide-up-delayed">
                <h3 class="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 flex items-center">
                  <div class="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-md mr-2 sm:mr-3 flex-shrink-0"></div>
                  <span class="break-words">Project Gallery</span>
                </h3>
                <div class="relative bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl lg:rounded-2xl shadow-xl border border-blue-100 dark:border-gray-700 overflow-hidden">
                  <div class="relative h-48 sm:h-64 lg:h-80 xl:h-96 overflow-hidden group">
                    <NuxtImg
                      :src="currentImage"
                      :alt="projectStore.project?.title || 'Project'"
                      class="w-full h-full object-cover transition-all duration-500 cursor-pointer"
                      @click="openLightbox"
                      @error="$event.target.src = '/images/default_pro_img.png'"
                    />
                    <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <button v-if="allImages.length > 1" @click="previousImage"
                      class="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm">
                      <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                      </svg>
                    </button>
                    <button v-if="allImages.length > 1" @click="nextImage"
                      class="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm">
                      <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                      </svg>
                    </button>
                    <div v-if="allImages.length > 1" class="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 px-2 sm:px-3 py-1 bg-black/50 text-white text-xs sm:text-sm rounded-full backdrop-blur-sm">
                      {{ currentImageIndex + 1 }} / {{ allImages.length }}
                    </div>
                  </div>
                  <div v-if="allImages.length > 1" class="p-2 sm:p-3 lg:p-4 bg-gray-50 dark:bg-gray-700">
                    <div class="flex space-x-2 sm:space-x-3 overflow-x-auto scrollbar-hide">
                      <button v-for="(image, index) in allImages" :key="index" @click="setCurrentImage(index)"
                        :class="{ 'ring-2 ring-blue-500': currentImageIndex === index }"
                        class="relative flex-shrink-0 w-12 h-9 sm:w-16 sm:h-12 lg:w-20 lg:h-16 rounded-md overflow-hidden hover:scale-105 transition-all duration-200">
                        <NuxtImg :src="image" :alt="`${projectStore.project?.title} - Image ${index + 1}`"
                          class="w-full h-full object-cover"
                          @error="$event.target.src = '/images/default_pro_img.png'" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Lightbox -->
              <div v-if="lightboxOpen" @click="closeLightbox"
                class="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 animate-fade-in">
                <div class="absolute inset-0 pointer-events-none z-20">
                  <button @click="closeLightbox"
                    class="absolute top-2 sm:top-4 right-2 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center pointer-events-auto">
                    <svg class="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                  </button>
                  <template v-if="allImages.length > 1">
                    <button @click.stop="previousImage"
                      class="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center pointer-events-auto">
                      <svg class="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                      </svg>
                    </button>
                    <button @click.stop="nextImage"
                      class="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center pointer-events-auto">
                      <svg class="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                      </svg>
                    </button>
                    <div class="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/60 text-white text-sm rounded-full pointer-events-none">
                      {{ currentImageIndex + 1 }} of {{ allImages.length }}
                    </div>
                  </template>
                </div>
                <div class="w-full h-full flex items-center justify-center p-4" @click.stop>
                  <NuxtImg :src="currentImage" :alt="projectStore.project?.title"
                    class="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                    style="max-width: calc(100vw - 2rem); max-height: calc(100vh - 6rem);"
                    @error="$event.target.src = '/images/default_pro_img.png'" />
                </div>
              </div>

              <!-- ── Key Features — with real Lucide icons ───────────────── -->
              <div v-if="projectStore.project.key_features?.length" class="animate-slide-up-delayed">
                <h3 class="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 flex items-center">
                  <div class="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-md mr-2 sm:mr-3 flex-shrink-0"></div>
                  <span class="break-words">Key Features</span>
                </h3>
                <div class="grid gap-4 sm:gap-6 md:grid-cols-2">
                  <div
                    v-for="(feature, index) in projectStore.project.key_features"
                    :key="index"
                    :style="{ animationDelay: `${index * 0.1}s` }"
                    class="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 lg:p-6 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg sm:rounded-xl border border-blue-200 dark:border-blue-700 hover:shadow-lg transition-all duration-300 animate-fade-in-up"
                  >
                    <!-- Feature icon — resolved to real Lucide SVG, never just text -->
                    <div class="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg sm:rounded-xl flex items-center justify-center">
                      <LucideIcon
                        v-if="feature.icon"
                        :name="feature.icon"
                        class="text-white w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6"
                        :stroke-width="2"
                      />
                      <!-- Default checkmark when no icon is set -->
                      <svg v-else class="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                      </svg>
                    </div>
                    <div class="flex-1 min-w-0">
                      <h4 class="font-semibold text-gray-900 dark:text-white mb-1 sm:mb-2 text-sm sm:text-base break-words">{{ feature.title }}</h4>
                      <p class="text-gray-600 dark:text-gray-400 text-xs sm:text-sm leading-relaxed break-words">{{ feature.description }}</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            <!-- Sidebar -->
            <div class="space-y-4 sm:space-y-6 lg:space-y-8 min-w-0">

              <!-- ── Technologies with devicons ─────────────────────────── -->
              <div class="animate-slide-up">
                <h3 class="text-base sm:text-lg lg:text-xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 flex items-center">
                  <div class="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 bg-gradient-to-r from-blue-400 to-cyan-400 rounded mr-2 flex-shrink-0"></div>
                  <span class="break-words">Technologies Used</span>
                </h3>
                <div class="bg-white dark:bg-gray-800 p-3 sm:p-4 lg:p-6 rounded-lg sm:rounded-xl shadow-lg border border-blue-100 dark:border-gray-700">
                  <div class="flex flex-wrap gap-2 sm:gap-3">
                    <span
                      v-for="(tech, index) in projectStore.project.technologies"
                      :key="tech"
                      :style="{ animationDelay: `${index * 0.1}s` }"
                      class="inline-flex items-center gap-1.5 px-2 sm:px-3 py-1 sm:py-2 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 border border-blue-200 dark:border-blue-700 text-blue-800 dark:text-blue-200 rounded-md sm:rounded-lg text-xs sm:text-sm font-medium hover:scale-105 transition-all duration-300 animate-fade-in-up cursor-default"
                    >
                      <i v-if="getIconClass(tech)" :class="getIconClass(tech)" class="text-base leading-none flex-shrink-0"></i>
                      {{ tech }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Project Links -->
              <div class="animate-slide-up-delayed">
                <h3 class="text-base sm:text-lg lg:text-xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 flex items-center">
                  <div class="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 bg-gradient-to-r from-cyan-400 to-blue-400 rounded mr-2 flex-shrink-0"></div>
                  <span class="break-words">Project Links</span>
                </h3>
                <div class="bg-white dark:bg-gray-800 p-3 sm:p-4 lg:p-6 rounded-lg sm:rounded-xl shadow-lg border border-blue-100 dark:border-gray-700 space-y-3 sm:space-y-4">
                  <a v-if="projectStore.project.demo_url" :href="projectStore.project.demo_url" target="_blank"
                    class="flex items-center justify-between p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg hover:from-blue-100 hover:to-cyan-100 dark:hover:from-blue-900/30 dark:hover:to-cyan-900/30 transition-all duration-300 group">
                    <div class="flex items-center gap-3 min-w-0 flex-1">
                      <div class="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200 flex-shrink-0">
                        <svg class="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                        </svg>
                      </div>
                      <div class="min-w-0 flex-1">
                        <div class="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">Live Demo</div>
                        <div class="text-xs sm:text-sm text-gray-600 dark:text-gray-400">View the live project</div>
                      </div>
                    </div>
                    <svg class="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors duration-200 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                    </svg>
                  </a>

                  <div v-for="source in projectStore.project.source_code" :key="source.platform">
                    <a v-if="source.is_public" :href="source.url" target="_blank"
                      class="flex items-center justify-between p-3 sm:p-4 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-700 dark:to-gray-800 rounded-lg hover:from-gray-100 hover:to-blue-100 dark:hover:from-gray-600 dark:hover:to-gray-700 transition-all duration-300 group">
                      <div class="flex items-center gap-3 min-w-0 flex-1">
                        <div class="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-gradient-to-r from-gray-600 to-gray-700 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200 flex-shrink-0">
                          <!-- GitHub devicon -->
                          <i class="devicon-github-original text-white text-base leading-none"></i>
                        </div>
                        <div class="min-w-0 flex-1">
                          <div class="font-semibold text-gray-900 dark:text-white text-sm sm:text-base break-words">{{ source.label }}</div>
                          <div class="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{{ source.platform }} • {{ source.branch }} branch</div>
                        </div>
                      </div>
                      <svg class="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors duration-200 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                      </svg>
                    </a>

                    <div v-else class="flex items-center justify-between p-3 sm:p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div class="flex items-center gap-3 min-w-0 flex-1">
                        <div class="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-gray-200 dark:bg-gray-600 rounded-lg flex items-center justify-center flex-shrink-0">
                          <i class="devicon-github-original text-gray-500 dark:text-gray-400 text-base leading-none"></i>
                        </div>
                        <div class="min-w-0 flex-1">
                          <div class="font-semibold text-gray-900 dark:text-white text-sm sm:text-base break-words">{{ source.label }}</div>
                          <div class="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Private repository</div>
                        </div>
                      </div>
                      <span class="text-xs text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded flex-shrink-0">Private</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Project Stats -->
              <div class="animate-slide-up-delayed">
                <div class="bg-gradient-to-r from-blue-600 to-cyan-600 p-3 sm:p-4 lg:p-6 rounded-lg sm:rounded-xl text-white">
                  <h3 class="text-sm sm:text-base lg:text-lg font-bold mb-3 sm:mb-4">Project Details</h3>
                  <div class="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                    <div class="flex justify-between items-center">
                      <span class="text-blue-100">Status:</span>
                      <span class="font-medium capitalize flex items-center gap-2">
                        <span class="w-2 h-2 rounded-full flex-shrink-0"
                              :class="{
                                'bg-green-400': projectStore.project.status === 'completed',
                                'bg-blue-400': projectStore.project.status === 'in_progress',
                                'bg-yellow-400': projectStore.project.status === 'planning',
                                'bg-gray-400': projectStore.project.status === 'on_hold',
                                'bg-red-400': projectStore.project.status === 'cancelled'
                              }"></span>
                        {{ projectStore.project.status?.replace('_', ' ') }}
                      </span>
                    </div>
                    <div class="flex justify-between items-center">
                      <span class="text-blue-100">Type:</span>
                      <span class="font-medium capitalize">{{ projectStore.project.type?.replace('_', ' ') }}</span>
                    </div>
                    <div class="flex justify-between items-center">
                      <span class="text-blue-100">Duration:</span>
                      <span class="font-medium">{{ projectStore.project.formatted_duration || 'N/A' }}</span>
                    </div>
                    <div v-if="projectStore.project.completion_date" class="flex justify-between items-center">
                      <span class="text-blue-100">Completed:</span>
                      <span class="font-medium">{{ new Date(projectStore.project.completion_date).toLocaleDateString() }}</span>
                    </div>
                    <div class="flex justify-between items-center">
                      <span class="text-blue-100">Technologies:</span>
                      <span class="font-medium">{{ projectStore.project.technologies?.length || 0 }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- More Projects CTA -->
      <section class="py-8 sm:py-12 lg:py-20 bg-gradient-to-r from-gray-50 to-blue-50/30 dark:from-gray-800 dark:to-gray-900">
        <div class="max-w-full mx-auto px-4 sm:px-6 lg:max-w-6xl text-center">
          <h2 class="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8 lg:mb-12 break-words">More Projects</h2>
          <NuxtLink to="/projects"
            class="inline-flex items-center gap-2 px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg sm:rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 text-sm sm:text-base">
            <span>View All Projects</span>
            <svg class="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </NuxtLink>
        </div>
      </section>
    </div>

    <!-- Error State -->
    <div v-else-if="projectStore.error" class="min-h-screen flex items-center justify-center px-4">
      <div class="text-center max-w-sm mx-auto">
        <div class="w-16 h-16 sm:w-20 sm:h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
          <svg class="w-8 h-8 sm:w-10 sm:h-10 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
        <h2 class="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-2">Project Not Found</h2>
        <p class="text-gray-600 dark:text-gray-400 mb-4 sm:mb-6 text-sm sm:text-base">{{ projectStore.error }}</p>
        <NuxtLink to="/projects"
          class="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg sm:rounded-xl font-semibold transition-colors duration-200 text-sm sm:text-base">
          <svg class="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
          <span>Back to Projects</span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRoute }          from 'vue-router'
import { useProjectStore }   from '~/stores/projectStore'
import { useTechnology }     from '~/composables/useTechnology'
import { useTechnologyStore }from '~/stores/technologyStore'
import { useProjectPageMeta }from '~/composables/usePageMeta'

const route        = useRoute()
const projectStore = useProjectStore()
const techStore    = useTechnologyStore()
const { getIconClass } = useTechnology()

// ── Gallery state ─────────────────────────────────────────────────────────────
const currentImageIndex = ref(0)
const lightboxOpen      = ref(false)

const galleryImages = computed(() => {
  if (!projectStore.project) return ['/images/default_pro_img.png']
  const images = []
  if (projectStore.project.main_image) images.push(projectStore.project.main_image)
  else images.push('/images/default_pro_img.png')
  if (projectStore.project.images?.length) images.push(...projectStore.project.images)
  return images
})

const allImages    = computed(() => galleryImages.value)
const currentImage = computed(() => allImages.value[currentImageIndex.value] || '/images/default_pro_img.png')
const heroImage    = computed(() => projectStore.project?.cover_image || '/images/default_pro_cover.png')

const setCurrentImage = (i) => { currentImageIndex.value = i }
const nextImage     = () => { currentImageIndex.value = (currentImageIndex.value + 1) % allImages.value.length }
const previousImage = () => { currentImageIndex.value = currentImageIndex.value === 0 ? allImages.value.length - 1 : currentImageIndex.value - 1 }
const openLightbox  = () => { lightboxOpen.value = true;  document.body.style.overflow = 'hidden' }
const closeLightbox = () => { lightboxOpen.value = false; document.body.style.overflow = 'auto' }

const handleKeydown = (e) => {
  if (!lightboxOpen.value) return
  if (e.key === 'Escape')      closeLightbox()
  if (e.key === 'ArrowLeft')   previousImage()
  if (e.key === 'ArrowRight')  nextImage()
}

onMounted(() => document.addEventListener('keydown', handleKeydown))
onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = 'auto'
})

// ── SEO + JSON-LD ─────────────────────────────────────────────────────────────
const siteUrl = 'https://oseahumen-agboifoh-john.vercel.app'

onMounted(async () => {
  await Promise.all([
    projectStore.fetchProject(route.params.slug),
    techStore.fetchCatalog(),
  ])

  if (!projectStore.project) return

  const p = projectStore.project

  // Dynamic meta tags
  useProjectPageMeta(p)

  // SoftwareApplication JSON-LD structured data
  // This is what gets you rich results in Google Search
  useHead({
    script: [{
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        'name': p.title,
        'description': p.description,
        'applicationCategory': 'WebApplication',
        'operatingSystem': 'Web',
        'url': p.demo_url || `${siteUrl}/projects/${p.slug}`,
        'image': p.cover_image || `${siteUrl}/images/default_pro_cover.png`,
        'dateCreated': p.created_at,
        'dateModified': p.updated_at,
        ...(p.completion_date ? { 'datePublished': p.completion_date } : {}),
        'programmingLanguage': p.technologies ?? [],
        ...(p.demo_url ? { 'installUrl': p.demo_url } : {}),
        ...(p.primary_source_url ? {
          'codeRepository': p.primary_source_url,
          'downloadUrl': p.primary_source_url,
        } : {}),
        'author': {
          '@type': 'Person',
          'name': 'Oseahumen Agboifoh John',
          'url': siteUrl,
        },
        'offers': {
          '@type': 'Offer',
          'price': '0',
          'priceCurrency': 'USD',
        },
      }),
    }],
  })
})

onUnmounted(() => projectStore.clearProject())
</script>

<style scoped>
@keyframes fade-in     { from{opacity:0}to{opacity:1} }
@keyframes slide-up    { from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)} }
@keyframes slide-up-delayed { from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)} }
@keyframes fade-in-up  { from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)} }

.animate-fade-in          { animation: fade-in 0.8s ease-out }
.animate-slide-up         { animation: slide-up 0.8s ease-out }
.animate-slide-up-delayed { animation: slide-up-delayed 0.8s ease-out 0.2s both }
.animate-fade-in-up       { animation: fade-in-up 0.6s ease-out both }

.scrollbar-hide { -ms-overflow-style:none; scrollbar-width:none }
.scrollbar-hide::-webkit-scrollbar { display:none }
* { box-sizing:border-box }
.min-w-0 { min-width:0 }
.break-words { word-wrap:break-word; word-break:break-word; overflow-wrap:break-word }
</style>
