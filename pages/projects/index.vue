<template>
  <div class="min-h-screen bg-white dark:bg-gray-900">

    <!-- Hero / Header -->
    <section class="relative py-20 bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100
                    dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20 overflow-hidden">
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
            Explore my portfolio of innovative solutions and technical achievements.
          </p>
        </div>

        <!-- Toolbar: search + filter + sort + view toggle -->
        <div class="flex flex-col md:flex-row gap-4 justify-between items-center mb-4 animate-slide-up-delayed">
          <div class="relative flex-1 max-w-md">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search projects..."
              class="w-full px-4 py-3 pl-12 bg-white dark:bg-gray-800 border border-blue-200
                     dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500
                     focus:border-blue-500 transition-all duration-200 text-gray-900
                     dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            >
            <svg class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                 fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </div>

          <div class="flex items-center gap-3">
            <!-- Filter button — badge shows total active count across all axes -->
            <button
              @click="filterPanelOpen = !filterPanelOpen"
              :class="[
                'inline-flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium border transition-all duration-200',
                totalActiveFilters > 0
                  ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-white dark:bg-gray-800 border-blue-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-400'
              ]"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z"/>
              </svg>
              Filter
              <span v-if="totalActiveFilters"
                class="inline-flex items-center justify-center w-5 h-5 text-xs font-bold bg-white/25 rounded-full">
                {{ totalActiveFilters }}
              </span>
              <svg :class="['w-4 h-4 transition-transform duration-200', filterPanelOpen ? 'rotate-180' : '']"
                   fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>

            <select v-model="sortBy"
              class="px-4 py-3 bg-white dark:bg-gray-800 border border-blue-200 dark:border-gray-600
                     rounded-xl focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white text-sm">
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="title">Title A–Z</option>
            </select>

            <button @click="viewMode = viewMode === 'grid' ? 'list' : 'grid'"
              class="p-3 bg-white dark:bg-gray-800 border border-blue-200 dark:border-gray-600
                     rounded-xl hover:bg-blue-50 dark:hover:bg-gray-700 transition-all duration-200">
              <svg v-if="viewMode === 'grid'" class="w-5 h-5 text-gray-600 dark:text-gray-400"
                   fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M4 6h16M4 10h16M4 14h16M4 18h16"/>
              </svg>
              <svg v-else class="w-5 h-5 text-gray-600 dark:text-gray-400"
                   fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- ── Collapsible 4-axis filter panel ─────────────────────────────── -->
        <transition
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="opacity-0 -translate-y-2"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition duration-150 ease-in"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 -translate-y-2"
        >
          <div v-if="filterPanelOpen"
               class="bg-white dark:bg-gray-800 rounded-2xl border border-blue-200 dark:border-gray-600
                      shadow-xl p-5 mb-2">

            <!-- Active chips across all axes -->
            <div v-if="totalActiveFilters" class="flex flex-wrap items-center gap-2 mb-5 pb-4
                                                    border-b border-gray-100 dark:border-gray-700">
              <span class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mr-1">
                Active:
              </span>
              <!-- Tech chips -->
              <button v-for="slug in effectiveTechFilters" :key="`t-${slug}`"
                @click="removeTechFilter(slug)"
                class="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-600 text-white
                       rounded-full text-xs font-medium hover:bg-blue-700 transition-colors duration-200">
                <i v-if="techEntry(slug)?.devicon_class" :class="techEntry(slug).devicon_class"
                   class="text-sm leading-none"></i>
                {{ techEntry(slug)?.name ?? humanize(slug) }}
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
              <!-- Context chips -->
              <button v-for="slug in effectiveCtxFilters" :key="`c-${slug}`"
                @click="removeCtxFilter(slug)"
                class="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-600 text-white
                       rounded-full text-xs font-medium hover:bg-indigo-700 transition-colors duration-200">
                {{ humanize(slug) }}
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
              <button @click="clearAllFilters"
                class="text-xs text-gray-400 hover:text-red-500 dark:hover:text-red-400
                       transition-colors duration-200 underline underline-offset-2 ml-1">
                Clear all
              </button>
            </div>

            <div class="space-y-5">

              <!-- ── Axis 1: Technologies ─────────────────────────────────── -->
              <div v-if="groupedTechs.length">
                <p class="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-3
                           flex items-center gap-2">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
                  </svg>
                  Technologies
                </p>
                <div class="space-y-3">
                  <div v-for="group in groupedTechs" :key="group.category">
                    <p class="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
                      {{ CATEGORY_LABELS[group.category] ?? humanize(group.category) }}
                    </p>
                    <div class="flex flex-wrap gap-2">
                      <button v-for="tech in group.techs" :key="tech.slug"
                        @click="toggleTechFilter(tech.slug)"
                        :class="[
                          'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium',
                          'border transition-all duration-200 hover:scale-105',
                          effectiveTechFilters.includes(tech.slug)
                            ? 'bg-blue-600 border-blue-600 text-white shadow-sm'
                            : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                        ]"
                      >
                        <i v-if="tech.devicon_class" :class="tech.devicon_class" class="text-base leading-none"></i>
                        <img v-else-if="tech.custom_icon_url" :src="tech.custom_icon_url" :alt="tech.name" class="w-4 h-4 object-contain"/>
                        <svg v-else class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
                        </svg>
                        {{ tech.name }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Divider -->
              <div v-if="groupedTechs.length && (filterStore.meta.industries.length || filterStore.meta.types.length || filterStore.meta.tags.length)"
                   class="border-t border-gray-100 dark:border-gray-700"></div>

              <!-- ── Axis 2: Industry ────────────────────────────────────── -->
              <div v-if="filterStore.meta.industries.length">
                <p class="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-3
                           flex items-center gap-2">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                  </svg>
                  Industry
                </p>
                <div class="flex flex-wrap gap-2">
                  <button v-for="ind in filterStore.meta.industries" :key="ind"
                    @click="toggleCtxFilter(ind)"
                    :class="[
                      'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium',
                      'border transition-all duration-200 hover:scale-105',
                      effectiveCtxFilters.includes(ind)
                        ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm'
                        : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20'
                    ]"
                  >
                    {{ humanize(ind) }}
                  </button>
                </div>
              </div>

              <!-- ── Axis 3: Project Type ────────────────────────────────── -->
              <div v-if="filterStore.meta.types.length">
                <p class="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider mb-3
                           flex items-center gap-2">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"/>
                  </svg>
                  Project Type
                </p>
                <div class="flex flex-wrap gap-2">
                  <button v-for="type in filterStore.meta.types" :key="type"
                    @click="toggleCtxFilter(type.replace(/_/g, '-'))"
                    :class="[
                      'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium',
                      'border transition-all duration-200 hover:scale-105',
                      effectiveCtxFilters.includes(type.replace(/_/g, '-')) || effectiveCtxFilters.includes(type)
                        ? 'bg-purple-600 border-purple-600 text-white shadow-sm'
                        : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20'
                    ]"
                  >
                    {{ humanize(type.replace(/_/g, '-')) }}
                  </button>
                </div>
              </div>

              <!-- ── Axis 4: Feature Tags ────────────────────────────────── -->
              <div v-if="filterStore.meta.tags.length">
                <p class="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider mb-3
                           flex items-center gap-2">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
                  </svg>
                  Features
                </p>
                <div class="flex flex-wrap gap-2">
                  <button v-for="tag in filterStore.meta.tags" :key="tag"
                    @click="toggleCtxFilter(tag)"
                    :class="[
                      'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium',
                      'border transition-all duration-200 hover:scale-105',
                      effectiveCtxFilters.includes(tag)
                        ? 'bg-teal-600 border-teal-600 text-white shadow-sm'
                        : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/20'
                    ]"
                  >
                    {{ humanize(tag) }}
                  </button>
                </div>
              </div>

              <!-- Empty filter panel -->
              <p v-if="!groupedTechs.length && !filterStore.meta.industries.length &&
                        !filterStore.meta.types.length && !filterStore.meta.tags.length"
                 class="text-sm text-gray-400 dark:text-gray-500 text-center py-4">
                No filter options yet. Add some projects with technologies, industry, and tags!
              </p>

            </div>
          </div>
        </transition>
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

    <!-- Projects section -->
    <section class="py-20">
      <div class="max-w-7xl mx-auto px-6">

        <!-- Loading -->
        <div v-if="projectStore.loading || techStore.loading"
             :class="viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' : 'space-y-6'">
          <div v-for="i in 6" :key="i" class="animate-pulse">
            <div class="bg-gray-200 dark:bg-gray-700 h-64 rounded-xl mb-4"></div>
            <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
            <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
          </div>
        </div>

        <!-- Result count + session filter indicator -->
        <div v-if="!projectStore.loading" class="mb-6 flex flex-wrap items-center justify-between gap-3">
          <p class="text-sm text-gray-500 dark:text-gray-400">
            Showing
            <span class="font-semibold text-gray-900 dark:text-white">{{ sortedProjects.length }}</span>
            of {{ projectStore.projects?.length ?? 0 }} projects
            <template v-if="totalActiveFilters && !filterStore.isViewingAll">
              — filtered by
              <span class="font-medium text-blue-600 dark:text-blue-400">
                {{ activeFilterLabel }}
              </span>
            </template>
            <template v-else-if="filterStore.hasSessionFilter && filterStore.isViewingAll">
              — <span class="italic text-gray-400">filter paused (view all mode)</span>
            </template>
          </p>

          <div class="flex items-center gap-3">
            <!-- View All — temporarily shows all without clearing session filter -->
            <button v-if="!filterStore.isViewingAll && filterStore.hasSessionFilter && !totalActiveFilters"
              @click="filterStore.viewAll()"
              class="text-xs text-blue-600 dark:text-blue-400 hover:underline">
              ← Re-apply saved filter
            </button>
            <button v-if="filterStore.isViewingAll"
              @click="filterStore.isViewingAll = false"
              class="text-xs text-blue-600 dark:text-blue-400 hover:underline">
              Re-apply session filter
            </button>
            <button v-if="totalActiveFilters" @click="clearAllFilters"
              class="text-xs text-gray-400 hover:text-red-500 transition-colors duration-200 underline underline-offset-2">
              Clear filters
            </button>
          </div>
        </div>

        <!-- Grid / List -->
        <div v-if="!projectStore.loading && sortedProjects.length"
             :class="viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' : 'space-y-6'">
          <div
            v-for="(project, index) in sortedProjects" :key="project.id"
            :style="{ animationDelay: `${index * 0.08}s` }"
            class="group animate-fade-in-up"
          >
            <!-- Grid card -->
            <div v-if="viewMode === 'grid'"
                 class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl
                        transition-all duration-500 transform hover:-translate-y-2 overflow-hidden
                        border border-blue-100 dark:border-gray-700 h-full flex flex-col">

              <div class="relative h-48 overflow-hidden flex-shrink-0">
                <NuxtImg
                  :src="project.cover_image || '/images/default_pro_cover.png'"
                  :alt="project.title"
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  @error="$event.target.src = '/images/default_pro_cover.png'"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent
                            opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div class="absolute inset-0 flex items-center justify-center gap-3
                            opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <NuxtLink :to="`/projects/${project.slug}`"
                    class="px-4 py-2 bg-white/90 text-gray-900 rounded-lg font-semibold hover:bg-white text-sm">
                    View Details
                  </NuxtLink>
                  <a v-if="project.demo_url" :href="project.demo_url" target="_blank"
                    class="px-4 py-2 bg-blue-600/90 text-white rounded-lg font-semibold hover:bg-blue-600 text-sm">
                    Live Demo
                  </a>
                </div>
                <!-- Devicon stack -->
                <div class="absolute top-3 right-3 flex -space-x-1">
                  <template v-for="tech in project.technologies?.slice(0, 2)" :key="tech">
                    <div v-if="getIconClass(tech)"
                         class="w-7 h-7 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center
                                shadow-md border border-gray-100 dark:border-gray-700" :title="tech">
                      <i :class="getIconClass(tech)" class="text-base leading-none"></i>
                    </div>
                  </template>
                </div>
              </div>

              <div class="p-6 flex flex-col flex-1">
                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2
                           group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  {{ project.title }}
                </h3>
                <div class="flex flex-wrap items-center gap-2 mb-3">
                  <span class="px-2 py-0.5 text-xs font-medium rounded-full" :class="statusClass(project.status)">
                    {{ project.status?.replace('_', ' ') }}
                  </span>
                  <span v-if="project.industry"
                        class="px-2 py-0.5 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-200 text-xs font-medium rounded-full">
                    {{ humanize(project.industry) }}
                  </span>
                </div>
                <p class="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 flex-1 text-sm">{{ project.description }}</p>
                <div class="flex flex-wrap gap-2 mt-auto">
                  <span v-for="tech in project.technologies?.slice(0, 4)" :key="tech"
                    class="inline-flex items-center gap-1.5 px-3 py-1
                           bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30
                           text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium
                           border border-blue-200 dark:border-blue-700">
                    <i v-if="getIconClass(tech)" :class="getIconClass(tech)" class="text-sm leading-none"></i>
                    {{ tech }}
                  </span>
                  <span v-if="(project.technologies?.length ?? 0) > 4"
                        class="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full text-xs">
                    +{{ project.technologies.length - 4 }}
                  </span>
                </div>
              </div>
            </div>

            <!-- List card -->
            <div v-else
                 class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl
                        transition-all duration-300 overflow-hidden border border-blue-100 dark:border-gray-700 group">
              <div class="flex flex-col md:flex-row">
                <div class="md:w-48 h-48 md:h-32 relative overflow-hidden flex-shrink-0">
                  <NuxtImg :src="project.cover_image || '/images/default_pro_cover.png'" :alt="project.title"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    @error="$event.target.src = '/images/default_pro_cover.png'" />
                </div>
                <div class="flex-1 p-6">
                  <div class="flex justify-between items-start gap-3 mb-2">
                    <h3 class="text-xl font-bold text-gray-900 dark:text-white flex-1
                               group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                      {{ project.title }}
                    </h3>
                    <div class="flex gap-2 flex-shrink-0">
                      <NuxtLink :to="`/projects/${project.slug}`"
                        class="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">Details</NuxtLink>
                      <a v-if="project.demo_url" :href="project.demo_url" target="_blank"
                        class="px-3 py-1 border border-blue-600 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-600 hover:text-white">Demo</a>
                    </div>
                  </div>
                  <p class="text-gray-600 dark:text-gray-400 mb-3 line-clamp-2 text-sm">{{ project.description }}</p>
                  <div class="flex flex-wrap gap-2">
                    <span v-for="tech in project.technologies?.slice(0, 5)" :key="tech"
                      class="inline-flex items-center gap-1.5 px-2 py-1 text-xs font-medium rounded
                             bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30
                             text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700">
                      <i v-if="getIconClass(tech)" :class="getIconClass(tech)" class="text-sm leading-none"></i>
                      {{ tech }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        <!-- No results -->
        <div v-else-if="!projectStore.loading && !projectStore.error" class="text-center py-20">
          <div class="w-24 h-24 bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30
                     rounded-full flex items-center justify-center mx-auto mb-6">
            <svg class="w-12 h-12 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">No Projects Found</h3>
          <p class="text-gray-600 dark:text-gray-400 mb-6">Try adjusting your search or filters.</p>
          <button v-if="totalActiveFilters" @click="clearAllFilters"
            class="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-200">
            Clear Filters
          </button>
        </div>

      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProjectStore }    from '~/stores/projectStore'
