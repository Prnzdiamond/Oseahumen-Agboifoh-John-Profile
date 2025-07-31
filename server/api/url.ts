import { defineSitemapEventHandler } from "#imports";
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
    const response: ProjectResponse = await $fetch("https://oseahumen-agboifoh-john.duckdns.org/api/projects", {
        headers: {
            'X-Bypass-Sitemap': process.env.NUXT_SITEMAP_SECRET ?? ""
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