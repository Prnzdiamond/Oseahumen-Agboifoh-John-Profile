// composables/useSocialIcon.js
//
// Shared social-platform icon and URL logic used by about.vue and contact.vue.
// All platform-to-icon mapping lives here — never duplicated in components.
//
// Icon resolution priority per platform:
//   1. Devicon CSS class  (i.e. devicon-github-original)
//   2. Lucide icon name   (kebab-case, for platforms not in Devicon)
//   3. null               (fallback to a generic link icon in the template)

export const useSocialIcon = () => {

    // ── Devicon CSS class for known platforms ─────────────────────────────────
    // Returns null for platforms not in Devicon — use getLucideIcon as fallback.
    const getDeviconClass = (platform) => {
        const map = {
            github:    'devicon-github-original',
            gitlab:    'devicon-gitlab-plain colored',
            linkedin:  'devicon-linkedin-plain colored',
            twitter:   'devicon-twitter-original colored',
            discord:   'devicon-discord-plain colored',
            youtube:   'devicon-youtube-plain colored',
            facebook:  'devicon-facebook-plain colored',
            slack:     'devicon-slack-plain colored',
            behance:   'devicon-behance-plain colored',
            dribbble:  'devicon-dribbble-plain colored',
            // Platforms intentionally absent — not in Devicon:
            // instagram, medium, reddit, tiktok, telegram, whatsapp, website, blog, portfolio
        }
        return map[platform] ?? null
    }

    // ── Lucide icon name for platforms absent from Devicon ────────────────────
    const getLucideIcon = (platform) => {
        const map = {
            instagram: 'instagram',
            medium:    'book-open',
            reddit:    'message-square',
            tiktok:    'music',
            telegram:  'send',
            whatsapp:  'message-circle',
            website:   'globe',
            portfolio: 'layout-dashboard',
            blog:      'pen-line',
            skype:     'phone',
        }
        return map[platform] ?? 'link'
    }

    // ── Human-readable display name ───────────────────────────────────────────
    const getPlatformLabel = (platform) => {
        const labels = {
            github: 'GitHub', gitlab: 'GitLab', linkedin: 'LinkedIn',
            twitter: 'Twitter / X', instagram: 'Instagram', facebook: 'Facebook',
            youtube: 'YouTube', tiktok: 'TikTok', snapchat: 'Snapchat',
            pinterest: 'Pinterest', reddit: 'Reddit', medium: 'Medium',
            behance: 'Behance', dribbble: 'Dribbble', discord: 'Discord',
            telegram: 'Telegram', whatsapp: 'WhatsApp', skype: 'Skype',
            website: 'Website', portfolio: 'Portfolio', blog: 'Blog',
        }
        return labels[platform] ?? (platform.charAt(0).toUpperCase() + platform.slice(1))
    }

    // ── Short description shown under the platform name ───────────────────────
    const getPlatformDescription = (platform) => {
        const desc = {
            github:    'View code repositories',
            gitlab:    'Code repositories',
            linkedin:  'Professional network',
            twitter:   'Follow for updates',
            instagram: 'Visual content',
            facebook:  'Social updates',
            youtube:   'Video content',
            tiktok:    'Short videos',
            discord:   'Gaming & community chat',
            telegram:  'Instant messaging',
            whatsapp:  'Direct messaging',
            medium:    'Articles & blogs',
            behance:   'Creative portfolio',
            dribbble:  'Design showcase',
            website:   'Personal website',
            portfolio: 'Portfolio site',
            blog:      'Blog & articles',
        }
        return desc[platform] ?? 'Connect here'
    }

    // ── Full URL builder ──────────────────────────────────────────────────────
    // Accepts a raw value (username, handle, or full URL) and returns a
    // properly formatted full URL for the given platform.
    const buildPlatformUrl = (platform, url) => {
        if (!url) return ''
        const msg = 'Hi! Found your profile and would like to connect.'
        switch (platform) {
            case 'whatsapp':
                return `https://wa.me/${url.replace(/\D/g, '')}?text=${encodeURIComponent(msg)}`
            case 'telegram':
                return `https://t.me/${url.replace('@', '')}`
            case 'github':
                return url.includes('github.com') ? url : `https://github.com/${url}`
            case 'gitlab':
                return url.includes('gitlab.com') ? url : `https://gitlab.com/${url}`
            case 'linkedin':
                return url.includes('linkedin.com') ? url : `https://linkedin.com/in/${url}`
            case 'twitter':
                return url.includes('twitter.com') || url.includes('x.com') ? url : `https://twitter.com/${url}`
            case 'instagram':
                return url.includes('instagram.com') ? url : `https://instagram.com/${url}`
            case 'youtube':
                return url.includes('youtube.com') || url.includes('youtu.be') ? url : `https://youtube.com/@${url}`
            case 'discord':
                return url.includes('discord.com') ? url : `https://discord.com/users/${url}`
            case 'tiktok':
                return url.includes('tiktok.com') ? url : `https://tiktok.com/@${url}`
            case 'medium':
                return url.includes('medium.com') ? url : `https://medium.com/@${url}`
            case 'behance':
                return url.includes('behance.net') ? url : `https://behance.net/${url}`
            case 'dribbble':
                return url.includes('dribbble.com') ? url : `https://dribbble.com/${url}`
            case 'reddit':
                return url.includes('reddit.com') ? url : `https://reddit.com/u/${url}`
            default:
                return url.startsWith('http') ? url : `https://${url}`
        }
    }

    // ── Convenience: connectLinks computed helper ─────────────────────────────
    // Builds the full links array from owner data, preferring owner.links (full)
    // over owner.social_links (partial flat object) for future-proofing.
    const resolveConnectLinks = (owner) => {
        if (!owner) return []
        if (owner.links?.length) return owner.links
        // Fallback for older API responses that only expose social_links
        if (owner.social_links) {
            return Object.entries(owner.social_links)
                .filter(([, url]) => url)
                .map(([platform, url]) => ({ platform, url, label: getPlatformLabel(platform) }))
        }
        return []
    }

    return {
        getDeviconClass,
        getLucideIcon,
        getPlatformLabel,
        getPlatformDescription,
        buildPlatformUrl,
        resolveConnectLinks,
    }
}