import { useTechnologyStore } from '~/stores/technologyStore'
import { useFilterStore }     from '~/stores/filterStore'
import { useTechnology }      from '~/composables/useTechnology'

const route  = useRoute()
const router = useRouter()

const projectStore = useProjectStore()
const techStore    = useTechnologyStore()
const filterStore  = useFilterStore()
const { getIconClass, getCustomIconUrl } = useTechnology()

const searchQuery     = ref('')
const sortBy          = ref('newest')
const viewMode        = ref('grid')
const filterPanelOpen = ref(false)

// ── Tech filter state — synced to URL query param ?tech= ──────────────────────
const activeTechFilters = computed({
    get() {
        const raw = route.query.tech
        if (!raw) return []
        return String(raw).split(',').map(s => s.trim()).filter(Boolean)
    },
    set(slugs) {
        const q = { ...route.query }
        if (slugs.length) q.tech = slugs.join(',')
        else delete q.tech
        router.replace({ query: q })
        // Persist to session filter
        filterStore.setSessionFilter(slugs, activeCtxFilters.value)
    },
})

// ── Context filter state — synced to URL query param ?ctx= ────────────────────
const activeCtxFilters = computed({
    get() {
        const raw = route.query.ctx
        if (!raw) return []
        return String(raw).split(',').map(s => s.trim()).filter(Boolean)
    },
    set(slugs) {
        const q = { ...route.query }
        if (slugs.length) q.ctx = slugs.join(',')
        else delete q.ctx
        router.replace({ query: q })
        // Persist to session filter
        filterStore.setSessionFilter(activeTechFilters.value, slugs)
    },
})

