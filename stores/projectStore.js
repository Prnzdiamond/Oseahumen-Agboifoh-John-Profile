import { defineStore } from "pinia"
import { useRuntimeConfig } from "#app"
import { $fetch } from "ofetch"

export const useProjectStore = defineStore("project", {
    state: () => ({
        projects: [],
        project: null,
        loading: false,
        error: null,
        lastFetched: null,
        projectCache: new Map(), // Client-side project cache
    }),

    getters: {
        isProjectsDataFresh: (state) => {
            if (!state.lastFetched) return false;
            const tenMinutes = 10 * 60 * 1000;
            return Date.now() - state.lastFetched < tenMinutes;
        }
    },

    actions: {
        async fetchProjects(forceRefresh = false) {
            if (this.projects.length && this.isProjectsDataFresh && !forceRefresh) {
                return;
            }

            this.loading = true;
            this.error = null;

            try {
                const config = useRuntimeConfig();
                const response = await $fetch(`${config.public.apiBaseUrl}/projects`, {
                    headers: {
                        'Cache-Control': 'max-age=600' // 10 minutes
                    }
                });

                if (response.success) {
                    this.projects = response.data || [];
                    this.lastFetched = Date.now();
                } else {
                    throw new Error(response.message || "Failed to fetch projects");
                }
            } catch (err) {
                console.error("Failed to fetch projects:", err);
                this.error = err.message || "Failed to fetch projects";
            } finally {
                this.loading = false;
            }
        },

        async fetchProject(slug, forceRefresh = false) {
            // Check client-side cache first
            if (this.projectCache.has(slug) && !forceRefresh) {
                this.project = this.projectCache.get(slug);
                return;
            }

            this.loading = true;
            this.error = null;

            try {
                const config = useRuntimeConfig();
                const response = await $fetch(`${config.public.apiBaseUrl}/projects/${slug}`, {
                    headers: {
                        'Cache-Control': 'max-age=300' // 5 minutes
                    }
                });

                if (response.success) {
                    this.project = response.data || null;
                    this.projectCache.set(slug, this.project); // Cache the project
                } else {
                    throw new Error(response.message || "Failed to fetch project");
                }
            } catch (err) {
                console.error("Failed to fetch project:", err);
                this.error = err.message || "Failed to fetch project";
            } finally {
                this.loading = false;
            }
        },

        clearProject() {
            this.project = null;
        },

        clearCache() {
            this.projectCache.clear();
            this.lastFetched = null;
        }
    },
});