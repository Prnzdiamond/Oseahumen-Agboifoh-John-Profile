// composables/useTechnology.js
//
// THE single place in the frontend that knows how to:
//  - Resolve a tech name → devicon class + color + custom icon URL
//  - Check if a project matches a set of active URL filters
//
// Import this anywhere you render a tech badge, pill, or filter.
// Zero hardcoding. Add a new tech to the backend → it works here automatically.
//
// Quick reference:
//   const { getIconClass, getColor, resolve, filterMatches } = useTechnology()
//   getIconClass('Laravel')   → "devicon-laravel-plain colored"
//   getIconClass('Rust')      → "devicon-rust-plain colored"
//   getIconClass('Filament')  → null  (no devicon, use custom icon or fallback)
//   getColor('Laravel')       → "#FF2D20"
//   filterMatches(['Laravel', 'MySQL'], ['php'])  → true  (Laravel is category php)

import { useTechnologyStore } from '~/stores/technologyStore'

export const useTechnology = () => {
    const techStore = useTechnologyStore()

    /**
     * Returns the full devicon CSS class string for a tech name.
     * e.g. "devicon-laravel-plain colored"
     * Returns null if the tech has no devicon entry.
     */
    const getIconClass = (name) => {
        if (!name) return null
        return techStore.resolve(name).devicon_class ?? null
    }

    /**
     * Returns the brand hex color for a tech.
     * Falls back to a soft blue so there's always a visible color.
     */
    const getColor = (name) => {
        if (!name) return '#3B82F6'
        return techStore.resolve(name).color ?? '#3B82F6'
    }

    /**
     * Returns a custom icon URL for techs without a devicon entry.
     * e.g. Cloudinary has a custom SVG URL.
     */
    const getCustomIconUrl = (name) => {
        if (!name) return null
        return techStore.resolve(name).custom_icon_url ?? null
    }

    /**
     * Returns the full resolved catalog entry for a tech name.
     * Useful when you need multiple properties at once.
     */
    const resolve = (name) => techStore.resolve(name)

    /**
     * Given a URL filter slug (e.g. "python"), returns all tech slugs
     * that should be included. Category-aware — "python" expands to
     * every tech whose category === "python".
     */
    const expandFilterSlug = (slug) => techStore.expandFilterSlug(slug)

    /**
     * Returns true if a project's technology list matches ANY of the
     * active filter slugs (OR logic, category-aware).
     *
     * Examples:
     *   filterMatches(["Laravel", "MySQL"], ["php"])       → true
     *   filterMatches(["Laravel", "MySQL"], ["database"])  → true
     *   filterMatches(["React", "Node.js"], ["php"])       → false
     *   filterMatches(["FastAPI", "Python"], ["python"])   → true
     *   filterMatches(["Laravel"], ["php", "python"])      → true (OR)
     *
     * @param {string[]} projectTechs  - project.technologies array
     * @param {string[]} activeFilters - slugs from the URL (?tech= or /slug)
     */
    const filterMatches = (projectTechs, activeFilters) => {
        if (!activeFilters?.length) return true          // no filter = show all
        if (!projectTechs?.length)  return false         // project has no techs

        // Expand each filter slug to the full set of matching tech slugs
        const expandedSlugs = new Set(
            activeFilters.flatMap(slug => expandFilterSlug(slug))
        )

        // A project matches if ANY of its techs resolves to a matching slug
        return projectTechs.some(techName => {
            const tech = techStore.resolve(techName)
            return expandedSlugs.has(tech.slug)
        })
    }

    return {
        getIconClass,
        getColor,
        getCustomIconUrl,
        resolve,
        expandFilterSlug,
        filterMatches,
    }
}