const totalActiveFilters = computed(() => effectiveTechFilters.value.length + effectiveCtxFilters.value.length)

// ── Effective filters — URL params take precedence, fall back to sessionFilter ─
// This enables the clean-URL approach: session filter is silently applied from the
// store without writing ?tech=...&ctx=... back to the address bar.
const effectiveTechFilters = computed(() => {
    if (filterStore.isViewingAll) return []
    return activeTechFilters.value.length
        ? activeTechFilters.value
        : filterStore.sessionFilter.tech
})
const effectiveCtxFilters = computed(() => {
    if (filterStore.isViewingAll) return []
    return activeCtxFilters.value.length
        ? activeCtxFilters.value
        : filterStore.sessionFilter.context
})

// ── Filter toggle helpers ─────────────────────────────────────────────────────
const toggleTechFilter = (slug) => {
    const current = [...effectiveTechFilters.value]
    const idx = current.indexOf(slug)
    if (idx === -1) current.push(slug)
    else current.splice(idx, 1)
    activeTechFilters.value = current
}

const toggleCtxFilter = (slug) => {
    const current = [...effectiveCtxFilters.value]
    const idx = current.indexOf(slug)
    if (idx === -1) current.push(slug)
    else current.splice(idx, 1)
    activeCtxFilters.value = current
}

