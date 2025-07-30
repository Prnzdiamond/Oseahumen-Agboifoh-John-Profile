
export const useFavicon = () => {
    const updateFavicon = (imageUrl) => {
        if (process.client && imageUrl) {
            // Create a canvas to generate favicon from profile image
            const canvas = document.createElement('canvas')
            const ctx = canvas.getContext('2d')
            const img = new Image()

            img.crossOrigin = 'anonymous'
            img.onload = () => {
                // Set canvas size for favicon
                canvas.width = 32
                canvas.height = 32

                // Draw circular profile image
                ctx.beginPath()
                ctx.arc(16, 16, 16, 0, 2 * Math.PI)
                ctx.clip()

                // Draw the image
                ctx.drawImage(img, 0, 0, 32, 32)

                // Convert to data URL
                const dataURL = canvas.toDataURL('image/png')

                // Update favicon
                let favicon = document.querySelector('link[rel="icon"]')
                if (!favicon) {
                    favicon = document.createElement('link')
                    favicon.rel = 'icon'
                    document.head.appendChild(favicon)
                }
                favicon.href = dataURL

                // Update apple touch icon as well
                let appleTouchIcon = document.querySelector('link[rel="apple-touch-icon"]')
                if (appleTouchIcon) {
                    appleTouchIcon.href = dataURL
                }
            }

            img.onerror = () => {
                console.warn('Failed to load profile image for favicon, using default')
                // Fallback to default favicon
                let favicon = document.querySelector('link[rel="icon"]')
                if (favicon) {
                    favicon.href = '/favicon.ico'
                }
            }

            img.src = imageUrl
        }
    }

    const resetToDefault = () => {
        if (process.client) {
            let favicon = document.querySelector('link[rel="icon"]')
            if (favicon) {
                favicon.href = '/favicon.ico'
            }
        }
    }

    return {
        updateFavicon,
        resetToDefault
    }
}