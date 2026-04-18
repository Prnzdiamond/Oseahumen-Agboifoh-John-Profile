// composables/useProjectFilter.js
//
// Resolves Option D two-segment filter URLs into structured filter state.
//
// URL format:
//   /segment0/segment1
//   segment0  — comma-separated tech slugs  (laravel,python)
//   segment1  — comma-separated context slugs  (real-estate,ai-ml,live-chat)
//
// Single-segment resolution rule:
//   Check segment against tech catalog first.
//   If not found there, check against meta (industries, types, tags).
//   404 only if the slug is found in neither.
//
// The key behaviour difference vs the old [filter].vue:
//   OLD: "laravel,vue" with no Vue projects → 404  (wrong)
//   NEW: "vue" is valid (exists in tech catalog) even if no project uses it.
//        Valid slug + zero results = empty state, NOT 404.

import { useTechnologyStore } from '~/stores/technologyStore'
import { useFilterStore }     from '~/stores/filterStore'

export const useProjectFilter = () => {
    const techStore   = useTechnologyStore()
    const filterStore = useFilterStore()

    /**
     * Parse and resolve a raw URL param array (from [...filter] Nuxt route).
     *
     * Nuxt gives us:
     *   /laravel              → params.filter = ['laravel']
     *   /laravel,vue          → params.filter = ['laravel,vue']
     *   /laravel/real-estate  → params.filter = ['laravel', 'real-estate']
     *   /laravel,vue/real-estate,ai → params.filter = ['laravel,vue', 'real-estate,ai']
     *
     * Returns:
     * {
     *   valid:        boolean  — false only when a slug exists in neither catalog
     *   techFilters:  string[] — resolved tech slugs (segment 0)
     *   ctxFilters:   string[] — resolved context slugs (segment 1)
     *   unknownSlugs: string[] — slugs that matched nothing (causes valid=false)
     *   label:        string   — human-readable description e.g. "Laravel + Real Estate"
     * }
     */
    const resolveFilterParams = (filterParamArray) => {
        if (!filterParamArray?.length) {
            return { valid: true, techFilters: [], ctxFilters: [], unknownSlugs: [], label: '' }
        }

        // Segment 0 — tech axis
        const seg0Slugs = filterParamArray[0]
            ?.split(',')
            .map(s => s.trim().toLowerCase())
            .filter(Boolean) ?? []

        // Segment 1 — context axis (optional)
        const seg1Slugs = filterParamArray[1]
            ?.split(',')
            .map(s => s.trim().toLowerCase())
            .filter(Boolean) ?? []

        // If we only have one segment, resolve it — it could be either axis
        // depending on what the slug maps to
        if (seg0Slugs.length && !seg1Slugs.length) {
            return _resolveSingleSegment(seg0Slugs)
        }

        // Two segments: 0 = tech, 1 = context (strict — no smart resolution needed)
        const unknownTech = seg0Slugs.filter(s => !_isTechSlug(s))
        const unknownCtx  = seg1Slugs.filter(s => !_isContextSlug(s))
        const unknownSlugs = [...unknownTech, ...unknownCtx]

        const label = _buildLabel(seg0Slugs, seg1Slugs)

        return {
            valid:        unknownSlugs.length === 0,
            techFilters:  seg0Slugs,
            ctxFilters:   seg1Slugs,
            unknownSlugs,
            label,
        }
    }

    /**
     * Single-segment smart resolution.
     * Each slug is independently resolved against tech OR context catalogs.
     * Slugs that match tech go into techFilters; slugs that match context
     * go into ctxFilters. Unknown slugs make valid=false.
     *
     * Example: '/real-estate' → ctxFilters:['real-estate'], techFilters:[]
     * Example: '/laravel'     → techFilters:['laravel'],    ctxFilters:[]
     */
    const _resolveSingleSegment = (slugs) => {
        const techFilters  = []
        const ctxFilters   = []
        const unknownSlugs = []

        for (const slug of slugs) {
            if (_isTechSlug(slug)) {
                techFilters.push(slug)
            } else if (_isContextSlug(slug)) {
                ctxFilters.push(slug)
            } else {
                unknownSlugs.push(slug)
            }
        }

        return {
            valid: unknownSlugs.length === 0,
            techFilters,
            ctxFilters,
            unknownSlugs,
            label: _buildLabel(techFilters, ctxFilters),
        }
    }

    /**
     * Check if a slug matches the tech catalog.
     * Checks: exact slug, category name, and all aliases.
     * This is the key fix for the "laravel,vue → 404" bug:
     * previously only checked exact slugs, now checks aliases too.
     */
    const _isTechSlug = (slug) => {
        if (!techStore.catalog.length) return false
        const n = normalize(slug)
        return techStore.catalog.some(t =>
            normalize(t.slug) === n ||
            normalize(t.category) === n ||
            (t.aliases ?? []).some(a => normalize(a) === n)
        )
    }

    /**
     * Check if a slug matches the context catalog (industries, types, tags).
     */
    const _isContextSlug = (slug) => {
        const n = slug.toLowerCase()
        return (
            filterStore.meta.industries.includes(n) ||
            filterStore.meta.types.some(t => t.toLowerCase().replace(/_/g, '-') === n || t.toLowerCase() === n) ||
            filterStore.meta.tags.includes(n)
        )
    }

    /**
     * Build a human-readable label from resolved filters.
     * e.g. techFilters=['laravel','python'], ctxFilters=['real-estate']
     *      → "Laravel, Python / Real Estate"
     */
    const _buildLabel = (techFilters, ctxFilters) => {
        const techNames = techFilters.map(s => {
            const entry = techStore.catalog.find(t =>
                t.slug === s ||
                (t.aliases ?? []).some(a => normalize(a) === normalize(s))
            )
            return entry?.name ?? _humanize(s)
        })

        const ctxNames = ctxFilters.map(s => _humanize(s))

        const parts = []
        if (techNames.length) parts.push(techNames.join(', '))
        if (ctxNames.length)  parts.push(ctxNames.join(', '))
        return parts.join(' / ')
    }

    /**
     * Build a shareable clean URL for a given filter state.
     * /tech1,tech2/ctx1,ctx2
     */
    const buildFilterUrl = (techFilters, ctxFilters) => {
        const parts = []
        if (techFilters.length)  parts.push(techFilters.join(','))
        if (ctxFilters.length) {
            if (!techFilters.length) {
                // Context only — use single segment
                return '/' + ctxFilters.join(',')
            }
            parts.push(ctxFilters.join(','))
        }
        return parts.length ? '/' + parts.join('/') : '/projects'
    }

    /**
     * Given a project list, a tech filter array, and a context filter array,
     * return the number of matching projects. Used for showing counts in the
     * filter panel without computing the full filtered list.
     */
    const countMatches = (projects, techFilters, ctxFilters) => {
        return filterStore.getFilteredProjects(
            projects, techFilters, ctxFilters, techStore
        ).length
    }

    return {
        resolveFilterParams,
        buildFilterUrl,
        countMatches,
    }
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function normalize(str) {
    if (!str) return ''
    return String(str).toLowerCase().replace(/[\s.\-_]/g, '')
}

function _humanize(slug) {
    return slug
        .split('-')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ')
}
