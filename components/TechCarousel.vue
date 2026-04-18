<template>
  <div class="w-full">
    <div class="relative">
      <!-- Carousel Container -->
      <div class="overflow-hidden">
        <div
          class="flex gap-3 transition-transform duration-500 ease-out"
          :style="{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }"
        >
          <div
            v-for="(tech, index) in techStack"
            :key="`carousel-${index}`"
            class="flex-shrink-0"
            :style="{ width: `${100 / itemsPerView}%` }"
          >
            <div
              class="group relative flex items-center justify-center gap-2 mx-1.5 px-4 py-2
                       h-full bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30
                       border border-blue-200 dark:border-blue-700 text-blue-800 dark:text-blue-200
                       rounded-full text-sm font-medium hover:scale-110 hover:shadow-xl hover:shadow-blue-500/25
                       transition-all duration-300 cursor-default"
            >
              <!-- Devicon -->
              <i
                v-if="getIconClass(tech.technology)"
                :class="getIconClass(tech.technology)"
                class="text-lg leading-none flex-shrink-0"
              ></i>
              <!-- Fallback icon -->
              <svg v-else class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                />
              </svg>
              <span class="truncate">{{ tech.technology }}</span>
              <span v-if="tech.rating" class="text-xs opacity-75 flex-shrink-0">{{ '★'.repeat(tech.rating) }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Navigation Buttons -->
      <button
        v-if="currentIndex > 0"
        @click="prevSlide"
        class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-10
                 w-8 h-8 flex items-center justify-center rounded-full
                 bg-blue-600 hover:bg-blue-700 text-white shadow-lg
                 transition-all duration-200 hover:scale-110"
        aria-label="Previous"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        v-if="currentIndex < maxIndex"
        @click="nextSlide"
        class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-10
                 w-8 h-8 flex items-center justify-center rounded-full
                 bg-blue-600 hover:bg-blue-700 text-white shadow-lg
                 transition-all duration-200 hover:scale-110"
        aria-label="Next"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <!-- Dot Indicators -->
      <div class="flex justify-center gap-1 mt-3">
        <button
          v-for="dot in dotsCount"
          :key="`dot-${dot}`"
          @click="currentIndex = dot - 1"
          class="w-2 h-2 rounded-full transition-all duration-300"
          :class="
            currentIndex === dot - 1
              ? 'bg-blue-600 w-6'
              : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400'
          "
          :aria-label="`Go to slide ${dot}`"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useTechnology } from '~/composables/useTechnology'

const props = defineProps({
  techStack: {
    type: Array,
    required: true,
  },
  itemsPerView: {
    type: Number,
    default: 2,
  },
})

const { getIconClass } = useTechnology()

const currentIndex = ref(0)

const maxIndex = computed(() => {
  return Math.max(0, Math.ceil(props.techStack.length / props.itemsPerView) - 1)
})

const dotsCount = computed(() => {
  return Math.ceil(props.techStack.length / props.itemsPerView)
})

const nextSlide = () => {
  if (currentIndex.value < maxIndex.value) {
    currentIndex.value++
  }
}

const prevSlide = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
  }
}
</script>
