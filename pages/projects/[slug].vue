<template>
    <div class="min-h-screen bg-white dark:bg-gray-900">
      
      <!-- Loading State -->
      <div v-if="projectStore.loading" class="animate-pulse">
        <div class="h-96 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600"></div>
        <div class="max-w-6xl mx-auto px-6 py-12 space-y-6">
          <div class="h-12 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-lg"></div>
          <div class="h-6 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded w-3/4"></div>
          <div class="h-4 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded w-1/2"></div>
        </div>
      </div>
  
      <!-- Project Content -->
      <div v-else-if="projectStore.project" class="animate-fade-in">
        
        <!-- Hero Section -->
        <section class="relative h-96 overflow-hidden">
          <img 
            :src="projectStore.project.cover_image" 
            :alt="projectStore.project.title"
            class="w-full h-full object-cover"
          >
          <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
          
          <!-- Project Title Overlay -->
          <div class="absolute bottom-0 left-0 right-0 p-8">
            <div class="max-w-6xl mx-auto">
              <h1 class="text-4xl lg:text-5xl font-bold text-white mb-4 animate-slide-up">
                {{ projectStore.project.title }}
              </h1>
              <div class="flex flex-wrap gap-4 animate-slide-up-delayed">
                <a 
                  v-if="projectStore.project.demo_url"
                  :href="projectStore.project.demo_url" 
                  target="_blank"
                  class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 space-x-2"
                >
                  <span>View Live Demo</span>
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                  </svg>
                </a>
                <NuxtLink 
                  to="/projects"
                  class="inline-flex items-center px-6 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-xl font-semibold transition-all duration-300 space-x-2"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                  </svg>
                  <span>Back to Projects</span>
                </NuxtLink>
              </div>
            </div>
          </div>
        </section>
  
        <!-- Project Details -->
        <section class="py-20">
          <div class="max-w-6xl mx-auto px-6">
            <div class="grid lg:grid-cols-3 gap-12">
              
              <!-- Main Content -->
              <div class="lg:col-span-2 space-y-12">
                
                <!-- Description -->
                <div class="animate-slide-up">
                  <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                    <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg mr-3"></div>
                    Project Overview
                  </h2>
                  <div class="prose prose-lg dark:prose-invert max-w-none">
                    <p class="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                      {{ projectStore.project.description }}
                    </p>
                  </div>
                </div>
  
                <!-- Image Gallery with Fixed Carousel -->
                <div v-if="projectStore.project.images?.length" class="animate-slide-up-delayed">
                  <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                    <div class="w-6 h-6 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-md mr-3"></div>
                    Project Gallery
                  </h3>
                  
                  <!-- Main Carousel Container -->
                  <div class="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-blue-100 dark:border-gray-700 overflow-hidden">
                    <!-- Main Image Display -->
                    <div class="relative h-96 overflow-hidden group">
                      <img 
                        :src="currentImage" 
                        :alt="projectStore.project.title"
                        class="w-full h-full object-cover transition-all duration-500 cursor-pointer"
                        @click="openLightbox"
                      >
                      
                      <!-- Navigation Arrows - Only show on hover -->
                      <button 
                        v-if="allImages.length > 1"
                        @click="previousImage"
                        class="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm hover:scale-110 opacity-0 group-hover:opacity-100"
                      >
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                        </svg>
                      </button>
                      
                      <button 
                        v-if="allImages.length > 1"
                        @click="nextImage"
                        class="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm hover:scale-110 opacity-0 group-hover:opacity-100"
                      >
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                        </svg>
                      </button>
                      
                      <!-- Image Counter - Only show on hover -->
                      <div v-if="allImages.length > 1" class="absolute bottom-4 right-4 px-3 py-1 bg-black/50 text-white text-sm rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        {{ currentImageIndex + 1 }} / {{ allImages.length }}
                      </div>
                      
                      <!-- Expand Icon - Only show on hover -->
                      <button 
                        @click="openLightbox"
                        class="absolute top-4 right-4 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm hover:scale-110 opacity-0 group-hover:opacity-100"
                      >
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/>
                        </svg>
                      </button>
                    </div>
  
                    <!-- Thumbnail Strip -->
                    <div v-if="allImages.length > 1" class="p-4 bg-gray-50 dark:bg-gray-700">
                      <div class="flex space-x-3 overflow-x-auto scrollbar-hide">
                        <button
                          v-for="(image, index) in allImages" 
                          :key="index"
                          @click="setCurrentImage(index)"
                          :class="{ 'ring-4 ring-blue-500': currentImageIndex === index }"
                          class="relative flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden hover:scale-105 transition-all duration-200 focus:outline-none"
                        >
                          <img 
                            :src="image" 
                            :alt="`${projectStore.project.title} - Image ${index + 1}`"
                            class="w-full h-full object-cover"
                          >
                          <div class="absolute inset-0 bg-black/20 hover:bg-black/10 transition-colors duration-200"
                               :class="{ 'bg-blue-500/20': currentImageIndex === index }"></div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
  
                <!-- Lightbox Modal -->
              <!-- Enhanced Lightbox Modal with Fixed Controls -->
