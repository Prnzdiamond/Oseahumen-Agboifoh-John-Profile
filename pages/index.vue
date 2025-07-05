<template>
    <div class="min-h-screen bg-white dark:bg-gray-900 overflow-hidden">
      <!-- Animated Background Elements -->
      <div class="fixed inset-0 pointer-events-none">
        <div class="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
        <div class="absolute top-40 right-20 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl animate-float-delayed"></div>
        <div class="absolute bottom-20 left-1/3 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl animate-float-slow"></div>
      </div>
  
      <!-- Hero Section -->
      <section class="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
        <div class="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          
          <!-- Hero Content -->
          <div class="text-center lg:text-left space-y-8 animate-slide-up">
            <!-- Loading State -->
            <div v-if="ownerStore.loading" class="space-y-4">
              <div class="h-16 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-lg animate-pulse"></div>
              <div class="h-8 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-lg animate-pulse"></div>
              <div class="h-6 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-lg animate-pulse"></div>
            </div>
  
            <!-- Dynamic Content -->
            <div v-else-if="ownerStore.owner && !ownerStore.error" class="space-y-8">
              <div class="space-y-6">
                <!-- Animated Greeting -->
                <div class="overflow-hidden">
                  <h1 class="text-3xl lg:text-5xl font-bold leading-tight">
                    <span class="inline-block text-gray-900 dark:text-white animate-slide-in-left">Hi, I'm</span>
                    <span class="block  bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent animate-gradient-text animate-slide-in-right">
                      {{ ownerStore.owner.name }}
                    </span>
                  </h1>
                </div>
                
                <!-- Typewriter Effect Headline -->
                <div class="h-16 lg:h-20">
                <p class="text-2xl lg:text-3xl text-gray-600 dark:text-gray-300 font-light">
                  <span class="typewriter">{{ displayedHeadline }}</span>
                  <span class="cursor animate-blink">|</span>
                </p>
              </div>
                
                <!-- Animated Bio -->
                <div class="overflow-hidden">
                <p class="text-lg text-gray-700 dark:text-gray-400 max-w-2xl leading-relaxed animate-fade-in-up-delayed">
                  {{ truncatedBio }}
                  <span v-if="ownerStore.owner.bio && ownerStore.owner.bio.length > 200" class="text-gray-500">...</span>
                </p>
                <NuxtLink 
                  v-if="ownerStore.owner.bio && ownerStore.owner.bio.length > 200"
                  to="/about"
                  class="inline-flex items-center mt-3 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors duration-200 group"
                >
                  <span>Read more about me</span>
                  <svg class="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                  </svg>
                </NuxtLink>
              </div>
              </div>
  
              <!-- Floating Tech Stack Badges with Icons -->
              <div v-if="ownerStore.owner.tech_stack?.length" class="relative">
                <p class="text-sm text-gray-500 dark:text-gray-400 mb-4 animate-fade-in">Technologies I master:</p>
                <div class="flex flex-wrap gap-3">
                  <div 
                    v-for="(tech, index) in ownerStore.owner.tech_stack.slice(0, 8)" 
                    :key="tech.technology"
                    :style="{ animationDelay: `${index * 0.1}s` }"
                    class="group relative px-4 py-2 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 
                           border border-blue-200 dark:border-blue-700 text-blue-800 dark:text-blue-200 
                           rounded-full text-sm font-medium hover:scale-110 hover:shadow-xl hover:shadow-blue-500/25
                           transition-all duration-300 animate-float-in cursor-default
                           hover:bg-gradient-to-r hover:from-blue-100 hover:to-cyan-100 
                           dark:hover:from-blue-800/40 dark:hover:to-cyan-800/40"
                  >
                    <!-- Tech Icon -->
                    <div class="flex items-center space-x-2">
                      <span class="text-lg">{{ getTechIcon(tech.technology) }}</span>
                      <span class="relative z-10">{{ tech.technology }}</span>
                      <span v-if="tech.rating" class="ml-1 text-xs opacity-75 relative z-10">
                        {{ '★'.repeat(tech.rating) }}
                      </span>
                    </div>
                    
                    <!-- Animated Background -->
                    <div class="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                    
                    <!-- Tooltip -->
                    <div class="absolute -top-12 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-20">
                      {{ tech.technology }}
                      <span v-if="tech.years_experience"> • {{ tech.years_experience }} year{{ tech.years_experience > 1 ? 's' : '' }}</span>
                      <span v-if="tech.rating"> • {{ tech.rating }}/5 ★</span>
                      <div class="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-gray-700"></div>
                    </div>
                  </div>
                </div>
              </div>
  
              <!-- Enhanced CTA Buttons with More Animations -->
              <div class="flex flex-col sm:flex-row gap-4 pt-4 mb-5">
                <NuxtLink 
                  to="/projects"
                  class="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 
                         hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-semibold 
                         transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25
                         flex items-center justify-center space-x-2 overflow-hidden animate-bounce-in"
                >
                  <!-- Animated Background -->
                  <div class="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 
                             group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <!-- Ripple Effect -->
                  <div class="absolute inset-0 bg-white/20 scale-0 rounded-xl group-active:scale-100 transition-transform duration-200"></div>
                  
                  <!-- Pulsing Border -->
                  <div class="absolute inset-0 rounded-xl border-2 border-white/30 scale-100 group-hover:scale-110 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                  
                  <span class="relative z-10 animate-text-shimmer">View My Work</span>
                  <svg class="w-5 h-5 relative z-10 group-hover:translate-x-1 group-hover:rotate-12 transition-transform duration-300" 
                       fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                  </svg>
                  
                  <!-- Shine Effect -->
                  <div class="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                             translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
                  
                  <!-- Floating Particles -->
                  <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div class="absolute top-2 left-4 w-1 h-1 bg-white rounded-full animate-particle-float"></div>
                    <div class="absolute bottom-3 right-6 w-1 h-1 bg-white rounded-full animate-particle-float-delayed"></div>
                  </div>
                </NuxtLink>
                
                <NuxtLink 
                  to="/contact"
                  class="group relative px-8 py-4 border-2 border-blue-600 text-blue-600 dark:text-blue-400 
                         hover:bg-blue-600 hover:text-white dark:hover:text-white rounded-xl font-semibold 
                         transition-all duration-300 flex items-center justify-center space-x-2
                         hover:shadow-lg hover:scale-105 overflow-hidden animate-bounce-in-delayed"
                >
                  <!-- Animated Background -->
                  <div class="absolute inset-0 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                  
                  <!-- Border Glow -->
                  <div class="absolute inset-0 rounded-xl border-2 border-blue-400 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"></div>
                  
                  <!-- Text Bounce -->
                  <span class="relative z-10 group-hover:animate-text-bounce">Get In Touch</span>
                  <svg class="w-5 h-5 relative z-10 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300" 
                       fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                          d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                  
                  <!-- Magnetic Effect -->
                  <div class="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-200"></div>
                </NuxtLink>
              </div>
            </div>
  
            <!-- Error State -->
            <div v-else-if="ownerStore.error" class="space-y-6">
              <h1 class="text-5xl lg:text-7xl font-bold animate-slide-in-left">
                <span class="text-gray-900 dark:text-white">Hi, I'm a</span>
                <span class="block bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent animate-slide-in-right">
                  Developer
                </span>
              </h1>
              <p class="text-2xl text-gray-600 dark:text-gray-300 animate-fade-in-up">
                Full-stack developer passionate about creating amazing experiences
              </p>
              <div class="flex gap-4">
                <NuxtLink to="/projects" class="btn-primary animate-bounce-in">View My Work</NuxtLink>
                <button @click="ownerStore.fetchOwner()" class="btn-secondary animate-bounce-in-delayed">Retry</button>
              </div>
            </div>
          </div>
  
          <!-- Enhanced Hero Visual -->
          <div class="flex justify-center lg:justify-end animate-slide-up-delayed">
            <div class="relative">
              <!-- Avatar Container with Enhanced Animations -->
              <div class="relative w-80 h-80 lg:w-96 lg:h-96">
                <!-- Loading State -->
                <div v-if="ownerStore.loading" 
                     class="w-full h-full rounded-full bg-gradient-to-br from-gray-200 to-gray-300 
                            dark:from-gray-700 dark:to-gray-600 animate-pulse"></div>
                
                <!-- Avatar -->
                <!-- Avatar -->
