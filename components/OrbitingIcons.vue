<template>
  <div ref="stageEl" class="orbit-stage" aria-hidden="true">
    <div v-for="(tech, k) in slotTechs" :key="`slot-${k}`" class="orbit-slot" :style="{
      animationDelay: `${-(k / props.count) * props.orbitDuration}s`,
      '--rot': `${rotDeg(k)}deg`,
      zIndex: slotZ[k] ?? 0,
    }">
      <Transition name="icon-swap" mode="out-in">
        <div :key="tech" class="icon-face" :style="faceDarkStyle"
          :class="{ 'icon-face--just-swapped': swappedSlots.has(k) }">
          <i v-if="getIconClass(tech)" :class="getIconClass(tech)" class="icon-glyph" />
          <img v-else-if="getCustomIconUrl(tech)" :src="getCustomIconUrl(tech)" :alt="tech" class="icon-img" />
          <span v-else class="icon-initials"
            :style="{ background: getColor(tech) || 'var(--color-blue-600, #d97706)' }">
            {{ tech.slice(0, 2).toUpperCase() }}
          </span>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive, watch, onMounted, onUnmounted } from 'vue'
import { useTechnology } from '~/composables/useTechnology'

const props = defineProps({
  techStack: { type: Array, required: true },
  count: { type: Number, default: 4 },
  orbitDuration: { type: Number, default: 15 },
  intervalMs: { type: Number, default: 3200 },
})

const { getIconClass, getCustomIconUrl, getColor } = useTechnology()

const techNames = computed(() =>
  props.techStack
    .map(t => (typeof t === 'string' ? t : (t.technology ?? t.name ?? '')))
    .filter(Boolean)
)

const rotDeg = (k) => (180 / props.count) * k

const X_AMP = 185
const Y_AMP = 70

// ── Dark mode — MutationObserver (Tailwind .dark) + matchMedia (OS) ──────────
const isDark = ref(false)

const faceDarkStyle = computed(() =>
  isDark.value
    ? {
      background: 'linear-gradient(135deg, color-mix(in srgb, var(--color-blue-900, #451a03) 30%, #1c1c1c), color-mix(in srgb, var(--color-cyan-600, #ea580c) 8%, #1c1c1c))',
      borderColor: 'color-mix(in srgb, var(--color-blue-600, #d97706) 45%, transparent)',
      boxShadow: '0 4px 14px rgba(0, 0, 0, 0.30)',
    }
    : {}
)

let themeObserver = null
let colorSchemeMedia = null

const syncDark = () => {
  isDark.value =
    document.documentElement.classList.contains('dark') ||
    window.matchMedia('(prefers-color-scheme: dark)').matches
}

// ── Slot state ────────────────────────────────────────────────────────────────
const slotTechs = ref([])
const slotZ = reactive({})
const swappedSlots = reactive(new Set())

let nextIndex = 0
let slotCursor = 0
let orbitStart = null
let swapTimer = null
let depthTimer = null

const initSlots = () => {
  const names = techNames.value
  if (!names.length) return
  const n = Math.min(props.count, names.length)
  slotTechs.value = names.slice(0, n)
  nextIndex = n % names.length
  orbitStart = Date.now()
}

const worldY = (k) => {
  if (!orbitStart) return 0
  const elapsed = (Date.now() - orbitStart) / 1000
  const startAng = (k / props.count) * 2 * Math.PI
  const curAng = startAng + (elapsed / props.orbitDuration) * 2 * Math.PI
  const rot = rotDeg(k) * Math.PI / 180
  const ox = Math.cos(curAng) * X_AMP
  const oy = Math.sin(curAng) * Y_AMP
  return ox * Math.sin(rot) + oy * Math.cos(rot)
}

const updateDepth = () => {
  for (let k = 0; k < props.count; k++) {
    slotZ[k] = worldY(k) > 0 ? 1 : -1
  }
}

