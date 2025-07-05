<template>
  <div class="min-h-screen bg-white dark:bg-gray-900">
    <!-- Hero Section -->
    <section class="relative py-12 md:py-20 bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20 overflow-hidden">
      <!-- Background Elements -->
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute top-20 left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
        <div class="absolute bottom-20 right-10 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl animate-float-delayed"></div>
      </div>

      <div class="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 animate-slide-up">
          <span class="text-gray-900 dark:text-white">Let's</span>
          <span class="block bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
            Work Together
          </span>
        </h1>
        <p class="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto animate-slide-up-delayed">
          Ready to bring your ideas to life? I'm always excited to discuss new projects and collaboration opportunities.
        </p>
      </div>
    </section>

    <!-- Contact Form Section - Enhanced Mobile Layout -->
    <section class="py-12 md:py-20">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <div class="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
        
          <!-- Contact Form - Mobile Optimized -->
          <div class="order-2 lg:order-1 animate-slide-up">
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-blue-100 dark:border-gray-700 p-6 md:p-8">
              <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <div class="w-6 h-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg mr-3 animate-pulse"></div>
                Send Message
              </h2>

              <form @submit.prevent="submitForm" class="space-y-4 md:space-y-6">
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
                      autocomplete="name"
                      :disabled="loading"
                      class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-base"
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
                      autocomplete="email" 
                      type="email" 
                      required
                      :disabled="loading"
                      class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-base"
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
                      class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none text-base"
                      placeholder="Tell me about your project or idea..."
                    ></textarea>
                    <div class="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10 opacity-0 focus-within:opacity-100 transition-opacity duration-200 pointer-events-none"></div>
                  </div>
                </div>

                <!-- Submit Button - Mobile Optimized -->
                <button 
                  type="submit" 
                  :disabled="loading"
                  class="w-full relative px-6 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 disabled:scale-100 hover:shadow-xl disabled:shadow-none flex items-center justify-center space-x-2 overflow-hidden group text-base"
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
                    <div class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                      <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                      </svg>
                    </div>
                    <p class="text-green-800 dark:text-green-200 font-medium text-sm md:text-base">Message sent successfully! I'll get back to you soon.</p>
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
                    <p class="text-red-800 dark:text-red-200 font-medium text-sm md:text-base">Error: {{ error }}</p>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <!-- Contact Info - Mobile Optimized -->
          <div class="order-1 lg:order-2 space-y-6 md:space-y-8 animate-slide-up-delayed">
            
            <!-- Contact Methods -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-blue-100 dark:border-gray-700 p-6 md:p-8">
              <h3 class="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6 flex items-center">
                <div class="w-5 h-5 bg-gradient-to-r from-cyan-400 to-blue-400 rounded mr-3 animate-pulse"></div>
                Get In Touch
              </h3>
              
              <div class="space-y-3 md:space-y-4">
                <!-- Email -->
                <a v-if="ownerStore.owner?.contact_methods?.email" 
                   :href="getContactUrl('email', ownerStore.owner.contact_methods.email)"
                   class="flex items-center space-x-3 md:space-x-4 p-3 md:p-4 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 dark:hover:from-blue-900/20 dark:hover:to-cyan-900/20 transition-all duration-300 group">
                  <div class="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/40 dark:to-cyan-900/40 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200 flex-shrink-0">
                    <svg class="w-5 h-5 md:w-6 md:h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                  </div>
                  <div class="min-w-0 flex-1">
                    <div class="font-medium text-gray-900 dark:text-white text-sm md:text-base">Email</div>
                    <div class="text-gray-600 dark:text-gray-400 text-xs md:text-sm truncate">{{ ownerStore.owner.contact_methods.email }}</div>
                  </div>
                </a>

                <!-- WhatsApp -->
                <a v-if="ownerStore.owner?.contact_methods?.whatsapp" 
                   :href="getContactUrl('whatsapp', ownerStore.owner.contact_methods.whatsapp)"
                   target="_blank"
                   class="flex items-center space-x-3 md:space-x-4 p-3 md:p-4 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 dark:hover:from-blue-900/20 dark:hover:to-cyan-900/20 transition-all duration-300 group">
                  <div class="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/40 dark:to-emerald-900/40 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200 flex-shrink-0">
                    <svg class="w-5 h-5 md:w-6 md:h-6 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                  </div>
                  <div class="min-w-0 flex-1">
                    <div class="font-medium text-gray-900 dark:text-white text-sm md:text-base">WhatsApp</div>
                    <div class="text-gray-600 dark:text-gray-400 text-xs md:text-sm truncate">{{ ownerStore.owner.contact_methods.whatsapp }}</div>
                  </div>
                </a>

                <!-- Phone -->
                <a v-if="ownerStore.owner?.contact_methods?.phone" 
                   :href="getContactUrl('phone', ownerStore.owner.contact_methods.phone)"
                   class="flex items-center space-x-3 md:space-x-4 p-3 md:p-4 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 dark:hover:from-blue-900/20 dark:hover:to-cyan-900/20 transition-all duration-300 group">
                  <div class="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/40 dark:to-pink-900/40 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200 flex-shrink-0">
                    <svg class="w-5 h-5 md:w-6 md:h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                    </svg>
                  </div>
                  <div class="min-w-0 flex-1">
                    <div class="font-medium text-gray-900 dark:text-white text-sm md:text-base">Phone</div>
                    <div class="text-gray-600 dark:text-gray-400 text-xs md:text-sm truncate">{{ ownerStore.owner.contact_methods.phone }}</div>
                  </div>
                </a>

                <!-- Other contact methods -->
                <template v-for="(value, method) in ownerStore.owner?.contact_methods" :key="method">
                  <a
                    v-if="['email', 'phone', 'whatsapp'].indexOf(method) === -1 && value"
                    :href="getContactUrl(method, value)"
                    target="_blank"
                    class="flex items-center space-x-3 md:space-x-4 p-3 md:p-4 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 dark:hover:from-blue-900/20 dark:hover:to-cyan-900/20 transition-all duration-300 group"
                  >
                    <div
                      class="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200 flex-shrink-0"
                      :class="{
                        'bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/40 dark:to-cyan-900/40': method === 'telegram',
                        'bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700/40 dark:to-gray-800/40': method === 'skype',
                        'bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/40 dark:to-purple-900/40': method === 'discord',
                        'bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/40 dark:to-orange-900/40': true // fallback
                      }"
                    >
                      <svg v-if="method === 'telegram'" class="w-5 h-5 md:w-6 md:h-6 text-blue-500 dark:text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9.04 12.34l-.36 3.18c.52 0 .75-.22 1.03-.48l2.48-2.36 5.14 3.75c.94.52 1.62.25 1.86-.87l3.38-15.84c.31-1.44-.52-2-1.44-1.7L1.7 9.36c-1.4.56-1.38 1.36-.24 1.7l4.08 1.28 9.48-5.98c.45-.28.87-.13.53.18"/>
                      </svg>
                      <svg v-else-if="method === 'skype'" class="w-5 h-5 md:w-6 md:h-6 text-gray-500 dark:text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12c0 5.52 4.48 10 10 10s10-4.48 10-10c0-5.52-4.48-10-10-10zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 1.1-.9 2-2 2-.55 0-1 .45-1 1v1h2v-1c0-.55.45-1 1-1s1 .45 1 1c0 2.21-1.79 4-4 4s-4-1.79-4-4h-2c0 3.31 2.69 6 6 6s6-2.69 6-6-2.69-6-6-6z"/>
                      </svg>
                      <svg v-else-if="method === 'discord'" class="w-5 h-5 md:w-6 md:h-6 text-indigo-500 dark:text-indigo-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.317 4.369A19.791 19.791 0 0016.885 3.1a.074.074 0 00-.079.037c-.34.607-.719 1.396-.984 2.013a18.524 18.524 0 00-5.456 0 12.51 12.51 0 00-.997-2.013.077.077 0 00-.079-.037C.533 9.093-.32 13.579.099 18.057a.08.08 0 00.031.056c1.726 1.263 3.405 2.022 5.077 2.522a.077.077 0 00.084-.027c.391-.537.74-1.104 1.045-1.684a.076.076 0 00-.041-.104c-.552-.21-1.077-.463-1.588-.747a.077.077 0 00-.031-.128c.107-.08.214-.163.316-.25a.074.074 0 00.077-.01c3.304 1.507 6.872 1.507 10.146 0a.073.073 0 00.078.009c.102.087.209.17.316.25a.077.077 0 00-.007.128c-.511.284-1.036.537-1.588.747a.076.076 0 00-.041.104c.305.584.654 1.147 1.045 1.684a.076.076 0 00.084.027c1.672-.5 3.351-1.259 5.077-2.522a.077.077 0 00.031-.056zM8.02 15.331c-1.004 0-1.823-.92-1.823-2.051 0-1.13.807-2.051 1.823-2.051 1.025 0 1.832.93 1.823 2.051 0 1.13-.807 2.051-1.823 2.051zm7.974 0c-1.004 0-1.823-.92-1.823-2.051 0-1.13.807-2.051 1.823-2.051 1.025 0 1.832.93 1.823 2.051 0 1.13-.807 2.051-1.823 2.051z"/>
                      </svg>
                      <svg v-else class="w-5 h-5 md:w-6 md:h-6 text-yellow-500 dark:text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10"/>
                        <text x="12" y="16" text-anchor="middle" font-size="10" fill="white">{{ method.charAt(0).toUpperCase() }}</text>
                      </svg>
                    </div>
                    <div class="min-w-0 flex-1">
                      <div class="font-medium text-gray-900 dark:text-white text-sm md:text-base">{{ method.charAt(0).toUpperCase() + method.slice(1) }}</div>
                      <div class="text-gray-600 dark:text-gray-400 text-xs md:text-sm truncate">{{ value }}</div>
                    </div>
                  </a>
                </template>

                <!-- Availability Status -->
                <div class="flex items-center space-x-3 md:space-x-4 p-3 md:p-4 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 dark:hover:from-blue-900/20 dark:hover:to-cyan-900/20 transition-all duration-300 group">
                  <div class="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/40 dark:to-cyan-900/40 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200 flex-shrink-0">
                    <div class="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                  <div class="min-w-0 flex-1">
                    <div class="font-medium text-gray-900 dark:text-white text-sm md:text-base">Status</div>
                    <div class="text-gray-600 dark:text-gray-400 text-xs md:text-sm">Available for new projects</div>
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
    const response = await fetch(`${config.public.apiBaseUrl}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    })
    
    const result = await response.json()
    if (result.success) {
      success.value = true
      Object.assign(form, { name: '', email: '', message: '' })
    } else {
      throw new Error(result.message || 'Failed to send message')
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

/* Mobile-specific improvements */
@media (max-width: 640px) {
  .truncate {
    max-width: 150px;
  }
}

@media (max-width: 768px) {
  .truncate {
    max-width: 200px;
  }
}
</style>