const removeTechFilter = (slug) => {
    activeTechFilters.value = effectiveTechFilters.value.filter(s => s !== slug)
}
const removeCtxFilter = (slug) => {
    activeCtxFilters.value = effectiveCtxFilters.value.filter(s => s !== slug)
}
const clearAllFilters = () => {
    activeTechFilters.value = []
    activeCtxFilters.value  = []
    filterStore.clearSessionFilter()
    filterPanelOpen.value   = false
}

// ── Display helpers ───────────────────────────────────────────────────────────
const techEntry = (slug) => techStore.catalog.find(t => t.slug === slug) ?? null

const CATEGORY_LABELS = {
    php: 'PHP Ecosystem', python: 'Python Ecosystem', javascript: 'JavaScript',
    css: 'CSS / Styling', html: 'HTML', database: 'Databases',
    devops: 'DevOps & Cloud', mobile: 'Mobile', systems: 'Systems',
    data: 'Data / AI', other: 'Other',
}

const humanize = (slug) =>
    slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')

// Available tech pills — only techs that appear in at least one project
const availableTechs = computed(() => {
    if (!projectStore.projects?.length) return []
    const names = new Set()
    for (const p of projectStore.projects) {
        for (const t of p.technologies ?? []) names.add(t)
    }
    const seen = new Set()
    const pills = []
    for (const name of names) {
        const entry = techStore.resolve(name)
        if (!seen.has(entry.slug)) { seen.add(entry.slug); pills.push(entry) }
    }
    return pills.sort((a, b) => a.name.localeCompare(b.name))
})

