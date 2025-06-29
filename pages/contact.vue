<template>
    <div class="min-h-screen bg-white dark:bg-gray-900">
      <!-- Hero Section -->
      <section class="relative py-20 bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20 overflow-hidden">
        <!-- Background Elements -->
        <div class="absolute inset-0 pointer-events-none">
          <div class="absolute top-20 left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
          <div class="absolute bottom-20 right-10 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl animate-float-delayed"></div>
        </div>
  
        <div class="relative max-w-4xl mx-auto px-6 text-center">
          <h1 class="text-5xl lg:text-6xl font-bold mb-6 animate-slide-up">
            <span class="text-gray-900 dark:text-white">Let's</span>
            <span class="block bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
              Work Together
            </span>
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto animate-slide-up-delayed">
            Ready to bring your ideas to life? I'm always excited to discuss new projects and collaboration opportunities.
          </p>
        </div>
      </section>
  
      <!-- Contact Form Section -->
    <section class="py-20">
      <div class="max-w-6xl mx-auto px-6">
        <div class="grid lg:grid-cols-2 gap-12 items-start">
        
        <!-- Contact Form -->
        <div class="animate-slide-up">
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-blue-100 dark:border-gray-700 p-8">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <div class="w-6 h-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg mr-3"></div>
            Send Message
            </h2>
  
            <form @submit.prevent="submitForm" class="space-y-6">
            <!-- Name Field -->
            <div class="space-y-2">
              <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Full Name
              </label>
              <div class="relative">
                <input 
                id="name"
                v-model="form.name" 
                type="text" 
                required
                :disabled="loading"
                class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                placeholder="Enter your full name"
                >
                <div class="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10 opacity-0 focus-within:opacity-100 transition-opacity duration-200 pointer-events-none"></div>
              </div>
            </div>
  
            <!-- Email Field -->
            <div class="space-y-2">
              <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email Address
              </label>
              <div class="relative">
                <input 
                id="email"
                v-model="form.email" 
                type="email" 
                required
                :disabled="loading"
                class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                placeholder="Enter your email address"
                >
                <div class="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10 opacity-0 focus-within:opacity-100 transition-opacity duration-200 pointer-events-none"></div>
              </div>
            </div>
  
            <!-- Message Field -->
            <div class="space-y-2">
              <label for="message" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Message
              </label>
              <div class="relative">
                <textarea 
                id="message"
                v-model="form.message" 
                rows="5" 
                required
                :disabled="loading"
                class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none"
                placeholder="Tell me about your project or idea..."
                ></textarea>
                <div class="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10 opacity-0 focus-within:opacity-100 transition-opacity duration-200 pointer-events-none"></div>
              </div>
            </div>
  
            <!-- Submit Button -->
            <button 
              type="submit" 
              :disabled="loading"
              class="w-full relative px-6 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 disabled:scale-100 hover:shadow-xl disabled:shadow-none flex items-center justify-center space-x-2 overflow-hidden group"
            >
              <span v-if="!loading" class="relative z-10">Send Message</span>
              <span v-else class="relative z-10">Sending...</span>
              
              <!-- Loading Spinner -->
              <div v-if="loading" class="relative z-10">
                <div class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              </div>
              
              <!-- Send Icon -->
              <svg v-else class="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" 
                 fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
              </svg>
              
              <!-- Hover Effect -->
              <div class="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
  
            <!-- Success Message -->
            <div v-if="success" class="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-700 rounded-xl animate-fade-in">
              <div class="flex items-center space-x-3">
                <div class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                </div>
                <p class="text-green-800 dark:text-green-200 font-medium">Message sent successfully! I'll get back to you soon.</p>
              </div>
            </div>
  
            <!-- Error Message -->
            <div v-if="error" class="p-4 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 border border-red-200 dark:border-red-700 rounded-xl animate-fade-in">
              <div class="flex items-center space-x-3">
                <div class="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
                </div>
                <p class="text-red-800 dark:text-red-200 font-medium">Error: {{ error }}</p>
              </div>
            </div>
            </form>
          </div>
        </div>
  
        <!-- Contact Info -->
        <div class="space-y-8 animate-slide-up-delayed">
          
          <!-- Contact Methods -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-blue-100 dark:border-gray-700 p-8">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <div class="w-5 h-5 bg-gradient-to-r from-cyan-400 to-blue-400 rounded mr-3"></div>
            Get In Touch
            </h3>
            
            <div class="space-y-4">
            <!-- Email -->
            <!-- Email -->
