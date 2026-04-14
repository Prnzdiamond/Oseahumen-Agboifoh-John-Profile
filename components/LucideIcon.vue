<template>
  <!--
    Renders any Lucide icon by its kebab-case name string.
    Used everywhere an icon name comes from the database (key features, hobbies,
    contact methods etc.) so the frontend never hardcodes icon names.

    Usage:
      <LucideIcon name="bell" class="w-5 h-5 text-white" />
      <LucideIcon name="gamepad-2" class="w-6 h-6" />
      <LucideIcon name="cloud" :size="20" />

    If the name doesn't match any Lucide icon, falls back to a generic
    sparkles icon so the UI never breaks.
  -->
  <component
    :is="resolvedIcon"
    v-bind="iconProps"
  />
</template>

<script setup>
import { computed } from 'vue'
import * as LucideIcons from 'lucide-vue-next'

const props = defineProps({
  // The icon name as stored in the database — kebab-case Lucide name
  // e.g. "bell", "cloud", "gamepad-2", "mail-open", "shield-check"
  name: {
    type: String,
    default: null,
  },
  // Pixel size passed directly to Lucide (default matches Lucide's own default)
  size: {
    type: [Number, String],
    default: undefined,
  },
  // Stroke width override
  strokeWidth: {
    type: [Number, String],
    default: undefined,
  },
})

/**
 * Convert a kebab-case Lucide name to the PascalCase component name.
 *
 * "bell"        → "Bell"
 * "gamepad-2"   → "Gamepad2"
 * "mail-open"   → "MailOpen"
 * "shield-check"→ "ShieldCheck"
 * "chevron-up"  → "ChevronUp"
 */
const toPascalCase = (name) => {
  if (!name) return ''
  return name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('')
}

const resolvedIcon = computed(() => {
  if (!props.name) return LucideIcons['Sparkles']

  const pascal = toPascalCase(props.name)
  return LucideIcons[pascal] ?? LucideIcons['Sparkles']
})

const iconProps = computed(() => {
  const p = {}
  if (props.size !== undefined)        p.size        = props.size
  if (props.strokeWidth !== undefined) p.strokeWidth = props.strokeWidth
  return p
})
</script>
