export const useTheme = () => {
    // useCookie is SSR-aware: reads from request cookies on the server,
    // and from document.cookie on the client — so the initial state is
    // always correct on both sides, no hydration mismatch.
    const themeCookie = useCookie('theme', {
        maxAge: 60 * 60 * 24 * 365, // 1 year
        path: '/',
        sameSite: 'lax',
        default: () => 'system',
    })

    const currentTheme = useState('theme', () => themeCookie.value || 'system')

    const applyTheme = (theme) => {
        // applyTheme only touches the DOM — guard against SSR
        if (!process.client) return

        const html = document.documentElement

        if (theme === 'dark') {
            html.classList.add('dark')
        } else if (theme === 'light') {
            html.classList.remove('dark')
        } else {
            // system — follow OS preference
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
            html.classList.toggle('dark', prefersDark)
        }
    }

    const setTheme = (theme) => {
        currentTheme.value = theme
        // Store in cookie (including 'system' so the blocking <head> script
        // can also handle the system-preference fallback on next load)
        themeCookie.value = theme
        applyTheme(theme)
    }

    const initTheme = () => {
        // The blocking <head> script already applied the class to avoid the
        // flash; this call just keeps Vue state in sync with reality.
        const theme = currentTheme.value
        applyTheme(theme)
    }

    // Watch for OS-level dark/light changes when the user is in system mode
    const setupSystemWatcher = () => {
        if (!process.client) return
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
            if (currentTheme.value === 'system') {
                applyTheme('system')
            }
        })
    }

    return {
        currentTheme,
        setTheme,
        initTheme,
        setupSystemWatcher,
    }
}
