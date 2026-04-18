// stores/filterStore.js
//
// Single source of truth for project filter state across the whole app.
//
// Three layers:
//   sessionFilter  — what the user arrived at via a filter URL. Persisted to
//                    localStorage so it survives browser restarts. Restored on
//                    every page load so visiting /projects always re-applies it.
//
//   isViewingAll   — temporary override. True when user explicitly clicks
//                    "View All Projects". NOT persisted. Resets to false the
//                    next time /projects is visited after navigating away.
//                    This means: "view all" shows everything right now, but
//                    the session filter is still remembered for next time.
//
//   resultCache    — in-memory memoization. Maps a filter key → array of
//                    matching project IDs so repeated filter computations are
//                    O(1) lookups. Cleared when the project list refreshes.

import { defineStore } from 'pinia'
import { $fetch } from 'ofetch'

const LS_KEY = 'portfolio_session_filter'

export const useFilterStore = defineStore('filter', {
    state: () => ({
        // ── Persisted (localStorage) ──────────────────────────────────────────
        // tech:    slugs from segment 1 — match against project.technologies
        // context: slugs from segment 2 — match against project.industry,
        //          project.type, and project.tags
        sessionFilter: {
            tech:    [],
            context: [],
        },

        // ── Session-only (not persisted) ──────────────────────────────────────
        // True only while the user is actively "viewing all" on /projects.
        // Resets to false when they navigate away and come back.
        isViewingAll: false,

        // In-memory result cache: filterKey → [project.id, ...]
        // Cleared by clearResultCache() when projectStore refreshes.
        _resultCache: {},

        // ── Meta data — distinct filter dimensions from /api/projects/meta ────
        meta: {
            industries: [],
            types:      [],
            tags:       [],
        },
        metaLoaded: false,
    }),

    getters: {
        // Convenience: does the session filter have anything set?
        hasSessionFilter: (state) =>
            state.sessionFilter.tech.length > 0 ||
            state.sessionFilter.context.length > 0,

        // Total count of active filter slugs (for the badge on the Filter button)
        totalActiveCount: (state) =>
            state.sessionFilter.tech.length + state.sessionFilter.context.length,
    },

    actions: {
        // ── Initialisation ────────────────────────────────────────────────────

        /**
         * Call once on app init (from default.vue or app.vue onMounted).
         * Reads localStorage and restores the session filter.
         */
        init() {
            if (import.meta.client) {
                try {
                    const raw = localStorage.getItem(LS_KEY)
                    if (raw) {
                        const parsed = JSON.parse(raw)
                        if (parsed?.tech || parsed?.context) {
                            this.sessionFilter = {
                                tech:    Array.isArray(parsed.tech)    ? parsed.tech    : [],
                                context: Array.isArray(parsed.context) ? parsed.context : [],
                            }
                        }
                    }
                } catch (_) {
                    // Corrupt localStorage — start fresh
                    localStorage.removeItem(LS_KEY)
                }
            }
        },

        // ── Setting / clearing the session filter ─────────────────────────────

        /**
         * Set the session filter from a URL (called when landing on a filter page).
         * Saves to localStorage so it survives browser restarts.
         *
         * @param {string[]} tech    - slugs from segment 1 (tech axis)
         * @param {string[]} context - slugs from segment 2 (industry/type/tags axis)
         */
        setSessionFilter(tech = [], context = []) {
            this.sessionFilter = { tech: [...tech], context: [...context] }
            this.isViewingAll  = false
            this._persist()
        },

        /**
         * Clear the session filter completely.
         * Called from a dedicated "Forget my filter" button if you ever add one.
         * NOT called by "View All" — that just sets isViewingAll.
         */
        clearSessionFilter() {
            this.sessionFilter = { tech: [], context: [] }
            this._persist()
        },

        /**
         * User clicked "View All Projects".
         * Temporarily shows everything without erasing the session filter.
         * The next visit to /projects after navigating away will re-apply the filter.
         */
        viewAll() {
            this.isViewingAll = true
        },

        /**
         * Call when the user returns to /projects after navigating away.
         * Resets the isViewingAll override so the session filter re-applies.
         */
        resetViewAll() {
            this.isViewingAll = false
        },

        // ── Result memoization ────────────────────────────────────────────────

        /**
         * Core filter function — checks cache first, computes on miss.
         *
         * Returns the filtered project list. Applies AND logic between axes
         * and OR logic within each axis:
         *   - Project must match tech axis (if any tech filters active)
         *   - Project must match context axis (if any context filters active)
         *   - Within tech axis: any tech OR category match → passes
         *   - Within context axis: industry OR type OR tag match → passes
         *
         * @param {Array}  projects      - full project list from projectStore
         * @param {Array}  techFilters   - slugs for tech axis
         * @param {Array}  ctxFilters    - slugs for context axis
         * @param {Object} techStore     - technologyStore instance (for resolution)
         */
        getFilteredProjects(projects, techFilters, ctxFilters, techStore) {
            if (!projects?.length) return []
            if (!techFilters.length && !ctxFilters.length) return projects

            const cacheKey = _cacheKey(techFilters, ctxFilters)
            const cached   = this._resultCache[cacheKey]

            if (cached) {
                // Return projects whose IDs are in the cached set
                const ids = new Set(cached)
                return projects.filter(p => ids.has(p.id))
            }

            // ── Compute ───────────────────────────────────────────────────────
            const matched = projects.filter(p =>
                _matchesTech(p, techFilters, techStore) &&
                _matchesContext(p, ctxFilters)
            )

            // Store just the IDs so the cache doesn't hold stale object refs
            this._resultCache[cacheKey] = matched.map(p => p.id)

            return matched
        },

        /**
         * Clear the result cache. Call this when the project list refreshes
         * so stale results don't accumulate.
         */
        clearResultCache() {
            this._resultCache = {}
        },

        // ── Meta data ─────────────────────────────────────────────────────────

        /**
         * Fetch the distinct industries, types, and tags from the backend.
         * Cached in-store (no re-fetch if already loaded).
         * The backend caches this forever and busts it on any project save.
         */
        async fetchMeta(apiBaseUrl) {
            if (this.metaLoaded) return
            try {
                const res = await $fetch(`${apiBaseUrl}/projects/meta`)
                if (res.success) {
                    this.meta = {
                        industries: res.data.industries ?? [],
                        types:      res.data.types      ?? [],
                        tags:       res.data.tags        ?? [],
                    }
                    this.metaLoaded = true
                }
            } catch (e) {
                console.warn('[filterStore] meta fetch failed:', e)
            }
        },

        // ── Helpers ───────────────────────────────────────────────────────────

        /** Checks whether a given slug is a known context slug (not tech). */
        isContextSlug(slug) {
            const n = slug.toLowerCase()
            return (
                this.meta.industries.includes(n) ||
                this.meta.types.some(t => _typeToSlug(t) === n) ||
                this.meta.tags.includes(n)
            )
        },

        // ── Private ───────────────────────────────────────────────────────────

        _persist() {
            if (import.meta.client) {
                if (this.hasSessionFilter) {
                    localStorage.setItem(LS_KEY, JSON.stringify(this.sessionFilter))
                } else {
                    localStorage.removeItem(LS_KEY)
                }
            }
        },
    },
})

