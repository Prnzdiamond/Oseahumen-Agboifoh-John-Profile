// defineSitemapEventHandler and useRuntimeConfig are auto-imported by Nuxt /
// @nuxtjs/sitemap in the Nitro server context — importing the former from
// "#imports" trips a type-resolution miss, so rely on the auto-import instead.
import type { SitemapUrlInput } from "#sitemap/types";
import { $fetch } from 'ofetch';

type Project = {
    id: number
    title: string
    description: string
    slug: string
    cover_image: string
    main_image: string
    images: string[]
}

type ProjectResponse = {
    success: boolean
    data: Project[]
}

export default defineSitemapEventHandler(async () => {
    // Runs server-side at prerender/build. Use the same runtime config as the
    // app (so a local BACKEND_URL is honoured) and authenticate as a trusted
    // server-to-server caller with X-Server-Token — the backend origin gate
    // rejects header-bearing requests that carry no valid token.
    const config = useRuntimeConfig();
    const response: ProjectResponse = await $fetch(`${config.public.apiBaseUrl}/projects`, {
        headers: {
            'X-Server-Token': config.apiServerToken as string
        }
    });

    if (response.success) {
        return response.data.map((project: Project): SitemapUrlInput => {
            const allImages = [
                project.cover_image,
                project.main_image,
                ...(project.images || [])
            ].filter(Boolean);

            return {
                loc: `/projects/${project.slug}`,
                changefreq: 'daily',
                priority: 0.8,
                lastmod: new Date().toISOString(),
                images: allImages.map((img) => ({
                    loc: img,
                    caption: project.title,
                }))
            };
        });
    }

    return [];
});