// plugins/init-owner.js
import { useOwnerStore } from '@/stores/ownerStore'

export default defineNuxtPlugin(async () => {
    const ownerStore = useOwnerStore()

    if (!ownerStore.owner) {
        try {
            await ownerStore.fetchOwner()
        } catch (err) {
            console.error('Failed to fetch owner:', err)
        }
    }
})
