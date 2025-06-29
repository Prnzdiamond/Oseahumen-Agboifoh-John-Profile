import { defineStore } from "pinia"
import { useRuntimeConfig } from "#app"
import { $fetch } from "ofetch"

export const useOwnerStore = defineStore("owner", {
    state: () => ({
        owner: null,
        loading: false,
        error: null,
        lastFetched: null,
    }),

    getters: {
        isDataFresh: (state) => {
            if (!state.lastFetched) return false;
            const fiveMinutes = 5 * 60 * 1000;
            return Date.now() - state.lastFetched < fiveMinutes;
        }
    },

    actions: {
        async fetchOwner(forceRefresh = false) {
            // Skip if data is fresh and not forcing refresh
            if (this.owner && this.isDataFresh && !forceRefresh) {
                return;
            }

            this.loading = true;
            this.error = null;

            try {
                const config = useRuntimeConfig();
                const response = await $fetch(`${config.public.apiBaseUrl}/owner`, {
                    // Add client-side caching
                    headers: {
                        'Cache-Control': 'max-age=300' // 5 minutes
                    }
                });

                if (response.success) {
                    this.owner = response.data || null;
                    this.lastFetched = Date.now();
                } else {
                    throw new Error(response.message || "Failed to fetch owner data");
                }
            } catch (e) {
                console.error("Failed to fetch owner:", e);
                this.error = e.message || "Failed to fetch owner data";
            } finally {
                this.loading = false;
            }
        },
    },
});
