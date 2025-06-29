<template>
    <div class="min-h-screen bg-white dark:bg-gray-900">
      <!-- Hero Section -->
      <section class="relative py-20 bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20 overflow-hidden">
        <!-- Background Elements -->
        <div class="absolute inset-0 pointer-events-none">
          <div class="absolute top-20 left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
          <div class="absolute bottom-20 right-10 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl animate-float-delayed"></div>
        </div>
  
        <div class="relative max-w-6xl mx-auto px-6">
          <div class="text-center mb-12 animate-slide-up">
            <h1 class="text-5xl lg:text-6xl font-bold mb-6">
              <span class="text-gray-900 dark:text-white">My</span>
              <span class="block bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
                Projects
              </span>
            </h1>
            <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Explore my portfolio of innovative solutions, creative designs, and technical achievements that showcase my passion for development.
            </p>
          </div>
  
          <!-- Filters & Search -->
          <div class="flex flex-col md:flex-row gap-4 justify-between items-center animate-slide-up-delayed">
            <!-- Search Bar -->
            <div class="relative flex-1 max-w-md">
              <input 
                v-model="searchQuery"
                type="text" 
                placeholder="Search projects..."
                class="w-full px-4 py-3 pl-12 bg-white dark:bg-gray-800 border border-blue-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              >
              <svg class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </div>
  
            <!-- Sort Options -->
            <div class="flex items-center space-x-4">
              <select 
                v-model="sortBy"
                class="px-4 py-3 bg-white dark:bg-gray-800 border border-blue-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 dark:text-white"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="title">Title A-Z</option>
              </select>
  
              <button 
                @click="viewMode = viewMode === 'grid' ? 'list' : 'grid'"
                class="p-3 bg-white dark:bg-gray-800 border border-blue-200 dark:border-gray-600 rounded-xl hover:bg-blue-50 dark:hover:bg-gray-700 transition-all duration-200"
              >
                <svg v-if="viewMode === 'grid'" class="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"/>
                </svg>
                <svg v-else class="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Projects Section -->
      <section class="py-20">
        <div class="max-w-7xl mx-auto px-6">
          
          <!-- Loading State -->
          <div v-if="projectStore.loading" :class="viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' : 'space-y-6'">
            <div v-for="i in 6" :key="i" class="animate-pulse">
              <div v-if="viewMode === 'grid'" class="bg-gray-200 dark:bg-gray-700 h-64 rounded-xl mb-4"></div>
              <div v-else class="flex space-x-4">
                <div class="bg-gray-200 dark:bg-gray-700 w-48 h-32 rounded-xl"></div>
                <div class="flex-1 space-y-2">
                  <div class="bg-gray-200 dark:bg-gray-700 h-6 rounded"></div>
                  <div class="bg-gray-200 dark:bg-gray-700 h-4 rounded w-3/4"></div>
                </div>
              </div>
            </div>
          </div>
  
          <!-- Projects Grid -->
          <div v-else-if="filteredProjects.length" :class="viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' : 'space-y-6'">
            <div 
              v-for="(project, index) in filteredProjects" 
              :key="project.id"
              :style="{ animationDelay: `${index * 0.1}s` }"
              class="group animate-fade-in-up"
            >
              <!-- Grid View -->
              <div v-if="viewMode === 'grid'" 
                   class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-blue-100 dark:border-gray-700">
                
                <!-- Project Image -->
                <div class="relative h-48 overflow-hidden">
                  <img 
                    :src="project.cover_image" 
                    :alt="project.title"
                    class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  >
                  <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <!-- Overlay Buttons -->
                  <div class="absolute inset-0 flex items-center justify-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <NuxtLink 
                      :to="`/projects/${project.slug}`"
                      class="px-4 py-2 bg-white/90 text-gray-900 rounded-lg font-semibold hover:bg-white transition-colors duration-200"
                    >
                      View Details
                    </NuxtLink>
                    <a 
                      v-if="project.demo_url"
                      :href="project.demo_url" 
                      target="_blank"
                      class="px-4 py-2 bg-blue-600/90 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-200"
                    >
                      Live Demo
                    </a>
                  </div>
                </div>
                
                <!-- Project Content -->
                <div class="p-6">
                  <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {{ project.title }}
                  </h3>
                  <!-- Status and Type Badges -->
                  <div class="flex items-center space-x-2 mb-2">
                    <span class="px-2 py-1 text-xs font-medium rounded-full"
                          :class="{
                            'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200': project.status === 'completed',
                            'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200': project.status === 'in_progress',
                            'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200': project.status === 'planning',
                            'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-200': project.status === 'on_hold',
                            'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200': project.status === 'cancelled'
                          }">
                      {{ project.status?.replace('_', ' ') }}
                    </span>
                    <span class="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 text-xs font-medium rounded-full">
                      {{ project.type?.replace('_', ' ') }}
                    </span>
                  </div>
                  <p class="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                    {{ project.description }}
                  </p>
                  
                  <!-- Tech Stack -->
                  <div class="flex flex-wrap gap-2">
                    <span 
                      v-for="tech in project.technologies?.slice(0, 3)" 
                      :key="tech"
                      class="px-3 py-1 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium border border-blue-200 dark:border-blue-700"
                    >
                      {{ tech }}
                    </span>
                    <span 
                      v-if="project.technologies?.length > 3"
                      class="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full text-xs font-medium"
                    >
                      +{{ project.technologies.length - 3 }}
                    </span>
                  </div>
                </div>
              </div>
  
              <!-- List View -->
              <div v-else 
                   class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-blue-100 dark:border-gray-700 group">
                <div class="flex flex-col md:flex-row">
                  <!-- Project Image -->
                  <div class="md:w-48 h-48 md:h-32 relative overflow-hidden">
                    <img 
                      :src="project.cover_image" 
                      :alt="project.title"
                      class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    >
                  </div>
                  
                  <!-- Project Content -->
                  <div class="flex-1 p-6">
                    <div class="flex justify-between items-start mb-2">
                      <h3 class="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                        {{ project.title }}
                      </h3>
                      <!-- Status and Type Badges -->
                      <div class="flex items-center space-x-2 mb-2">
                        <span class="px-2 py-1 text-xs font-medium rounded-full"
                              :class="{
                                'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200': project.status === 'completed',
                                'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200': project.status === 'in_progress',
                                'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200': project.status === 'planning',
                                'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-200': project.status === 'on_hold',
                                'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200': project.status === 'cancelled'
                              }">
                          {{ project.status?.replace('_', ' ') }}
                        </span>
                        <span class="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 text-xs font-medium rounded-full">
                          {{ project.type?.replace('_', ' ') }}
                        </span>
                      </div>
                      <div class="flex space-x-2">
                        <NuxtLink 
                          :to="`/projects/${project.slug}`"
                          class="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200"
                        >
                          Details
                        </NuxtLink>
                        <a 
                          v-if="project.demo_url"
                          :href="project.demo_url" 
                          target="_blank"
                          class="px-3 py-1 border border-blue-600 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-600 hover:text-white transition-colors duration-200"
                        >
                          Demo
                        </a>
                      </div>
                    </div>
                    <p class="text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                      {{ project.description }}
                    </p>
                    
                    <!-- Tech Stack -->
                    <div class="flex flex-wrap gap-2">
                      <span 
                        v-for="tech in project.technologies?.slice(0, 5)" 
                        :key="tech"
                        class="px-2 py-1 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 text-blue-700 dark:text-blue-300 rounded text-xs font-medium"
                      >
                        {{ tech }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          <!-- No Projects State -->
          <div v-else-if="!projectStore.loading && !projectStore.error" class="text-center py-16">
            <div class="w-24 h-24 bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-12 h-12 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">No Projects Found</h3>
            <p class="text-gray-600 dark:text-gray-400">Try adjusting your search or filters.</p>
          </div>
  
          <!-- Error State -->
          <div v-else-if="projectStore.error" class="text-center py-16">
            <div class="w-24 h-24 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-12 h-12 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Failed to Load Projects</h3>
            <p class="text-gray-600 dark:text-gray-400 mb-4">{{ projectStore.error }}</p>
            <button 
              @click="projectStore.fetchProjects()" 
              class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors duration-200"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  import { useProjectStore } from '~/stores/projectStore'
  
  
  const projectStore = useProjectStore()
  const searchQuery = ref('')
  const sortBy = ref('newest')
  const viewMode = ref('grid')
  
  const filteredProjects = computed(() => {
    if (!projectStore.projects) return []
    
    let filtered = projectStore.projects.filter(project => 
      project.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      project.technologies?.some(tech => tech.toLowerCase().includes(searchQuery.value.toLowerCase()))
    )
    
    // Sort projects
    switch (sortBy.value) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        break
      case 'oldest':
        filtered.sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
        break
      case 'title':
        filtered.sort((a, b) => a.title.localeCompare(b.title))
        break
    }
    
    return filtered
  })
  
  // SEO
  useHead({
    title: 'Projects - Portfolio',
    meta: [
      { name: 'description', content: 'Explore my portfolio of innovative web applications, creative designs, and technical solutions showcasing modern development practices.' }
    ]
  })
  
  onMounted(async () => {
    await projectStore.fetchProjects()
  })
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
  
  .animate-float { animation: float 6s ease-in-out infinite; }
  .animate-float-delayed { animation: float-delayed 8s ease-in-out infinite; }
  .animate-slide-up { animation: slide-up 0.8s ease-out; }
  .animate-slide-up-delayed { animation: slide-up-delayed 0.8s ease-out 0.2s both; }
  .animate-fade-in-up { animation: fade-in-up 0.6s ease-out both; }
  
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  </style>
  