// ── Module-level helpers (not exported) ───────────────────────────────────────

function _cacheKey(techFilters, ctxFilters) {
    return 't:' + [...techFilters].sort().join('|') +
           '|c:' + [...ctxFilters].sort().join('|')
}

/**
 * Returns true if the project matches the tech axis filters.
 * Uses the technologyStore to expand category slugs (e.g. "python" → all Python techs).
 */
function _matchesTech(project, techFilters, techStore) {
    if (!techFilters.length) return true
    if (!project.technologies?.length) return false

    const expandedSlugs = new Set(
        techFilters.flatMap(slug => techStore.expandFilterSlug(slug))
    )

    return project.technologies.some(techName => {
        const tech = techStore.resolve(techName)
        return expandedSlugs.has(tech.slug)
    })
}

/**
 * Returns true if the project matches the context axis filters.
 * Context slugs are matched against: industry, type (slugified), and tags.
 * OR logic within the axis: any single match is enough.
 */
function _matchesContext(project, ctxFilters) {
    if (!ctxFilters.length) return true

    return ctxFilters.some(slug => {
        const n = slug.toLowerCase()

        // Match industry: normalize both sides to slug format before comparing
        if (project.industry) {
            const ind = project.industry.toLowerCase().replace(/[\s_]/g, '-')
            if (ind === n) return true
        }

        // Match type: "web_application" → "web-application" or "web_application"
        if (project.type) {
            const typeSlug = project.type.toLowerCase().replace(/_/g, '-')
            const typeRaw  = project.type.toLowerCase()
            if (typeSlug === n || typeRaw === n) return true
        }

        // Match tags: project.tags is an array of slugs
        if (Array.isArray(project.tags) && project.tags.some(t => t.toLowerCase() === n)) {
            return true
        }

        return false
    })
}

function _typeToSlug(type) {
    return type.toLowerCase().replace(/_/g, '-')
}