<div v-else-if="ownerStore.owner?.avatar || !ownerStore.loading" class="relative w-full h-full group">
  <img 
  :src="ownerStore.owner?.avatar || '/images/default_avatar.png'" 
  :alt="ownerStore.owner?.name || 'Developer'"
  @error="handleImageError($event, '/images/default_avatar.png')"
  @load="handleImageLoad"
  class="w-full h-full rounded-full object-cover shadow-2xl border-4 border-white 
     dark:border-gray-800 group-hover:scale-105 transition-transform duration-500
     animate-zoom-in opacity-0 transition-opacity duration-300"
>
                  <!-- Multiple Animated Rings -->
                  <div class="absolute inset-0 rounded-full border-4 border-blue-500/30 animate-ping"></div>
                  <div class="absolute inset-0 rounded-full border-4 border-cyan-500/20 animate-ping animation-delay-1000"></div>
                  <div class="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500/20 to-cyan-500/20"></div>
                  
                  <!-- Rotating Gradient Ring -->
                  <div class="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 p-1 animate-spin-slow opacity-30">
                    <div class="w-full h-full rounded-full bg-white dark:bg-gray-900"></div>
                  </div>
                </div>
                
                <!-- Default Avatar -->
                <div v-else class="w-full h-full rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 
                               flex items-center justify-center shadow-2xl group hover:scale-105 
                               transition-transform duration-500 animate-zoom-in">
                  <svg class="w-32 h-32 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"/>
                  </svg>
                  <div class="absolute inset-0 rounded-full border-4 border-cyan-400/30 animate-ping"></div>
                </div>
              </div>
  
              <!-- Enhanced Floating Elements -->
              <div class="absolute -top-4 -right-4 w-8 h-8 bg-blue-500 rounded-full animate-bounce-float"></div>
              <div class="absolute -bottom-4 -left-4 w-6 h-6 bg-cyan-400 rounded-full animate-bounce-float-delayed"></div>
              <div class="absolute top-1/2 -left-8 w-4 h-4 bg-blue-400 rounded-full animate-pulse-float"></div>
              <div class="absolute top-1/4 -right-6 w-3 h-3 bg-cyan-300 rounded-full animate-pulse-float-delayed"></div>
              
              <!-- Orbiting Elements -->
              <div class="absolute inset-0 animate-spin-slow">
                <div class="absolute top-0 left-1/2 w-2 h-2 bg-blue-400 rounded-full transform -translate-x-1/2"></div>
              </div>
              <div class="absolute inset-0 animate-spin-reverse-slow">
                <div class="absolute bottom-0 left-1/2 w-2 h-2 bg-cyan-400 rounded-full transform -translate-x-1/2"></div>
              </div>
              
              <!-- Floating Code Symbols -->
              <div class="absolute top-10 left-10 text-blue-400 text-2xl animate-code-float opacity-60">&lt;/&gt;</div>
              <div class="absolute bottom-10 right-10 text-cyan-400 text-xl animate-code-float-delayed opacity-60">{}</div>
              <div class="absolute top-1/3 right-0 text-blue-300 text-lg animate-code-float-slow opacity-60">( )</div>
            </div>
          </div>
        </div>
  
        <!-- Enhanced Scroll Indicator -->
        <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-gentle">
          <div class="w-6 h-10 border-2 border-blue-400 rounded-full flex justify-center relative overflow-hidden">
            <div class="w-1 h-3 bg-blue-400 rounded-full mt-2 animate-scroll-indicator"></div>
            <div class="absolute inset-0 bg-gradient-to-b from-transparent via-blue-400/20 to-transparent animate-pulse"></div>
          </div>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center animate-fade-in-delayed">Scroll to explore</p>
        </div>
      </section>
  
      <!-- Stats Section -->
      <section class="py-20 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-900">
        <div class="max-w-7xl mx-auto px-6">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="text-center group hover:scale-105 transition-transform duration-300">
              <div class="text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-2 animate-counter">
                {{ projectStore.projects?.length || '0' }}
              </div>
              <div class="text-gray-600 dark:text-gray-400 font-medium">Projects Completed</div>
            </div>
            <div class="text-center group hover:scale-105 transition-transform duration-300">
              <div class="text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-2 animate-counter">
                {{ ownerStore.owner?.tech_stack?.length || '0' }}
              </div>
              <div class="text-gray-600 dark:text-gray-400 font-medium">Technologies Mastered</div>
            </div>
            <div class="text-center group hover:scale-105 transition-transform duration-300">
              <div class="text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-2 animate-counter">
                {{ ownerStore.owner?.languages?.length || '0' }}
              </div>
              <div class="text-gray-600 dark:text-gray-400 font-medium">Languages Spoken</div>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Featured Projects Section -->
      <section class="py-20 bg-white dark:bg-gray-900">
        <div class="max-w-7xl mx-auto px-6">
          <div class="text-center mb-16 animate-fade-in">
            <h2 class="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Featured <span class="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Projects</span>
            </h2>
            <p class="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Discover my latest work showcasing cutting-edge technologies and innovative solutions
            </p>
          </div>
  
          <!-- Loading State -->
          <div v-if="projectStore.loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div v-for="i in 3" :key="i" class="animate-pulse">
              <div class="bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 h-64 rounded-xl mb-4"></div>
              <div class="h-6 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded mb-2"></div>
              <div class="h-4 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded w-3/4"></div>
            </div>
          </div>
  
          <!-- Projects Grid -->
          <div v-else-if="featuredProjects.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div 
              v-for="(project, index) in featuredProjects" 
              :key="project.id"
              :style="{ animationDelay: `${index * 0.2}s` }"
              class="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl 
                     transition-all duration-500 transform hover:-translate-y-2 overflow-hidden
                     border border-gray-100 dark:border-gray-700 animate-fade-in-up"
            >
              <!-- Project Image -->
              <!-- Project Image -->