<div v-if="lightboxOpen" 
     @click="closeLightbox"
     class="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 animate-fade-in">
  
  <!-- Fixed Controls Layer - Always visible and positioned -->
  <div class="absolute inset-0 pointer-events-none z-20">
    <!-- Close Button - Always top-right, never moves -->
    <button 
      @click="closeLightbox"
      class="absolute top-4 right-4 w-12 h-12 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm hover:scale-110 shadow-lg pointer-events-auto focus:outline-none focus:ring-2 focus:ring-white/50"
      aria-label="Close lightbox"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
      </svg>
    </button>
    
    <!-- Navigation Controls - Only show if multiple images -->
    <template v-if="allImages.length > 1">
      <!-- Previous Button - Always left center -->
      <button 
        @click.stop="previousImage"
        class="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm hover:scale-110 shadow-lg pointer-events-auto focus:outline-none focus:ring-2 focus:ring-white/50"
        aria-label="Previous image"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
      </button>
      
      <!-- Next Button - Always right center -->
      <button 
        @click.stop="nextImage"
        class="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm hover:scale-110 shadow-lg pointer-events-auto focus:outline-none focus:ring-2 focus:ring-white/50"
        aria-label="Next image"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
      </button>
      
      <!-- Image Counter - Always bottom center -->
      <div class="absolute bottom-6 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-black/60 text-white text-sm rounded-full backdrop-blur-sm shadow-lg pointer-events-none">
        {{ currentImageIndex + 1 }} of {{ allImages.length }}
      </div>
      
      <!-- Thumbnail Navigation - Bottom of screen -->
      <div class="absolute bottom-20 left-1/2 transform -translate-x-1/2 pointer-events-auto">
        <div class="flex space-x-2 bg-black/40 backdrop-blur-sm rounded-full p-2 max-w-md overflow-x-auto scrollbar-hide">
          <button
            v-for="(image, index) in allImages.slice(0, 8)" 
            :key="index"
            @click.stop="setCurrentImage(index)"
            :class="{ 'ring-2 ring-white': currentImageIndex === index }"
            class="relative flex-shrink-0 w-12 h-8 rounded-md overflow-hidden hover:scale-110 transition-all duration-200 focus:outline-none"
            :aria-label="`Go to image ${index + 1}`"
          >
            <img 
              :src="image" 
              :alt="`Thumbnail ${index + 1}`"
              class="w-full h-full object-cover"
            >
          </button>
          <div v-if="allImages.length > 8" class="flex items-center px-2 text-white/70 text-xs">
            +{{ allImages.length - 8 }}
          </div>
        </div>
      </div>
    </template>
  </div>
  
  <!-- Image Container - Properly constrained -->
  <div class="w-full h-full flex items-center justify-center p-4" @click.stop>
    <!-- Image with proper constraints -->
    <div class="relative max-w-full max-h-full flex items-center justify-center">
      <img 
        :src="currentImage" 
        :alt="`${projectStore.project.title} - Image ${currentImageIndex + 1}`"
        class="max-w-full max-h-full object-contain rounded-lg shadow-2xl transition-opacity duration-300"
        style="max-width: calc(100vw - 8rem); max-height: calc(100vh - 12rem);"
        @load="imageLoaded = true"
        @error="imageError = true"
      >
      
      <!-- Loading indicator -->
      <div v-if="!imageLoaded" class="absolute inset-0 flex items-center justify-center">
        <div class="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
      </div>
    </div>
  </div>
  
  <!-- Keyboard shortcuts hint -->
  <div class="absolute top-4 left-4 text-white/70 text-xs bg-black/40 backdrop-blur-sm rounded-lg px-3 py-2 pointer-events-none">
    <div>ESC to close</div>
    <div v-if="allImages.length > 1">← → to navigate</div>
  </div>