<a v-if="ownerStore.owner?.contact_methods?.email" 
   :href="getContactUrl('email', ownerStore.owner.contact_methods.email)"
   class="flex items-center space-x-4 p-4 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 dark:hover:from-blue-900/20 dark:hover:to-cyan-900/20 transition-all duration-300 group">
              <div class="w-12 h-12 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/40 dark:to-cyan-900/40 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </div>
              <div>
                <div class="font-medium text-gray-900 dark:text-white">Email</div>
                <div class="text-gray-600 dark:text-gray-400">{{ ownerStore.owner.contact_methods.email }}</div>
              </div>
            </a>
  
            <!-- WhatsApp -->
            <a v-if="ownerStore.owner?.contact_methods?.whatsapp" 
   :href="getContactUrl('whatsapp', ownerStore.owner.contact_methods.whatsapp)"
   target="_blank"
   class="flex items-center space-x-4 p-4 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 dark:hover:from-blue-900/20 dark:hover:to-cyan-900/20 transition-all duration-300 group">
              <div class="w-12 h-12 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/40 dark:to-emerald-900/40 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <svg class="w-6 h-6 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
              </div>
              <div>
                <div class="font-medium text-gray-900 dark:text-white">WhatsApp</div>
                <div class="text-gray-600 dark:text-gray-400">{{ ownerStore.owner.contact_methods.whatsapp }}</div>
              </div>
            </a>
  
            <!-- Phone -->
             <!-- Phone -->
<a v-if="ownerStore.owner?.contact_methods?.phone" 
   :href="getContactUrl('phone', ownerStore.owner.contact_methods.phone)"
   class="flex items-center space-x-4 p-4 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 dark:hover:from-blue-900/20 dark:hover:to-cyan-900/20 transition-all duration-300 group">
              <div class="w-12 h-12 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/40 dark:to-pink-900/40 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <svg class="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
              </div>
              <div>
                <div class="font-medium text-gray-900 dark:text-white">Phone</div>
                <div class="text-gray-600 dark:text-gray-400">{{ ownerStore.owner.contact_methods.phone }}</div>
              </div>
            </a>
  
            <!-- Availability Status -->
            <div class="flex items-center space-x-4 p-4 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 dark:hover:from-blue-900/20 dark:hover:to-cyan-900/20 transition-all duration-300 group">
              <div class="w-12 h-12 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/40 dark:to-cyan-900/40 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <div class="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <div>
                <div class="font-medium text-gray-900 dark:text-white">Status</div>
                <div class="text-gray-600 dark:text-gray-400">Available for new projects</div>
              </div>
            </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
    </div>
  </template>
  
  <script setup>
  import { reactive, ref } from 'vue'
  import { useRuntimeConfig } from '#app'
  import { useHead } from '#app'
  import { useOwnerStore } from '~~/stores/ownerStore'
  
  const ownerStore = useOwnerStore()
  
  // SEO
  useHead({
    title: 'Contact - Portfolio',
    meta: [
      { name: 'description', content: 'Get in touch for project collaborations, freelance work, or just to say hello. I\'m always excited to discuss new opportunities.' }
    ]
  })
  
  const form = reactive({
    name: '',
    email: '',
    message: ''
  })
  
  const loading = ref(false)
  const success = ref(false)
  const error = ref(null)
  
  async function submitForm() {
    loading.value = true
    success.value = false
    error.value = null
  
    const config = useRuntimeConfig()
    try {
      const response = await $fetch(`${config.public.apiBaseUrl}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      })
      
      if (response.success) {
        success.value = true
        Object.assign(form, { name: '', email: '', message: '' })
      } else {
        throw new Error(response.message || 'Failed to send message')
      }
    } catch (e) {
      console.error('Contact form submission failed:', e)
      error.value = e.message || 'Failed to send message'
    } finally {
      loading.value = false
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
  
  @keyframes slide-up {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes slide-up-delayed {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  .animate-float { animation: float 6s ease-in-out infinite; }
  .animate-float-delayed { animation: float-delayed 8s ease-in-out infinite; }
  .animate-slide-up { animation: slide-up 0.8s ease-out; }
  .animate-slide-up-delayed { animation: slide-up-delayed 0.8s ease-out 0.2s both; }
  .animate-fade-in { animation: fade-in 0.5s ease-out; }
  </style>
  