<template>
  <div class="min-h-screen bg-white dark:bg-gray-900">

    <!-- Loading -->
    <div v-if="loading" class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <div class="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p class="text-gray-500 dark:text-gray-400">Loading projects…</p>
      </div>
    </div>

    <!-- 404 — slug not found in any catalog -->
    <div v-else-if="!resolved.valid" class="flex items-center justify-center min-h-screen px-6">
      <div class="text-center max-w-md">
        <div class="w-24 h-24 bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30
                   rounded-full flex items-center justify-center mx-auto mb-6">
          <svg class="w-12 h-12 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-3">Page not found</h1>
        <p class="text-gray-600 dark:text-gray-400 mb-2">
          <strong class="font-mono text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
            {{ resolved.unknownSlugs.join(', ') }}
          </strong>
          {{ resolved.unknownSlugs.length > 1 ? 'don\'t match' : 'doesn\'t match' }}
          any known technology, industry, or feature tag.
        </p>
        <p class="text-gray-500 dark:text-gray-500 text-sm mb-6">
          Try browsing all projects and using the filter panel instead.
        </p>
        <button @click="goToAllProjects"
          class="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white
                 rounded-xl font-semibold transition-colors duration-200">
          Browse All Projects
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Valid filter — show results or empty state -->
    <template v-else>

      <!-- Header -->
      <section class="relative py-20 bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100
                      dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20 overflow-hidden">
        <div class="absolute inset-0 pointer-events-none">
          <div class="absolute top-20 left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
          <div class="absolute bottom-20 right-10 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl animate-float-delayed"></div>
        </div>

        <div class="relative max-w-6xl mx-auto px-6 text-center">
          <!-- Filter badge chips -->
          <div class="flex flex-wrap items-center justify-center gap-3 mb-6">
            <!-- Tech axis chips -->
            <template v-for="slug in resolved.techFilters" :key="`t-${slug}`">
              <div class="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800
                          rounded-full border border-blue-200 dark:border-gray-600 shadow-sm">
                <i v-if="techChip(slug)?.devicon_class"
                   :class="techChip(slug).devicon_class"
                   class="text-xl leading-none"></i>
                <span class="font-semibold text-gray-900 dark:text-white">
                  {{ techChip(slug)?.name ?? humanize(slug) }}
                </span>
              </div>
            </template>

            <!-- Divider between axes (only when both present) -->
            <span v-if="resolved.techFilters.length && resolved.ctxFilters.length"
                  class="text-gray-400 dark:text-gray-500 font-light text-xl select-none">
              /
            </span>

            <!-- Context axis chips -->
            <template v-for="slug in resolved.ctxFilters" :key="`c-${slug}`">
              <div class="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800
                          rounded-full border border-blue-200 dark:border-gray-600 shadow-sm">
                <LucideIcon :name="ctxChipIcon(slug)" class="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span class="font-semibold text-gray-900 dark:text-white">
                  {{ humanize(slug) }}
                </span>
              </div>
            </template>
          </div>

          <h1 class="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Projects
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300">
            <template v-if="filteredProjects.length">
              Showing
              <span class="font-semibold text-blue-600 dark:text-blue-400">
                {{ filteredProjects.length }}
              </span>
              project{{ filteredProjects.length !== 1 ? 's' : '' }}
              matching
              <span class="font-semibold">{{ resolved.label }}</span>
            </template>
            <template v-else>
              No projects matching <span class="font-semibold">{{ resolved.label }}</span> yet
            </template>
          </p>

          <!-- Navigation links -->
          <div class="mt-6 flex flex-wrap justify-center gap-3">
            <button @click="goToAllProjects"
              class="inline-flex items-center gap-2 px-5 py-2.5 border border-blue-200 dark:border-gray-600
                     text-blue-600 dark:text-blue-400 rounded-xl font-medium hover:bg-blue-50
                     dark:hover:bg-blue-900/20 transition-colors duration-200 text-sm">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
              </svg>
              All Projects
            </button>
          </div>
        </div>
      </section>

      <!-- Projects grid or empty state -->
      <section class="py-20">
        <div class="max-w-7xl mx-auto px-6">

          <!-- Empty state — valid filter, just no projects using it yet -->
          <div v-if="!filteredProjects.length" class="text-center py-20">
            <div class="w-24 h-24 bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30
                       rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-12 h-12 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-3">No Projects Yet</h3>
            <p class="text-gray-600 dark:text-gray-400 mb-6 max-w-sm mx-auto">
              No projects use <strong>{{ resolved.label }}</strong> right now.
              Check back later or browse everything.
            </p>
            <button @click="goToAllProjects"
              class="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white
                     rounded-xl font-semibold transition-colors duration-200">
              Browse All Projects
            </button>
          </div>

          <!-- Grid of matches -->
          <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div
              v-for="(project, index) in filteredProjects" :key="project.id"
              :style="{ animationDelay: `${index * 0.08}s` }"
              class="group animate-fade-in-up"
            >
              <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl
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
                      class="px-4 py-2 bg-white/90 text-gray-900 rounded-lg font-semibold text-sm hover:bg-white">
                      View Details
                    </NuxtLink>
                    <a v-if="project.demo_url" :href="project.demo_url" target="_blank"
                      class="px-4 py-2 bg-blue-600/90 text-white rounded-lg font-semibold text-sm hover:bg-blue-600">
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
                  <!-- Industry badge if present -->
                  <div class="flex flex-wrap items-center gap-2 mb-3">
                    <span v-if="project.industry"
                          class="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200
                                 text-xs font-medium rounded-full">
                      {{ humanize(project.industry) }}
                    </span>
                    <span class="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400
                                 text-xs font-medium rounded-full">
                      {{ project.type?.replace('_', ' ') }}
                    </span>
                  </div>
                  <p class="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 text-sm flex-1">
                    {{ project.description }}
                  </p>
                  <div class="flex flex-wrap gap-2 mt-auto">
                    <span v-for="tech in project.technologies?.slice(0, 4)" :key="tech"
                      class="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full
                             bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30
                             text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700">
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
            </div>
          </div>
        </div>
      </section>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter }      from 'vue-router'
