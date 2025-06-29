export const useTheme = () => {
    const currentTheme = useState('theme', () => 'system')

    const applyTheme = (theme) => {
        const html = document.documentElement

        if (theme === 'dark') {
            html.classList.add('dark')
        } else if (theme === 'light') {
            html.classList.remove('dark')
        } else {
            // system
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
            html.classList.toggle('dark', prefersDark)
        }
    }

    const setTheme = (theme) => {
        currentTheme.value = theme
        if (theme === 'system') {
            localStorage.removeItem('theme')
        } else {
            localStorage.setItem('theme', theme)
        }
        applyTheme(theme)
    }

    const initTheme = () => {
        const saved = localStorage.getItem('theme')
        const theme = saved || 'system'
        currentTheme.value = theme
        applyTheme(theme)
    }

    // Watch for system theme changes if using system mode
    const setupSystemWatcher = () => {
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