const groupedTechs = computed(() => {
    const groups = {}
    for (const tech of availableTechs.value) {
        const cat = tech.category ?? 'other'
        if (!groups[cat]) groups[cat] = []
        groups[cat].push(tech)
    }
    const order = ['php','python','javascript','css','html','database','devops','mobile','systems','data','other']
    return Object.entries(groups)
        .sort(([a], [b]) => {
            const ai = order.indexOf(a); const bi = order.indexOf(b)
            return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi)
        })
        .map(([category, techs]) => ({ category, techs }))
})

const activeFilterLabel = computed(() => {
    const parts = []
    if (effectiveTechFilters.value.length) {
        parts.push(effectiveTechFilters.value
            .map(s => techEntry(s)?.name ?? humanize(s))
            .join(', '))
    }
    if (effectiveCtxFilters.value.length) {
        parts.push(effectiveCtxFilters.value.map(humanize).join(', '))
    }
    return parts.join(' / ')
})

// ── Filtered + sorted projects ────────────────────────────────────────────────
// Uses filterStore.getFilteredProjects for memoized filtering.
// When isViewingAll is true, shows all projects regardless of filters.

const filteredProjects = computed(() => {
    if (!projectStore.projects) return []

    // isViewingAll: show everything (but session filter is preserved for next visit)
    if (filterStore.isViewingAll) {
        return projectStore.projects
    }

    // Apply effective filters (URL params if set, otherwise session filter — clean URL approach)
    const techF = effectiveTechFilters.value
    const ctxF  = effectiveCtxFilters.value

    return filterStore.getFilteredProjects(
        projectStore.projects.filter(p => {
            const q = searchQuery.value.toLowerCase()
            return !q ||
                p.title.toLowerCase().includes(q) ||
                p.description?.toLowerCase().includes(q) ||
                p.technologies?.some(t => t.toLowerCase().includes(q))
        }),
        techF,
        ctxF,
        techStore
    )
})