<div class="relative h-48 overflow-hidden">
  <img 
    :src="project.cover_image || '/images/default_pro_cover.png'" 
    :alt="project.title"
    @error="$event.target.src = '/images/default_pro_cover.png'"
    class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
  >
                <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent 
                           opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <!-- Overlay Buttons -->
                <div class="absolute inset-0 flex items-center justify-center space-x-4 
                           opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <NuxtLink 
                    :to="`/projects/${project.slug}`"
                    class="px-4 py-2 bg-white/90 text-gray-900 rounded-lg font-semibold 
                           hover:bg-white transition-colors duration-200"
                  >
                    View Details
                  </NuxtLink>
                  <a 
                    v-if="project.demo_url"
                    :href="project.demo_url" 
                    target="_blank"
                    class="px-4 py-2 bg-blue-600/90 text-white rounded-lg font-semibold 
                           hover:bg-blue-600 transition-colors duration-200"
                  >
                    Live Demo
                  </a>
                </div>
              </div>
              
              <!-- Project Content -->
              <div class="p-6">
                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2 
                          group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  {{ project.title }}
                </h3>
                <p class="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                  {{ project.description }}
                </p>
                
                <!-- Tech Stack -->
                <div class="flex flex-wrap gap-2">
                  <span 
                    v-for="tech in project.technologies?.slice(0, 3)" 
                    :key="tech"
                    class="px-3 py-1 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 
                           text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium
                           border border-blue-200 dark:border-blue-700"
                  >
                    {{ tech }}
                  </span>
                  <span 
                    v-if="project.technologies?.length > 3"
                    class="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 
                           rounded-full text-xs font-medium"
                  >
                    +{{ project.technologies.length - 3 }}
                  </span>
                </div>
              </div>
            </div>
          </div>
  
          <!-- View All Projects CTA -->
          <div v-if="featuredProjects.length" class="text-center mt-12">
            <NuxtLink 
              to="/projects"
              class="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 
                     hover:from-blue-700 hover:to-cyan-700 text-white rounded-xl font-semibold 
                     transition-all duration-300 transform hover:scale-105 hover:shadow-xl space-x-2"
            >
              <span>Explore All Projects</span>
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </NuxtLink>
          </div>
  
          <!-- No Projects State -->
          <div v-else-if="!projectStore.loading && !projectStore.error" class="text-center py-16">
            <div class="w-24 h-24 bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 
                       rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-12 h-12 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Projects Coming Soon</h3>
            <p class="text-gray-600 dark:text-gray-400">Amazing projects will be showcased here soon.</p>
          </div>
        </div>
      </section>
  
      <!-- CTA Section -->
      <section class="py-20 bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 relative overflow-hidden">
        <!-- Background Pattern -->
        <div class="absolute inset-0 opacity-10">
          <div class="absolute top-0 left-0 w-full h-full" 
               style="background-image: radial-gradient(circle at 25% 25%, white 2px, transparent 2px); background-size: 50px 50px;"></div>
        </div>
        
        <div class="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 class="text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Build Something Amazing?
          </h2>
          <p class="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Let's collaborate and turn your ideas into exceptional digital experiences that make a difference.
          </p>
          
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <NuxtLink 
              to="/contact"
              class="px-8 py-4 bg-white text-blue-600 hover:bg-gray-100 rounded-xl font-semibold 
                     transition-all duration-300 transform hover:scale-105 hover:shadow-xl
                     flex items-center justify-center space-x-2"
            >
              <span>Start a Project</span>
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </NuxtLink>
            
            <NuxtLink 
              to="/about"
              class="px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-blue-600 
                     rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>Learn More About Me</span>
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
            </NuxtLink>
          </div>
        </div>
      </section>
    </div>
  </template>
  
  <script setup>
  import { useOwnerStore } from '~/stores/ownerStore'
  import { useProjectStore } from '~/stores/projectStore'
  import { computed } from 'vue'
  import { ref } from 'vue'
  
  // Stores
  const ownerStore = useOwnerStore()
  const projectStore = useProjectStore()
  
  // SEO and Meta
  const useHeadData = () => {
    useHead({
      title: 'Full-Stack Developer Portfolio',
      meta: [
        { name: 'description', content: 'Full-stack developer specializing in modern web technologies. View my latest projects and get in touch for collaboration.' },
        { name: 'keywords', content: 'full-stack developer, web development, portfolio, modern technologies' },
        { property: 'og:title', content: 'Full-Stack Developer Portfolio' },
        { property: 'og:description', content: 'Full-stack developer specializing in modern web technologies.' },
        { property: 'og:type', content: 'website' },
      ]
    })
  }
  
  // Computed Properties
  const featuredProjects = computed(() => {
    return projectStore.projects?.slice(0, 3) || []
  })

  // Image fallback helper
