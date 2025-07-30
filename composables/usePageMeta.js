// composables/usePageMeta.js
export const usePageMeta = (pageData) => {
    const siteUrl = 'https://oseahumen-agboifoh-john.vercel.app'

    const setPageMeta = ({
        title,
        description,
        image,
        url,
        type = 'website',
        keywords = [],
        author,
        publishedTime,
        modifiedTime
    }) => {

        const fullTitle = title.includes('–') ? title : `${title} – Oseahumen Agboifoh John`
        const fullUrl = url.startsWith('http') ? url : `${siteUrl}${url}`
        const fullImage = image?.startsWith('http') ? image : `${siteUrl}${image || '/preview.jpg'}`

        useHead({
            title: fullTitle,
            meta: [
                { name: 'description', content: description },
                { name: 'keywords', content: keywords.join(', ') },
                { name: 'author', content: author || 'Oseahumen Agboifoh John' },

                // Open Graph
                { property: 'og:title', content: fullTitle },
                { property: 'og:description', content: description },
                { property: 'og:image', content: fullImage },
                { property: 'og:image:width', content: '1200' },
                { property: 'og:image:height', content: '630' },
                { property: 'og:image:alt', content: `${title} - Preview Image` },
                { property: 'og:url', content: fullUrl },
                { property: 'og:type', content: type },
                { property: 'og:site_name', content: 'Oseahumen Agboifoh John Portfolio' },

                // Twitter Card
                { name: 'twitter:card', content: 'summary_large_image' },
                { name: 'twitter:title', content: fullTitle },
                { name: 'twitter:description', content: description },
                { name: 'twitter:image', content: fullImage },
                { name: 'twitter:image:alt', content: `${title} - Preview Image` },

                // Article specific (for blog posts)
                ...(publishedTime ? [{ property: 'article:published_time', content: publishedTime }] : []),
                ...(modifiedTime ? [{ property: 'article:modified_time', content: modifiedTime }] : []),

                // Additional SEO
                { name: 'robots', content: 'index, follow' },
                { name: 'googlebot', content: 'index, follow' },
            ],
            link: [
                { rel: 'canonical', href: fullUrl }
            ]
        })
    }

    return { setPageMeta }
}

// Usage examples:

// For About page
export const useAboutPageMeta = (ownerData) => {
    const { setPageMeta } = usePageMeta()

    return setPageMeta({
        title: 'About Me',
        description: ownerData?.bio || 'Learn more about my journey as a full-stack developer, my skills in Laravel, FastAPI, Vue, React, and my passion for creating exceptional web experiences.',
        url: '/about',
        image: ownerData?.avatar,
        keywords: [
            'about', 'full-stack developer', 'Laravel expert', 'Vue.js specialist',
            'React developer', 'FastAPI', 'web development', 'Nigeria developer'
        ]
    })
}

// For Projects page
export const useProjectsPageMeta = () => {
    const { setPageMeta } = usePageMeta()

    return setPageMeta({
        title: 'My Projects',
        description: 'Explore my portfolio of web development projects built with Laravel, FastAPI, Vue.js, React, and other modern technologies. See how I solve real-world problems through code.',
        url: '/projects',
        keywords: [
            'projects', 'portfolio', 'Laravel projects', 'Vue.js applications',
            'React apps', 'FastAPI projects', 'web development portfolio', 'case studies'
        ]
    })
}

// For individual project page
export const useProjectPageMeta = (projectData) => {
    const { setPageMeta } = usePageMeta()

    return setPageMeta({
        title: projectData?.title || 'Project',
        description: projectData?.description || projectData?.overview || 'A web development project showcasing modern technologies and best practices.',
        url: `/projects/${projectData?.slug}`,
        image: projectData?.featured_image || projectData?.images?.[0],
        keywords: [
            ...(projectData?.technologies || []),
            'web development', 'project', 'case study', projectData?.title
        ],
        type: 'article',
        publishedTime: projectData?.created_at,
        modifiedTime: projectData?.updated_at
    })
}

// For Contact page
export const useContactPageMeta = () => {
    const { setPageMeta } = usePageMeta()

    return setPageMeta({
        title: 'Contact Me',
        description: 'Get in touch for web development projects, collaborations, or consultations. I\'m available for Laravel, FastAPI, Vue.js, and React development work.',
        url: '/contact',
        keywords: [
            'contact', 'hire developer', 'web development services',
            'Laravel developer for hire', 'Vue.js consultant', 'React developer',
            'Nigeria developer', 'freelance developer'
        ]
    })
}