</div>
                <!-- Key Features -->
                <div v-if="projectStore.project.key_features?.length" class="animate-slide-up-delayed">
                  <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                    <div class="w-6 h-6 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-md mr-3"></div>
                    Key Features
                  </h3>
                  <div class="grid md:grid-cols-2 gap-6">
                    <div 
                      v-for="(feature, index) in projectStore.project.key_features" 
                      :key="index"
                      :style="{ animationDelay: `${index * 0.1}s` }"
                      class="flex items-start space-x-4 p-6 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl border border-blue-200 dark:border-blue-700 hover:shadow-lg transition-all duration-300 animate-fade-in-up"
                    >
                      <!-- Feature Icon -->
                      <div class="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                        <span v-if="feature.icon" class="text-white text-lg">
                          {{ feature.icon.startsWith('fa-') || feature.icon.startsWith('icon-') ? '' : feature.icon }}
                        </span>
                        <svg v-else class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                        </svg>
                      </div>
                      <div class="flex-1">
                        <h4 class="font-semibold text-gray-900 dark:text-white mb-2">{{ feature.title }}</h4>
                        <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{{ feature.description }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
  
              <!-- Sidebar -->
              <div class="space-y-8">
                
                <!-- Technologies -->
                <div class="animate-slide-up">
                  <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                    <div class="w-5 h-5 bg-gradient-to-r from-blue-400 to-cyan-400 rounded mr-2"></div>
                    Technologies Used
                  </h3>
                  <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-blue-100 dark:border-gray-700">
                    <div class="flex flex-wrap gap-3">
                      <span 
                        v-for="(tech, index) in projectStore.project.technologies" 
                        :key="tech"
                        :style="{ animationDelay: `${index * 0.1}s` }"
                        class="px-3 py-2 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 border border-blue-200 dark:border-blue-700 text-blue-800 dark:text-blue-200 rounded-lg text-sm font-medium hover:scale-105 transition-all duration-300 animate-fade-in-up cursor-default"
                      >
                        {{ tech }}
                      </span>
                    </div>
                  </div>
                </div>
  
                <!-- Project Links -->
                <div class="animate-slide-up-delayed">
                  <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                    <div class="w-5 h-5 bg-gradient-to-r from-cyan-400 to-blue-400 rounded mr-2"></div>
                    Project Links
                  </h3>
                  <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-blue-100 dark:border-gray-700 space-y-4">
                    <!-- Live Demo -->
                    <a 
                      v-if="projectStore.project.demo_url"
                      :href="projectStore.project.demo_url" 
                      target="_blank"
                      class="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg hover:from-blue-100 hover:to-cyan-100 dark:hover:from-blue-900/30 dark:hover:to-cyan-900/30 transition-all duration-300 group"
                    >
                      <div class="flex items-center space-x-3">
                        <div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                          </svg>
                        </div>
                        <div>
                          <div class="font-semibold text-gray-900 dark:text-white">Live Demo</div>
                          <div class="text-sm text-gray-600 dark:text-gray-400">View the live project</div>
                        </div>
                      </div>
                      <svg class="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                      </svg>
                    </a>
  
                    <!-- Source Code Links -->
                    <div v-for="source in projectStore.project.source_code" :key="source.platform">
                      <a 
                        v-if="source.is_public"
                        :href="source.url" 
                        target="_blank"
                        class="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-700 dark:to-gray-800 rounded-lg hover:from-gray-100 hover:to-blue-100 dark:hover:from-gray-600 dark:hover:to-gray-700 transition-all duration-300 group"
                      >
                        <div class="flex items-center space-x-3">
                          <div class="w-10 h-10 bg-gradient-to-r from-gray-600 to-gray-700 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                            <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                          </div>
                          <div>
                            <div class="font-semibold text-gray-900 dark:text-white">{{ source.label }}</div>
                            <div class="text-sm text-gray-600 dark:text-gray-400">{{ source.platform }} • {{ source.branch }} branch</div>
                          </div>
                        </div>
                        <svg class="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                        </svg>
                      </a>
                      
                      <div v-else class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div class="flex items-center space-x-3">
                          <div class="w-10 h-10 bg-gray-200 dark:bg-gray-600 rounded-lg flex items-center justify-center">
                            <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                          </div>
                          <div>
                            <div class="font-semibold text-gray-900 dark:text-white">{{ source.label }}</div>
                            <div class="text-sm text-gray-600 dark:text-gray-400">Private repository</div>
                          </div>
                        </div>
                        <span class="text-xs text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">Private</span>
                      </div>
                    </div>
                  </div>
                </div>
  
                <!-- Project Stats -->
                <div class="animate-slide-up-delayed">
                  <div class="bg-gradient-to-r from-blue-600 to-cyan-600 p-6 rounded-xl text-white">
                    <h3 class="text-lg font-bold mb-4">Project Details</h3>
                    <div class="space-y-3 text-sm">
                      <div class="flex justify-between">
                        <span class="text-blue-100">Status:</span>
                        <span class="font-medium capitalize flex items-center">
                          <span class="w-2 h-2 rounded-full mr-2"
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
                      <div class="flex justify-between">
                        <span class="text-blue-100">Type:</span>
                        <span class="font-medium capitalize">{{ projectStore.project.type?.replace('_', ' ') }}</span>
                      </div>
                      <div class="flex justify-between">
                        <span class="text-blue-100">Duration:</span>
                        <span class="font-medium">{{ projectStore.project.formatted_duration || 'N/A' }}</span>
                      </div>
                      <div v-if="projectStore.project.completion_date" class="flex justify-between">
                        <span class="text-blue-100">Completed:</span>
                        <span class="font-medium">{{ new Date(projectStore.project.completion_date).toLocaleDateString() }}</span>
                      </div>
                      <div class="flex justify-between">
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
  
        <!-- Related Projects -->
        <section class="py-20 bg-gradient-to-r from-gray-50 to-blue-50/30 dark:from-gray-800 dark:to-gray-900">
          <div class="max-w-6xl mx-auto px-6">
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
              More Projects
            </h2>
            <div class="text-center">
              <NuxtLink 
                to="/projects"
                class="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 space-x-2"
              >
                <span>View All Projects</span>
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </NuxtLink>
            </div>
          </div>
        </section>
      </div>
  
      <!-- Error State -->
      <div v-else-if="projectStore.error" class="min-h-screen flex items-center justify-center">
        <div class="text-center">
          <div class="w-24 h-24 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg class="w-12 h-12 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Project Not Found</h2>
          <p class="text-gray-600 dark:text-gray-400 mb-6">{{ projectStore.error }}</p>
          <NuxtLink 
            to="/projects"
            class="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors duration-200 space-x-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
  import { useRoute } from 'vue-router'
  import { useProjectStore } from '~/stores/projectStore'
  import { useHead } from '#app'
  
  const route = useRoute()
  const projectStore = useProjectStore()
  
  const currentImageIndex = ref(0)
  const lightboxOpen = ref(false)
  
  const allImages = computed(() => {
    if (!projectStore.project) return []
    const images = [projectStore.project.main_image]
    if (projectStore.project.images?.length) {
      images.push(...projectStore.project.images)
    }
    return images.filter(Boolean)
  })
  
  const currentImage = computed(() => {
    return allImages.value[currentImageIndex.value] || projectStore.project?.main_image
  })
  
  const setCurrentImage = (index) => {
    currentImageIndex.value = index
  }
  
  const nextImage = () => {
    currentImageIndex.value = (currentImageIndex.value + 1) % allImages.value.length
  }
  
  const previousImage = () => {
    currentImageIndex.value = currentImageIndex.value === 0 
      ? allImages.value.length - 1 
      : currentImageIndex.value - 1
  }
  
  const openLightbox = () => {
    lightboxOpen.value = true
    document.body.style.overflow = 'hidden'
  }
  
  const closeLightbox = () => {
    lightboxOpen.value = false
    document.body.style.overflow = 'auto'
  }
  
  const headData = ref({
    title: 'Project Details - Portfolio',
    meta: [
      { name: 'description', content: 'Detailed view of project showcasing technologies, features, and implementation details.' }
    ]
    
  })

  const { data } = useHead(headData)


  
  const handleKeydown = (e) => {
    if (!lightboxOpen.value) return
    if (e.key === 'Escape') closeLightbox()
    if (e.key === 'ArrowLeft') previousImage()
    if (e.key === 'ArrowRight') nextImage()
  }
  
  onMounted(() => {
    document.addEventListener('keydown', handleKeydown)
  })
  
  onUnmounted(() => {
    document.removeEventListener('keydown', handleKeydown)
    document.body.style.overflow = 'auto'
  })
  
  onMounted(async () => {
    await projectStore.fetchProject(route.params.slug)
    
    if (projectStore.project) {
      headData.value.title = `${projectStore.project.title} - Portfolio`
      headData.value.meta = [
        { name: 'description', content: projectStore.project.description },
        { property: 'og:title', content: projectStore.project.title },
        { property: 'og:description', content: projectStore.project.description },
        { property: 'og:image', content: projectStore.project.cover_image },
      ]
    }
  })
  
  onUnmounted(() => {
    projectStore.clearProject()
  })
  </script>
  
  <style scoped>
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
  
  .animate-fade-in { animation: fade-in 0.8s ease-out; }
  .animate-slide-up { animation: slide-up 0.8s ease-out; }
  .animate-slide-up-delayed { animation: slide-up-delayed 0.8s ease-out 0.2s both; }
  .animate-fade-in-up { animation: fade-in-up 0.6s ease-out both; }
  
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  </style>
  