import { useProjectStore }        from '~/stores/projectStore'
import { useTechnologyStore }     from '~/stores/technologyStore'
import { useFilterStore }         from '~/stores/filterStore'
import { useTechnology }          from '~/composables/useTechnology'
import { useProjectFilter }       from '~/composables/useProjectFilter'

const route        = useRoute()
const router       = useRouter()
const projectStore = useProjectStore()
const techStore    = useTechnologyStore()
const filterStore  = useFilterStore()
const { getIconClass } = useTechnology()
const { resolveFilterParams } = useProjectFilter()

// Navigate to /projects showing ALL projects, not the session-filtered subset.
// viewAll() sets isViewingAll=true so projects/index.vue onMounted skips restore.
const goToAllProjects = () => {
    filterStore.viewAll()
    router.push('/projects')
}

const loading = ref(true)

// Nuxt [...filter] gives params.filter as an array of path segments
// e.g. /laravel,vue/real-estate → ['laravel,vue', 'real-estate']
const rawParams = computed(() => {
    const p = route.params.filter
    return Array.isArray(p) ? p : [p].filter(Boolean)
})

// Resolved filter state — computed after catalogs are loaded
const resolved = computed(() => resolveFilterParams(rawParams.value))

// Filtered projects using the filterStore's memoized getFilteredProjects
const filteredProjects = computed(() => {
    if (!projectStore.projects?.length || !resolved.value.valid) return []
    return filterStore.getFilteredProjects(
        projectStore.projects,
        resolved.value.techFilters,
        resolved.value.ctxFilters,
        techStore
    )
})

// ── Chip helpers ──────────────────────────────────────────────────────────────

const techChip = (slug) =>
    techStore.catalog.find(t => t.slug === slug) ??
    techStore.catalog.find(t => (t.aliases ?? []).some(a =>
        a.toLowerCase().replace(/[\s.\-_]/g, '') === slug.replace(/[\s.\-_]/g, '')
    )) ?? null

// Pick a sensible Lucide icon for context chips based on slug keywords
const ctxChipIcon = (slug) => {
    const s = slug.toLowerCase()
    if (s.includes('health'))  return 'heart-pulse'
    if (s.includes('estate') || s.includes('property')) return 'home'
    if (s.includes('commerce') || s.includes('shop') || s.includes('retail')) return 'shopping-cart'
    if (s.includes('fin') || s.includes('pay') || s.includes('bank')) return 'credit-card'
    if (s.includes('edu') || s.includes('learn') || s.includes('school')) return 'graduation-cap'
    if (s.includes('ai') || s.includes('ml') || s.includes('data')) return 'brain-circuit'
    if (s.includes('game')) return 'gamepad-2'
    if (s.includes('social')) return 'users'
    if (s.includes('saas')) return 'cloud'
    if (s.includes('chat') || s.includes('message')) return 'message-circle'
    if (s.includes('web')) return 'globe'
    if (s.includes('mobile')) return 'smartphone'
    if (s.includes('api')) return 'plug'
    if (s.includes('auth')) return 'shield-check'
    if (s.includes('payment')) return 'credit-card'
    if (s.includes('notification')) return 'bell'
    if (s.includes('map')) return 'map-pin'
    if (s.includes('socket') || s.includes('real-time')) return 'zap'
    return 'tag'
}

const humanize = (slug) =>
    slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')

// ── SEO ───────────────────────────────────────────────────────────────────────
useHead(computed(() => ({
    title: resolved.value.valid
        ? `${resolved.value.label} Projects – Portfolio`
        : 'Page Not Found – Portfolio',
    meta: [
        {
            name: 'description',
            content: resolved.value.valid
                ? `Browse ${resolved.value.label} projects in my portfolio.`
                : 'Page not found.',
        },
        // Filter pages don't need indexing (too many combinations)
        { name: 'robots', content: 'noindex, follow' },
    ],
})))

onMounted(async () => {
    const config = useRuntimeConfig()
    await Promise.all([
        projectStore.fetchProjects(),
        techStore.fetchCatalog(),
        filterStore.fetchMeta(config.public.apiBaseUrl),
    ])

    // Save this filter to session so /projects will re-apply it
    if (resolved.value.valid && resolved.value.label) {
        filterStore.setSessionFilter(
            resolved.value.techFilters,
            resolved.value.ctxFilters
        )
    }

    loading.value = false
})
</script>

<style scoped>
@keyframes float         { 0%,100%{transform:translateY(0)}50%{transform:translateY(-20px)} }
@keyframes float-delayed { 0%,100%{transform:translateY(0)}50%{transform:translateY(-30px)} }
@keyframes fade-in-up    { from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)} }
.animate-float         { animation: float 6s ease-in-out infinite }
.animate-float-delayed { animation: float-delayed 8s ease-in-out infinite }
.animate-fade-in-up    { animation: fade-in-up 0.6s ease-out both }
.line-clamp-2 { display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden }
</style>
