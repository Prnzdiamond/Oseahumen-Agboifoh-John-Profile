// stores/technologyStore.js
import { defineStore } from 'pinia'
import { $fetch } from 'ofetch'

export const useTechnologyStore = defineStore('technology', {
    state: () => ({
        catalog: [],      // Full array of technology objects from /api/technologies
        loading: false,
        error: null,
        lastFetched: null,
    }),

    getters: {
        // Fresh for 1 hour
        isFresh: (state) => {
            if (!state.lastFetched || !state.catalog.length) return false
            return Date.now() - state.lastFetched < 60 * 60 * 1000
        },

        /**
         * Fast O(1) lookup map built from the catalog.
         * Keys: normalized slug, normalized name, all normalized aliases.
         * Value: the technology object.
         *
         * "vue.js" → Vue.js entry
         * "vuejs"  → Vue.js entry
         * "vue"    → Vue.js entry  (alias)
         */
        lookupMap: (state) => {
            const map = new Map()
            for (const tech of state.catalog) {
                map.set(normalize(tech.slug), tech)
                map.set(normalize(tech.name), tech)
                for (const alias of tech.aliases ?? []) {
                    map.set(normalize(alias), tech)
                }
            }
            return map
        },

        // All distinct category values in the catalog
        categories: (state) => {
            const seen = new Set()
            return state.catalog
                .map(t => t.category)
                .filter(c => { if (seen.has(c)) return false; seen.add(c); return true })
                .sort()
        },
    },

    actions: {
        async fetchCatalog(forceRefresh = false) {
            if (this.isFresh && !forceRefresh) return

            this.loading = true
            this.error   = null

            try {
                const config   = useRuntimeConfig()
                const response = await $fetch(`${config.public.apiBaseUrl}/technologies`)
                if (response.success) {
                    this.catalog     = response.data ?? []
                    this.lastFetched = Date.now()
                }
            } catch (err) {
                this.error = err.message ?? 'Failed to load technology catalog'
                // Non-fatal — icons degrade gracefully, filtering still works
                // on whatever partial data we have
                console.warn('[technologyStore] catalog fetch failed:', err)
            } finally {
                this.loading = false
            }
        },

        /**
         * Resolve any tech name string → catalog entry.
         * Returns a minimal stub if not found so callers never need null-checks.
         */
        resolve(name) {
            if (!name) return stub(name)
            const entry = this.lookupMap.get(normalize(name))
            return entry ?? stub(name)
        },

        /**
         * Expand a filter slug to ALL tech slugs that should match.
         *
         * "python"   → every slug whose category === "python"
         *              (python, fastapi, django, flask, numpy …)
         * "laravel"  → just ["laravel"]  (no other tech has category "laravel")
         * "database" → every slug whose category === "database"
         *
         * This is the core of the smart filtering — no hardcoded alias maps.
         * The database category field drives it entirely.
         */
        expandFilterSlug(slug) {
            const normalized = normalize(slug)

            // Check if this slug IS a category name
            const isCategory = this.catalog.some(t => normalize(t.category) === normalized)
            if (isCategory) {
                return this.catalog
                    .filter(t => normalize(t.category) === normalized)
                    .map(t => t.slug)
            }

            // Check if it matches a tech slug directly
            const exact = this.catalog.find(t => t.slug === normalized)
            return exact ? [exact.slug] : [normalized]
        },
    },
})

// ── Private helpers ────────────────────────────────────────────────────────────

function normalize(str) {
    if (!str) return ''
    return String(str).toLowerCase().replace(/[\s.\-_]/g, '')
}

function stub(name) {
    return {
        name:             name ?? '',
        slug:             normalize(name ?? ''),
        devicon_class:    null,
        color:            null,
        category:         'other',
        custom_icon_url:  null,
        aliases:          [],
    }
}
