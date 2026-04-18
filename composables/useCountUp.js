// composables/useCountUp.js
//
// IntersectionObserver-based count-up animation.
//
// Usage:
//   const { displayed, setEl } = useCountUp(() => projectStore.projects?.length ?? 0)
//
//   In template:
//   <span :ref="setEl">{{ displayed }}</span>
//
// The target is a getter function so it is evaluated lazily at the moment the
// element enters the viewport — by then the store will have fetched its data.
// Passing a plain number also works: useCountUp(42)

import { ref, onUnmounted } from 'vue'

export const useCountUp = (target, duration = 1500) => {
    const displayed = ref(0)
    let observer    = null
    let started     = false

    // Ease-out cubic: fast start, gentle landing
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3)

    const startCount = (targetValue) => {
        if (started || targetValue === 0) {
            displayed.value = targetValue
            return
        }
        started = true
        const startTime = Date.now()

        const tick = () => {
            const elapsed  = Date.now() - startTime
            const progress = Math.min(elapsed / duration, 1)
            displayed.value = Math.round(easeOutCubic(progress) * targetValue)
            if (progress < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
    }

    // Call this as a Vue template ref on the element to observe:
    //   <span :ref="setEl">{{ displayed }}</span>
    const setEl = (element) => {
        if (!element) return

        // Resolve target — accepts a plain number or a getter function
        const getTarget = typeof target === 'function' ? target : () => target

        if (typeof window === 'undefined' || !window.IntersectionObserver) {
            displayed.value = getTarget()
            return
        }

        observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    startCount(getTarget())
                    observer.unobserve(element)
                }
            },
            { threshold: 0.3 }
        )
        observer.observe(element)
    }

    onUnmounted(() => observer?.disconnect())

    return { displayed, setEl }
}