const getImageWithFallback = (imageSrc, fallbackSrc) => {
  return imageSrc || fallbackSrc
}
  
  // State for Typewriter Effect
  const displayedHeadline = ref('')
  const typewriterIndex = ref(0)
  const isDeleting = ref(false)
  
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
    
    return icons[techName] || '⚡' // Default icon for unknown technologies
  }

  const handleImageLoad = (event) => {
  event.target.classList.add('loaded')
}

const truncatedBio = computed(() => {
  if (!ownerStore.owner?.bio) return ''
  return ownerStore.owner.bio.length > 200 
    ? ownerStore.owner.bio.substring(0, 200)
    : ownerStore.owner.bio
})

// Truncated headline for typewriter effect
const truncatedHeadline = computed(() => {
  if (!ownerStore.owner?.headline) return 'Full-stack Developer'
  return ownerStore.owner.headline.length > 40 
    ? ownerStore.owner.headline.substring(0, 40) + '...'
    : ownerStore.owner.headline
})

const handleImageError = (event, fallbackSrc) => {
  event.target.src = fallbackSrc
}
  
  // Typewriter effect
  onMounted(async () => {
    // Fetch data immediately when component mounts
    await Promise.all([
      ownerStore.fetchOwner(),
      projectStore.fetchProjects()
    ])

      console.log('Owner:', ownerStore.owner)
    console.log('Projects:', projectStore.projects)
    useHeadData()
    
    if (ownerStore.owner) {
      startTypewriter()
      useHead({
        title: `${ownerStore.owner.name} - ${ownerStore.owner.headline}`,
        meta: [
          { name: 'description', content: ownerStore.owner.bio },
          { property: 'og:title', content: `${ownerStore.owner.name} - ${ownerStore.owner.headline}` },
          { property: 'og:description', content: ownerStore.owner.bio },
          { property: 'og:image', content: ownerStore.owner.avatar },
        ]
      })
    }
  })
  
  const startTypewriter = () => {
  const headline = truncatedHeadline.value
  const typeSpeed = 100
  const deleteSpeed = 50
  const pauseTime = 2000
  
  const type = () => {
    if (!isDeleting.value) {
      if (typewriterIndex.value < headline.length) {
        displayedHeadline.value = headline.substring(0, typewriterIndex.value + 1)
        typewriterIndex.value++
        setTimeout(type, typeSpeed)
      } else {
        setTimeout(() => {
          isDeleting.value = true
          type()
        }, pauseTime)
      }
    } else {
      if (typewriterIndex.value > 0) {
        displayedHeadline.value = headline.substring(0, typewriterIndex.value - 1)
        typewriterIndex.value--
        setTimeout(type, deleteSpeed)
      } else {
        isDeleting.value = false
        setTimeout(type, typeSpeed)
      }
    }
  }
  
  type()
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
  
  @keyframes float-slow {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-15px) rotate(90deg); }
  }
  
  @keyframes slide-up {
    from { opacity: 0; transform: translateY(50px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes slide-up-delayed {
    from { opacity: 0; transform: translateY(50px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes fade-in-up {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes bounce-delayed {
    0%, 20%, 53%, 80%, 100% { transform: translate3d(0,0,0); }
    40%, 43% { transform: translate3d(0,-30px,0); }
    70% { transform: translate3d(0,-15px,0); }
    90% { transform: translate3d(0,-4px,0); }
  }
  
  @keyframes scroll {
    0% { transform: translateY(0); opacity: 0; }
    50% { opacity: 1; }
    100% { transform: translateY(20px); opacity: 0; }
  }
  
  @keyframes gradient {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
  
  /* Enhanced Animations */
  @keyframes slide-in-left {
    from { opacity: 0; transform: translateX(-50px); }
    to { opacity: 1; transform: translateX(0); }
  }
  
  @keyframes slide-in-right {
    from { opacity: 0; transform: translateX(50px); }
    to { opacity: 1; transform: translateX(0); }
  }
  
  @keyframes fade-in-up-delayed {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes float-in {
    from { opacity: 0; transform: translateY(20px) scale(0.8); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }
  
  @keyframes bounce-in {
    0% { opacity: 0; transform: scale(0.3) translateY(50px); }
    50% { opacity: 1; transform: scale(1.05) translateY(-10px); }
    70% { transform: scale(0.9) translateY(0); }
    100% { opacity: 1; transform: scale(1) translateY(0); }
  }
  
  @keyframes bounce-in-delayed {
    0% { opacity: 0; transform: scale(0.3) translateY(50px); }
    50% { opacity: 1; transform: scale(1.05) translateY(-10px); }
    70% { transform: scale(0.9) translateY(0); }
    100% { opacity: 1; transform: scale(1) translateY(0); }
  }
  
  @keyframes zoom-in {
    from { opacity: 0; transform: scale(0.5); }
    to { opacity: 1; transform: scale(1); }
  }
  
  @keyframes bounce-float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(180deg); }
  }
  
  @keyframes bounce-float-delayed {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-25px) rotate(-180deg); }
  }
  
  @keyframes pulse-float {
    0%, 100% { transform: translateY(0px) scale(1); opacity: 1; }
    50% { transform: translateY(-15px) scale(1.2); opacity: 0.7; }
  }
  
  @keyframes pulse-float-delayed {
    0%, 100% { transform: translateY(0px) scale(1); opacity: 1; }
    50% { transform: translateY(-10px) scale(1.1); opacity: 0.8; }
  }
  
  @keyframes spin-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  @keyframes spin-reverse-slow {
    from { transform: rotate(360deg); }
    to { transform: rotate(0deg); }
  }
  
  @keyframes bounce-gentle {
    0%, 20%, 50%, 80%, 100% { transform: translateY(0) translateX(-50%); }
    40% { transform: translateY(-10px) translateX(-50%); }
    60% { transform: translateY(-5px) translateX(-50%); }
  }
  
  @keyframes scroll-indicator {
    0% { transform: translateY(0); opacity: 0; }
    50% { opacity: 1; }
    100% { transform: translateY(20px); opacity: 0; }
  }
  
  @keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
  }
  
  @keyframes gradient-text {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
  
  @keyframes fade-in-delayed {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  /* New Enhanced Animations */
  @keyframes text-shimmer {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  
  @keyframes text-bounce {
    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-3px); }
    60% { transform: translateY(-1px); }
  }
  
  @keyframes particle-float {
    0%, 100% { transform: translateY(0) translateX(0) scale(1); opacity: 0; }
    50% { transform: translateY(-20px) translateX(10px) scale(1.2); opacity: 1; }
  }
  
  @keyframes particle-float-delayed {
    0%, 100% { transform: translateY(0) translateX(0) scale(1); opacity: 0; }
    50% { transform: translateY(-15px) translateX(-8px) scale(1.1); opacity: 1; }
  }
  
  @keyframes code-float {
    0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.6; }
    50% { transform: translateY(-10px) rotate(5deg); opacity: 0.8; }
  }
  
  @keyframes code-float-delayed {
    0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.6; }
    50% { transform: translateY(-15px) rotate(-5deg); opacity: 0.8; }
  }
  
  @keyframes code-float-slow {
    0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.6; }
    50% { transform: translateY(-8px) rotate(3deg); opacity: 0.7; }
  }
  
  @keyframes counter {
    from { transform: scale(0.8); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }
  
  /* Apply animations */
  .animate-slide-in-left { animation: slide-in-left 0.8s ease-out; }
  .animate-slide-in-right { animation: slide-in-right 0.8s ease-out 0.2s both; }
  .animate-fade-in-up-delayed { animation: fade-in-up-delayed 0.8s ease-out 0.4s both; }
  .animate-float-in { animation: float-in 0.6s ease-out both; }
  .animate-bounce-in { animation: bounce-in 0.8s ease-out; }
  .animate-bounce-in-delayed { animation: bounce-in-delayed 0.8s ease-out 0.2s both; }
  .animate-zoom-in { animation: zoom-in 0.8s ease-out 0.3s both; }
  .animate-bounce-float { animation: bounce-float 3s ease-in-out infinite; }
  .animate-bounce-float-delayed { animation: bounce-float-delayed 3s ease-in-out infinite 1s; }
  .animate-pulse-float { animation: pulse-float 4s ease-in-out infinite; }
  .animate-pulse-float-delayed { animation: pulse-float-delayed 4s ease-in-out infinite 2s; }
  .animate-spin-slow { animation: spin-slow 20s linear infinite; }
  .animate-spin-reverse-slow { animation: spin-reverse-slow 25s linear infinite; }
  .animate-bounce-gentle { animation: bounce-gentle 2s infinite; }
  .animate-scroll-indicator { animation: scroll-indicator 2s infinite; }
  .animate-blink { animation: blink 1s infinite; }
  .animate-gradient-text { 
    background-size: 200% 200%; 
    animation: gradient-text 3s ease infinite; 
  }
  .animate-fade-in-delayed { animation: fade-in-delayed 1s ease-out 0.5s both; }
  
  /* New Enhanced Animation Classes */
  .animate-text-shimmer {
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
    background-size: 200% 100%;
    animation: text-shimmer 2s infinite;
  }
  
  .animate-text-bounce { animation: text-bounce 0.6s ease-out; }
  .animate-particle-float { animation: particle-float 3s ease-in-out infinite; }
  .animate-particle-float-delayed { animation: particle-float-delayed 3s ease-in-out infinite 1s; }
  .animate-code-float { animation: code-float 4s ease-in-out infinite; }
  .animate-code-float-delayed { animation: code-float-delayed 4s ease-in-out infinite 2s; }
  .animate-code-float-slow { animation: code-float-slow 6s ease-in-out infinite; }
  .animate-counter { animation: counter 0.8s ease-out 0.5s both; }
  
  /* Animation delays */
  .animation-delay-1000 { animation-delay: 1s; }
  
  .animate-float { animation: float 6s ease-in-out infinite; }
  .animate-float-delayed { animation: float-delayed 8s ease-in-out infinite; }
  .animate-float-slow { animation: float-slow 10s ease-in-out infinite; }
  .animate-slide-up { animation: slide-up 0.8s ease-out; }
  .animate-slide-up-delayed { animation: slide-up-delayed 0.8s ease-out 0.2s both; }
  .animate-fade-in { animation: fade-in 1s ease-out; }
  .animate-fade-in-up { animation: fade-in-up 0.6s ease-out both; }
  .animate-bounce-delayed { animation: bounce-delayed 2s infinite; }
  .animate-scroll { animation: scroll 2s infinite; }
  .animate-gradient { 
    background-size: 200% 200%; 
    animation: gradient 3s ease infinite; 
  }
  
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  /* Typewriter styles */
  .typewriter {
    overflow: hidden;
    white-space: nowrap;
    margin: 0 auto;
    letter-spacing: .15em;
  }
  
  /* Mobile responsive typewriter */
  @media (max-width: 640px) {
    .typewriter {
      white-space: normal;
      word-break: break-word;
      line-height: 1.2;
    }
  }
  .cursor {
    display: inline-block;
    width: 3px;
    background-color: #4b5563; /* gray-600 */
  }
  
  .dark .cursor {
    background-color: #d1d5db; /* gray-300 */
  }

  img.loaded {
  opacity: 1;
}
  </style>
  