const sortedProjects = computed(() => {
    const list = [...filteredProjects.value]
    switch (sortBy.value) {
        case 'newest': list.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)); break
        case 'oldest': list.sort((a, b) => new Date(a.created_at) - new Date(b.created_at)); break
        case 'title':  list.sort((a, b) => a.title.localeCompare(b.title)); break
    }
    return list
})

const statusClass = (s) => ({
    'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200':     s === 'completed',
    'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200':         s === 'in_progress',
    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200': s === 'planning',
    'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200':             s === 'on_hold',
    'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200':             s === 'cancelled',
})

// ── Session filter restore ────────────────────────────────────────────────────
// When user navigates back to /projects, re-apply the session filter
// (unless they're already in isViewingAll mode).
// Also clear result cache when project store refreshes.
watch(() => projectStore.lastFetched, () => filterStore.clearResultCache())

useHead({ title: 'Projects - Portfolio' })

onMounted(async () => {
    const config = useRuntimeConfig()

    await Promise.all([
        projectStore.fetchProjects(),
        techStore.fetchCatalog(),
        filterStore.fetchMeta(config.public.apiBaseUrl),
    ])

    // If the user explicitly clicked "View All" before navigating here,
    // respect that intent — skip the session restore entirely.
    // effectiveTechFilters/effectiveCtxFilters will return [] while isViewingAll=true,
    // so displayedProjects shows everything.
    if (filterStore.isViewingAll) return

    // Normal navigation: reset the viewing-all override (no-op if already false).
    filterStore.resetViewAll()

    // Session filter is now active via effectiveTechFilters/effectiveCtxFilters.
    // The URL stays clean — no router.replace() here.
    // If the user opens the filter panel, toggleTechFilter/toggleCtxFilter will
    // promote the session filter into the URL at that point.
})
</script>

<style scoped>
@keyframes float         { 0%,100%{transform:translateY(0)}50%{transform:translateY(-20px)} }
@keyframes float-delayed { 0%,100%{transform:translateY(0)}50%{transform:translateY(-30px)} }
@keyframes slide-up      { from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)} }
@keyframes slide-up-delayed { from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)} }
@keyframes fade-in-up    { from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)} }
.animate-float            { animation: float 6s ease-in-out infinite }
.animate-float-delayed    { animation: float-delayed 8s ease-in-out infinite }
.animate-slide-up         { animation: slide-up 0.8s ease-out }
.animate-slide-up-delayed { animation: slide-up-delayed 0.8s ease-out 0.2s both }
.animate-fade-in-up       { animation: fade-in-up 0.6s ease-out both }
.line-clamp-2 { display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden }
</style>
