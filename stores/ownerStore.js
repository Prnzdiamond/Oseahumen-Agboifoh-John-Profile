import { defineStore } from "pinia"
import { useRuntimeConfig } from "#app"
import { $fetch } from "ofetch"

export const useOwnerStore = defineStore("owner", {
    state: () => ({
        owner: null,
        loading: false,
        error: null,
        lastFetched: null,
        initialized: false, // Track if we've attempted to fetch at least once
    }),

    getters: {
        isDataFresh: (state) => {
            if (!state.lastFetched) return false;
            const fiveMinutes = 5 * 60 * 1000;
            return Date.now() - state.lastFetched < fiveMinutes;
        },

        // Helper to determine if we should fetch
        shouldFetch: (state) => {
            return !state.initialized || (!state.owner && !state.loading);
        }
    },

    actions: {
        async fetchOwner(forceRefresh = false) {
            // Skip if data is fresh and not forcing refresh
            if (this.owner && this.isDataFresh && !forceRefresh) {
                return this.owner;
            }

            // Prevent multiple simultaneous requests
            if (this.loading && !forceRefresh) {
                return new Promise((resolve) => {
                    const checkLoading = () => {
                        if (!this.loading) {
                            resolve(this.owner);
                        } else {
                            setTimeout(checkLoading, 100);
                        }
                    };
                    checkLoading();
                });
            }

            this.loading = true;
            this.error = null;

            try {
                const config = useRuntimeConfig();
                const response = await $fetch(`${config.public.apiBaseUrl}/owner`, {
                    headers: {
                        'Cache-Control': 'max-age=300' // 5 minutes
                    },
                   
                });

                if (response.success) {
                    this.owner = response.data || null;
                    this.lastFetched = Date.now();
                    this.initialized = true;
                    return this.owner;
                } else {
                    throw new Error(response.message || "Failed to fetch owner data");
                }
            } catch (e) {
                console.error("Failed to fetch owner:", e);
                this.error = e.message || "Failed to fetch owner data";
                this.initialized = true; // Mark as initialized even on error
                throw e; // Re-throw so components can handle errors
            } finally {
                this.loading = false;
            }
        },

        // Method to ensure owner data is available
        async ensureOwner() {
            if (this.shouldFetch) {
                try {
                    await this.fetchOwner();
                } catch (error) {
                    console.warn('Failed to fetch owner data:', error);
                    // Don't throw - let components handle gracefully
                }
            }
            return this.owner;
        },

        // Clear data (useful for logout or refresh scenarios)
        clearOwner() {
            this.owner = null;
            this.error = null;
            this.lastFetched = null;
            this.initialized = false;
        }
    },
});