<template>
  <div class="min-h-screen bg-white dark:bg-gray-900">
    <!-- Hero Section -->
    <section class="relative py-20 bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20 overflow-hidden">
      <!-- Background Elements -->
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute top-20 left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
        <div class="absolute bottom-20 right-10 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl animate-float-delayed"></div>
      </div>

      <div class="relative max-w-6xl mx-auto px-6">
        <div v-if="ownerStore.loading" class="text-center animate-pulse">
          <div class="w-40 h-40 mx-auto mb-8 relative">
            <img 
              src="/images/default_avatar.png" 
              alt="Loading..."
              class="w-full h-full rounded-full object-cover opacity-50"
            >
          </div>
          <div class="h-12 bg-gray-300 dark:bg-gray-700 rounded-lg mb-4 max-w-md mx-auto"></div>
          <div class="h-6 bg-gray-300 dark:bg-gray-700 rounded mb-2 max-w-lg mx-auto"></div>
        </div>

        <div v-else-if="ownerStore.owner" class="text-center animate-fade-in">
          <!-- Avatar -->
          <div class="relative inline-block mb-8">
            <div class="relative w-40 h-40 mx-auto group">
              <img :src="ownerStore.owner.avatar || '/images/default_avatar.png'" :alt="ownerStore.owner.name"
                class="w-full h-full rounded-full object-cover shadow-2xl border-4 border-white dark:border-gray-800 group-hover:scale-105 transition-transform duration-500"
              >
              <div class="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500/20 to-cyan-500/20 group-hover:from-blue-500/30 group-hover:to-cyan-500/30 transition-all duration-500"></div>
              <div class="absolute inset-0 rounded-full border-4 border-blue-400/30 animate-ping"></div>
            </div>
          </div>

          <!-- Name & Headline -->
          <h1 class="text-5xl lg:text-6xl font-bold mb-4">
            <span class="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
              {{ ownerStore.owner.name }}
            </span>
          </h1>
          <p class="text-2xl text-gray-600 dark:text-gray-300 font-light mb-8">
            {{ ownerStore.owner.headline }}
          </p>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <section v-if="ownerStore.owner" class="py-20">
      <div class="max-w-6xl mx-auto px-6">
        <div class="grid lg:grid-cols-3 gap-12">
          
          <!-- Bio Section -->
          <div class="lg:col-span-2 space-y-8">
            <div class="animate-slide-up">
              <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg mr-3"></div>
                About Me
              </h2>
              <div class="prose prose-lg dark:prose-invert max-w-none">
                <p class="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                  {{ ownerStore.owner.bio }}
                </p>
              </div>
            </div>

            <!-- Professional Journey -->
            <div v-if="ownerStore.owner.professional_journey?.length" class="animate-slide-up-delayed">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <div class="w-6 h-6 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-md mr-3"></div>
                Professional Journey
              </h3>
              <div class="space-y-6">
                <div 
                  v-for="(job, index) in ownerStore.owner.professional_journey" 
                  :key="index"
                  class="relative pl-8 border-l-2 border-blue-100 dark:border-blue-800"
                >
                  <div class="absolute -left-2 top-0 w-4 h-4 rounded-full"
                       :class="job.is_current ? 'bg-gradient-to-r from-green-500 to-emerald-500 animate-pulse' : 'bg-gradient-to-r from-blue-500 to-cyan-500'"></div>
                  <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-blue-100 dark:border-gray-700">
                    <div class="flex items-start justify-between mb-2">
                      <h4 class="font-semibold text-gray-900 dark:text-white">{{ job.position }}</h4>
                      <span v-if="job.is_current" class="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 text-xs rounded-full">
                        Current
                      </span>
                    </div>
                    <p class="text-blue-600 dark:text-blue-400 font-medium mb-1">{{ job.company }}</p>
                    <p class="text-gray-600 dark:text-gray-400 text-sm mb-3">{{ job.period }}</p>
                    <p class="text-gray-700 dark:text-gray-300">{{ job.description }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="space-y-8">
            
            <!-- Tech Stack -->
            <div class="animate-slide-up">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <div class="w-5 h-5 bg-gradient-to-r from-blue-400 to-cyan-400 rounded mr-2"></div>
                Tech Stack
              </h3>
              <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-blue-100 dark:border-gray-700">
                <div class="space-y-4">
                  <div 
                    v-for="(tech, index) in ownerStore.owner.tech_stack" 
                    :key="tech.technology"
                    :style="{ animationDelay: `${index * 0.1}s` }"
                    class="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-lg border border-blue-200 dark:border-blue-700 animate-fade-in-up"
                  >
                    <div class="flex-1">
                      <div class="font-medium text-blue-800 dark:text-blue-200">{{ tech.technology }}</div>
                      <div v-if="tech.years_experience" class="text-xs text-gray-600 dark:text-gray-400">
                        {{ tech.years_experience }} year{{ tech.years_experience > 1 ? 's' : '' }} experience
                      </div>
                    </div>
                    <div v-if="tech.rating" class="flex items-center space-x-1">
                      <span v-for="i in 5" :key="i" 
                            :class="i <= tech.rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'"
                            class="text-sm">★</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Expertise Areas -->
            <div v-if="ownerStore.owner.expertise_areas?.length" class="animate-slide-up">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <div class="w-5 h-5 bg-gradient-to-r from-emerald-400 to-teal-400 rounded mr-2"></div>
                Expertise Areas
              </h3>
              <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-blue-100 dark:border-gray-700">
                <div class="space-y-3">
                  <div 
                    v-for="(area, index) in ownerStore.owner.expertise_areas" 
                    :key="area.area"
                    :style="{ animationDelay: `${index * 0.1}s` }"
                    class="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/30 dark:to-teal-900/30 rounded-lg border border-emerald-200 dark:border-emerald-700 animate-fade-in-up"
                  >
                    <div class="flex items-center space-x-3">
                      <div class="w-3 h-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"></div>
                      <span class="font-medium text-emerald-800 dark:text-emerald-200">{{ area.area }}</span>
                    </div>
                    <div v-if="area.level" class="text-sm text-gray-600 dark:text-gray-400 capitalize">
                      {{ area.level }}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Languages -->
            <div v-if="ownerStore.owner.languages?.length" class="animate-slide-up-delayed">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <div class="w-5 h-5 bg-gradient-to-r from-cyan-400 to-blue-400 rounded mr-2"></div>
                Languages
              </h3>
              <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-blue-100 dark:border-gray-700">
                <div class="space-y-3">
                  <div 
                    v-for="(language, index) in ownerStore.owner.languages" 
                    :key="language.language"
                    :style="{ animationDelay: `${index * 0.1}s` }"
                    class="flex items-center justify-between animate-fade-in-up"
                  >
                    <div class="flex items-center space-x-3">
                      <div class="w-2 h-2 rounded-full"
                           :class="language.is_native ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gradient-to-r from-blue-500 to-cyan-500'"></div>
                      <span class="text-gray-700 dark:text-gray-300 font-medium">{{ language.language }}</span>
                    </div>
                    <div class="flex items-center space-x-2">
                      <span class="text-sm text-gray-500 dark:text-gray-400 capitalize">{{ language.proficiency }}</span>
                      <span v-if="language.is_native" class="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 text-xs rounded-full">
                        Native
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Hobbies & Interests -->
            <div v-if="ownerStore.owner.hobbies?.length" class="animate-slide-up-delayed">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <div class="w-5 h-5 bg-gradient-to-r from-purple-400 to-pink-400 rounded mr-2"></div>
                Hobbies & Interests
              </h3>
              <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-blue-100 dark:border-gray-700">
                <div class="space-y-3">
                  <div 
                    v-for="(hobby, index) in ownerStore.owner.hobbies" 
                    :key="hobby.name"
                    :style="{ animationDelay: `${index * 0.1}s` }"
                    class="flex items-center space-x-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg border border-purple-200 dark:border-purple-700 hover:shadow-md transition-all duration-300 animate-fade-in-up"
                  >
                    <div class="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span class="text-white text-lg">{{ hobby.icon || '🎯' }}</span>
                    </div>
                    <div class="flex-1">
                      <div class="font-medium text-gray-900 dark:text-white">{{ hobby.name }}</div>
                      <div v-if="hobby.description" class="text-sm text-gray-600 dark:text-gray-400 mt-1">{{ hobby.description }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Connect -->
            <div class="animate-slide-up-delayed">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <div class="w-5 h-5 bg-gradient-to-r from-cyan-400 to-blue-400 rounded mr-2"></div>
                Connect
              </h3>
              <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-blue-100 dark:border-gray-700">
                <div class="space-y-3">
                  <!-- Social Links -->
                  <a 
                    v-for="(url, platform) in ownerStore.owner.social_links" 
                    :key="platform"
                    v-show="url"
                    :href="getPlatformUrl(platform, url)" 
                    target="_blank"
                    class="flex items-center space-x-3 p-3 rounded-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 dark:hover:from-blue-900/20 dark:hover:to-cyan-900/20 transition-all duration-300 group animate-fade-in-up"
                  >
                    <div class="w-8 h-8 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/40 dark:to-cyan-900/40 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                      <span class="text-blue-600 dark:text-blue-400 text-sm" v-html="getPlatformIcon(platform)"></span>
                    </div>
                    <div class="flex-1">
                      <div class="font-medium text-gray-900 dark:text-white capitalize">{{ getPlatformLabel(platform) }}</div>
                      <div class="text-sm text-gray-500 dark:text-gray-400">{{ getPlatformDescription(platform) }}</div>
                    </div>
                    <div class="ml-auto">
                      <svg class="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                      </svg>
                    </div>
                  </a>

                  <!-- Contact Methods -->
                  <div v-if="ownerStore.owner.contact_methods && Object.values(ownerStore.owner.contact_methods).some(v => v)" class="border-t pt-4 mt-4">
                    <h4 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Direct Contact</h4>
                    <a 
                      v-for="(value, method) in ownerStore.owner.contact_methods" 
                      :key="method"
                      v-show="value"
                      :href="getContactUrl(method, value)" 
                      target="_blank"
                      class="flex items-center space-x-3 p-3 rounded-lg hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 dark:hover:from-green-900/20 dark:hover:to-emerald-900/20 transition-all duration-300 group animate-fade-in-up"
                    >
                      <div class="w-8 h-8 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/40 dark:to-emerald-900/40 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                        <span class="text-green-600 dark:text-green-400 text-sm" v-html="getContactIcon(method)"></span>
                      </div>
                      <div class="flex-1">
                        <div class="font-medium text-gray-900 dark:text-white capitalize">{{ getContactLabel(method) }}</div>
                        <div class="text-sm text-gray-500 dark:text-gray-400">{{ getContactDescription(method) }}</div>
                      </div>
                      <div class="ml-auto">
                        <svg class="w-4 h-4 text-gray-400 group-hover:text-green-500 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                        </svg>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <!-- Status -->
            <div class="animate-slide-up-delayed">
              <div class="bg-gradient-to-r from-blue-600 to-cyan-600 p-6 rounded-xl text-white">
                <div class="flex items-center space-x-3 mb-3">
                  <div class="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span class="font-semibold">Available for Projects</span>
                </div>
                <p class="text-blue-100 text-sm">
                  Currently accepting new freelance projects and collaboration opportunities.
                </p>
                <NuxtLink 
                  to="/contact"
                  class="inline-flex items-center mt-4 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors duration-200"
                >
                  Get In Touch
                  <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                  </svg>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useOwnerStore } from '~/stores/ownerStore'

const ownerStore = useOwnerStore()

// Initialize head with default values
const headData = ref({
  title: 'About - Portfolio',
  meta: [
    { name: 'description', content: 'Learn more about my background, skills, and professional journey as a full-stack developer.' }
  ]
})

const { data } = useHead(headData)

onMounted(async () => {
  await ownerStore.fetchOwner()
  
  // Only update head data if owner exists and has required properties
  if (ownerStore.owner && ownerStore.owner.name && ownerStore.owner.bio) {
    headData.value.title = `About ${ownerStore.owner.name} - ${ownerStore.owner.headline || 'Portfolio'}`
    
    // Safely handle bio substring with proper checks
    const bioDescription = ownerStore.owner.bio && ownerStore.owner.bio.length > 160 
      ? `${ownerStore.owner.bio.substring(0, 160)}...`
      : ownerStore.owner.bio || 'Learn more about my background, skills, and professional journey.'
    
    headData.value.meta[0].content = `Learn more about ${ownerStore.owner.name} - ${bioDescription}`
  }
})

const getPlatformUrl = (platform, url) => {
const defaultMessage = `Hi! I found your profile and would like to connect with you regarding potential collaboration opportunities.`

if (!url || typeof url !== 'string') return ''

switch (platform) {
  case 'whatsapp':
    return `https://wa.me/${url.replace(/[^\d]/g, '')}?text=${encodeURIComponent(defaultMessage)}`
  case 'telegram':
    return `https://t.me/${url.replace('@', '')}`
  case 'twitter':
    return `https://twitter.com/messages/compose?recipient_id=${url}&text=${encodeURIComponent(defaultMessage)}`
  case 'instagram':
    return url.includes('instagram.com') ? url : `https://instagram.com/${url}`
  case 'linkedin':
    return url.includes('linkedin.com') ? url : `https://linkedin.com/in/${url}`
  case 'github':
    return url.includes('github.com') ? url : `https://github.com/${url || ''}`
  case 'discord':
    return `https://discord.com/users/${url}`
  case 'skype':
    return `skype:${url}?chat`
  case 'facebook':
    return `https://m.me/${url}`
  case 'youtube':
    return url.includes('youtube.com') ? url : `https://youtube.com/@${url}`
  case 'tiktok':
    return url.includes('tiktok.com') ? url : `https://tiktok.com/@${url}`
  case 'snapchat':
    return `https://snapchat.com/add/${url}`
  case 'pinterest':
    return url.includes('pinterest.com') ? url : `https://pinterest.com/${url}`
  case 'reddit':
    return url.includes('reddit.com') ? url : `https://reddit.com/u/${url}`
  case 'medium':
    return url.includes('medium.com') ? url : `https://medium.com/@${url}`
  case 'behance':
    return url.includes('behance.net') ? url : `https://behance.net/${url}`
  case 'dribbble':
    return url.includes('dribbble.com') ? url : `https://dribbble.com/${url}`
  default:
    return url
}
}

// Contact URL generators
const getContactUrl = (method, value) => {
const defaultMessage = `Hi! I'd like to discuss potential collaboration opportunities with you.`

if (!value || typeof value !== 'string') return ''

switch (method) {
  case 'email':
    return `mailto:${value}?subject=Collaboration Opportunity&body=${encodeURIComponent(defaultMessage)}`
  case 'phone':
    return `tel:${value}`
  case 'whatsapp':
    return `https://wa.me/${value.replace(/[^\d]/g, '')}?text=${encodeURIComponent(defaultMessage)}`
  case 'telegram':
    return `https://t.me/${value.replace('@', '')}`
  case 'skype':
    return `skype:${value}?chat`
  case 'discord':
    return `https://discord.com/users/${value}`
  default:
    return `mailto:${value}`
}
}

// Platform icons
const getPlatformIcon = (platform) => {
const icons = {
  github: '🐙',
  linkedin: '💼',
  twitter: '🐦',
  instagram: '📷',
  facebook: '📘',
  youtube: '📺',
  tiktok: '🎵',
  snapchat: '👻',
  pinterest: '📌',
  reddit: '🤖',
  medium: '📝',
  behance: '🎨',
  dribbble: '🏀',
  discord: '🎮',
  telegram: '✈️',
  whatsapp: '💬',
  skype: '☎️',
  website: '🌐',
  portfolio: '💼',
  blog: '📝',
  other: '🔗'
}
return icons[platform] || '🔗'
}

// Contact icons
const getContactIcon = (method) => {
const icons = {
  email: '✉️',
  phone: '📞',
  whatsapp: '💬',
  telegram: '✈️',
  skype: '☎️',
  discord: '🎮'
}
return icons[method] || '📞'
}

// Platform labels
const getPlatformLabel = (platform) => {
const labels = {
  github: 'GitHub',
  linkedin: 'LinkedIn',
  twitter: 'Twitter/X',
  instagram: 'Instagram',
  facebook: 'Facebook',
  youtube: 'YouTube',
  tiktok: 'TikTok',
  snapchat: 'Snapchat',
  pinterest: 'Pinterest',
  reddit: 'Reddit',
  medium: 'Medium',
  behance: 'Behance',
  dribbble: 'Dribbble',
  discord: 'Discord',
  telegram: 'Telegram',
  whatsapp: 'WhatsApp',
  skype: 'Skype',
  website: 'Website',
  portfolio: 'Portfolio',
  blog: 'Blog'
}
return labels[platform] || platform.charAt(0).toUpperCase() + platform.slice(1)
}

// Contact labels
const getContactLabel = (method) => {
const labels = {
  email: 'Email',
  phone: 'Phone',
  whatsapp: 'WhatsApp',
  telegram: 'Telegram',
  skype: 'Skype',
  discord: 'Discord'
}
return labels[method] || method.charAt(0).toUpperCase() + method.slice(1)
}

// Platform descriptions
const getPlatformDescription = (platform) => {
const descriptions = {
  github: 'View code repositories',
  linkedin: 'Professional network',
  twitter: 'Follow updates',
  instagram: 'Visual content',
  facebook: 'Social updates',
  youtube: 'Video content',
  tiktok: 'Short videos',
  snapchat: 'Quick messages',
  pinterest: 'Visual inspiration',
  reddit: 'Community discussions',
  medium: 'Articles & blogs',
  behance: 'Creative portfolio',
  dribbble: 'Design showcase',
  discord: 'Gaming & chat',
  telegram: 'Messaging',
  whatsapp: 'Instant messaging',
  skype: 'Video calls',
  website: 'Personal website',
  portfolio: 'Work showcase',
  blog: 'Written content'
}
return descriptions[platform] || 'Connect here'
}

// Contact descriptions
const getContactDescription = (method) => {
const descriptions = {
  email: 'Send an email',
  phone: 'Call directly',
  whatsapp: 'Chat instantly',
  telegram: 'Message on Telegram',
  skype: 'Video call',
  discord: 'Gaming chat'
}
return descriptions[method] || 'Get in touch'
}
</script>

<style scoped>
@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
}

@keyframes float-delayed {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-30px) rotate(-180deg); }
  }
  
  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes slide-up {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes slide-up-delayed {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes fade-in-up {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .animate-float { animation: float 6s ease-in-out infinite; }
  .animate-float-delayed { animation: float-delayed 8s ease-in-out infinite; }
  .animate-fade-in { animation: fade-in 0.8s ease-out; }
  .animate-slide-up { animation: slide-up 0.8s ease-out; }
  .animate-slide-up-delayed { animation: slide-up-delayed 0.8s ease-out 0.2s both; }
  .animate-fade-in-up { animation: fade-in-up 0.6s ease-out both; }
  </style>