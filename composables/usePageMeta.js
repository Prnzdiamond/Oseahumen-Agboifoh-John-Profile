// composables/usePageMeta.js
//
// Centralised SEO meta + JSON-LD for all pages.
// Already has OG, Twitter cards, canonical. We add Person JSON-LD here.

const siteUrl = 'https://oseahumen-agboifoh-john.vercel.app'

export const usePageMeta = () => {
    const setPageMeta = ({
        title,
        description,
        image,
        url,
        type        = 'website',
        keywords    = [],
        author,
        publishedTime,
        modifiedTime,
    }) => {
        const fullTitle = title.includes('–') ? title : `${title} – Oseahumen Agboifoh John`
        const fullUrl   = url.startsWith('http') ? url : `${siteUrl}${url}`
        const fullImage = image?.startsWith('http') ? image : `${siteUrl}${image || '/preview.jpg'}`

        useHead({
            title: fullTitle,
            htmlAttrs: { lang: 'en' },
            meta: [
                { name: 'description',  content: description },
                { name: 'keywords',     content: keywords.join(', ') },
                { name: 'author',       content: author || 'Oseahumen Agboifoh John' },
                { name: 'robots',       content: 'index, follow' },
                { name: 'googlebot',    content: 'index, follow' },

                // Open Graph
                { property: 'og:title',       content: fullTitle },
                { property: 'og:description', content: description },
                { property: 'og:image',       content: fullImage },
                { property: 'og:image:width', content: '1200' },
                { property: 'og:image:height',content: '630' },
                { property: 'og:image:alt',   content: `${title} – Preview Image` },
                { property: 'og:url',         content: fullUrl },
                { property: 'og:type',        content: type },
                { property: 'og:site_name',   content: 'Oseahumen Agboifoh John Portfolio' },

                // Twitter Card
                { name: 'twitter:card',        content: 'summary_large_image' },
                { name: 'twitter:title',       content: fullTitle },
                { name: 'twitter:description', content: description },
                { name: 'twitter:image',       content: fullImage },
                { name: 'twitter:image:alt',   content: `${title} – Preview Image` },

                // Article-specific
                ...(publishedTime ? [{ property: 'article:published_time', content: publishedTime }] : []),
                ...(modifiedTime  ? [{ property: 'article:modified_time',  content: modifiedTime  }] : []),
            ],
            link: [
                { rel: 'canonical', href: fullUrl },
            ],
        })
    }

    return { setPageMeta }
}

// ── Page-specific helpers ─────────────────────────────────────────────────────

export const useAboutPageMeta = (ownerData) => {
    const { setPageMeta } = usePageMeta()
    return setPageMeta({
        title:       'About Me',
        description: ownerData?.bio || 'Learn more about my journey as a full-stack developer, skills in Laravel, FastAPI, Vue, React, and my passion for creating exceptional web experiences.',
        url:         '/about',
        image:       ownerData?.avatar,
        keywords:    ['about', 'full-stack developer', 'Laravel', 'Vue.js', 'React', 'FastAPI', 'web development', 'Nigeria developer'],
    })
}

export const useProjectsPageMeta = () => {
    const { setPageMeta } = usePageMeta()
    return setPageMeta({
        title:       'My Projects',
        description: 'Explore my portfolio of web development projects built with Laravel, FastAPI, Vue.js, React, and other modern technologies.',
        url:         '/projects',
        keywords:    ['projects', 'portfolio', 'Laravel', 'Vue.js', 'React', 'FastAPI', 'web development'],
    })
}

export const useProjectPageMeta = (projectData) => {
    const { setPageMeta } = usePageMeta()
    return setPageMeta({
        title:         projectData?.title || 'Project',
        description:   projectData?.description || 'A web development project showcasing modern technologies.',
        url:           `/projects/${projectData?.slug}`,
        // Use cover_image as the OG image for project pages
        image:         projectData?.cover_image || projectData?.main_image,
        keywords:      [...(projectData?.technologies || []), 'web development', 'project', projectData?.title].filter(Boolean),
        type:          'article',
        publishedTime: projectData?.created_at,
        modifiedTime:  projectData?.updated_at,
    })
}

export const useContactPageMeta = () => {
    const { setPageMeta } = usePageMeta()
    return setPageMeta({
        title:       'Contact Me',
        description: "Get in touch for web development projects, collaborations, or consultations. Available for Laravel, FastAPI, Vue.js, and React development.",
        url:         '/contact',
        keywords:    ['contact', 'hire developer', 'web development services', 'Laravel', 'Vue.js', 'Nigeria developer', 'freelance developer'],
    })
}

/**
 * Injects a Person JSON-LD schema into the homepage <head>.
 * Call this after ownerStore data is loaded.
 * This is what gets you Google's Knowledge Panel and rich results.
 *
 * @param {Object} owner  - The owner data object from ownerStore
 */
export const usePersonJsonLd = (owner) => {
    if (!owner) return

    const socialLinks = (owner.urls ?? [])
        .filter(u => u?.url)
        .map(u => u.url)

    useHead({
        script: [{
            type: 'application/ld+json',
            innerHTML: JSON.stringify({
                '@context': 'https://schema.org',
                '@type':    'Person',
                'name':     owner.name,
                'url':      siteUrl,
                'image':    owner.avatar || `${siteUrl}/images/default_avatar.png`,
                'jobTitle': owner.headline,
                'description': owner.bio,
                'email':    owner.contact_info?.find(c => c.type === 'email')?.value
                            ?? owner.email,
                'sameAs':   socialLinks,
                'knowsAbout': (owner.tech_stack ?? [])
                    .map(t => t.technology || t.name || t)
                    .filter(Boolean),
                'address': {
                    '@type':           'PostalAddress',
                    'addressCountry':  'NG',
                },
                'worksFor': {
                    '@type': 'Organization',
                    'name':  'Freelance / Open to opportunities',
                },
            }),
        }],
    })
}