const doSwap = () => {
  const names = techNames.value
  if (names.length <= props.count) return

  const slot = slotCursor % props.count
  slotCursor = (slotCursor + 1) % props.count

  slotTechs.value = slotTechs.value.map((t, i) =>
    i === slot ? names[nextIndex % names.length] : t
  )
  nextIndex = (nextIndex + 1) % names.length

  swappedSlots.add(slot)
  setTimeout(() => swappedSlots.delete(slot), 700)
}

// ── Lifecycle ─────────────────────────────────────────────────────────────────
const startAll = () => {
  initSlots()
  depthTimer = setInterval(updateDepth, 100)
  swapTimer = setInterval(doSwap, props.intervalMs)
}

const stopAll = () => {
  clearInterval(swapTimer)
  clearInterval(depthTimer)
}

watch(techNames, names => {
  stopAll()
  if (names.length) startAll()
}, { immediate: true })

onMounted(() => {
  syncDark()
  themeObserver = new MutationObserver(syncDark)
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
  colorSchemeMedia = window.matchMedia('(prefers-color-scheme: dark)')
  colorSchemeMedia.addEventListener('change', syncDark)

  if (techNames.value.length) startAll()
})

onUnmounted(() => {
  stopAll()
  themeObserver?.disconnect()
  colorSchemeMedia?.removeEventListener('change', syncDark)
})
</script>

<style scoped>
@property --angle {
  syntax: '<angle>';
  inherits: false;
  initial-value: 0deg;
}

@keyframes revolve {
  to {
    --angle: 360deg;
  }
}

@keyframes icon-glow {
  0% {
    box-shadow: 0 0 0 0 color-mix(in srgb, var(--color-blue-500, #f59e0b) 0%, transparent);
  }

  40% {
    box-shadow: 0 0 12px 4px color-mix(in srgb, var(--color-blue-500, #f59e0b) 55%, transparent);
  }

  100% {
    box-shadow: 0 0 0 0 color-mix(in srgb, var(--color-blue-500, #f59e0b) 0%, transparent);
  }
}

.orbit-stage {
  position: absolute;
  inset: 0;
  pointer-events: none;
  --x-amp: clamp(170px, 25vw, 220px);
  --y-amp: clamp(60px, 8vw, 80px);
  --dur: 12s;
}

.orbit-slot {
  position: absolute;
  top: 50%;
  left: 50%;
  --sz: clamp(2rem, 5.5vw, 2.75rem);
  width: var(--sz);
  height: var(--sz);
  margin: calc(-0.5 * var(--sz));
  --x: calc(cos(var(--angle)) * var(--x-amp));
  --y: calc(sin(var(--angle)) * var(--y-amp));
  transform:
    rotate(var(--rot, 0deg)) translate(var(--x), var(--y)) rotate(calc(-1 * var(--rot, 0deg)));
  animation: revolve var(--dur) linear infinite;
}

/* Light mode defaults */
.icon-face {
  width: 100%;
  height: 100%;
  border-radius: 9999px;
  background: linear-gradient(135deg,
      var(--color-blue-50, #fffbeb),
      var(--color-cyan-50, #fff7ed));
  border: 2px solid var(--color-blue-200, #fde68a);
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.10);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  /* Dark mode values come from faceDarkStyle inline binding — no :global needed */
  transition:
    background 0.4s ease,
    border-color 0.4s ease,
    box-shadow 0.4s ease;
}

.icon-face--just-swapped {
  animation: icon-glow 0.7s ease-out forwards;
}

.icon-glyph {
  font-size: clamp(1rem, 3vw, 1.5rem);
  line-height: 1;
  display: block;
  pointer-events: none;
}

.icon-img {
  width: 62%;
  height: 62%;
  object-fit: contain;
}

.icon-initials {
  font-size: 0.65rem;
  font-weight: 700;
  color: white;
  width: 100%;
  height: 100%;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 0.02em;
}

/* Smooth scale+fade swap — identical to v4 */
.icon-swap-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.icon-swap-leave-to {
  opacity: 0;
  transform: scale(0.55);
}

.icon-swap-enter-active {
  transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.icon-swap-enter-from {
  opacity: 0;
  transform: scale(0.55);
}
</style>