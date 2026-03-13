<template>
  <Transition name="loader" @after-leave="emit('done')">
    <div
      v-if="visible"
      class="fixed inset-0 z-[9999] flex items-center justify-center bg-bg-primary"
    >
      <!-- Ambient glow -->
      <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          class="w-96 h-96 rounded-full"
          style="background: radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)"
        />
      </div>

      <!-- SVG Initials -->
      <div class="relative flex flex-col items-center gap-8">
        <svg
          ref="svgEl"
          width="120"
          height="80"
          viewBox="0 0 120 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="overflow-visible"
        >
          <!-- Letter A -->
          <path
            ref="pathA"
            d="M 5 70 L 28 10 L 51 70 M 13 48 L 43 48"
            stroke="#6366f1"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
            fill="none"
          />
          <!-- Letter L -->
          <path
            ref="pathL"
            d="M 69 10 L 69 70 L 115 70"
            stroke="#818cf8"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
            fill="none"
          />
        </svg>

        <!-- Loading bar -->
        <div class="w-32 h-0.5 bg-surface rounded-full overflow-hidden">
          <div
            ref="barEl"
            class="h-full bg-gradient-to-r from-accent to-accent-light rounded-full"
            style="width: 0%"
          />
        </div>

        <!-- Name -->
        <p
          ref="nameEl"
          class="text-text-muted text-xs tracking-[0.3em] uppercase font-medium opacity-0"
        >
          Ayoub Lafquih
        </p>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'

const emit = defineEmits<{ done: [] }>()

const visible = ref(true)
const svgEl = ref<SVGElement | null>(null)
const pathA = ref<SVGPathElement | null>(null)
const pathL = ref<SVGPathElement | null>(null)
const barEl = ref<HTMLElement | null>(null)
const nameEl = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!pathA.value || !pathL.value) return

  const lenA = pathA.value.getTotalLength()
  const lenL = pathL.value.getTotalLength()

  gsap.set(pathA.value, { strokeDasharray: lenA, strokeDashoffset: lenA })
  gsap.set(pathL.value, { strokeDasharray: lenL, strokeDashoffset: lenL })

  const tl = gsap.timeline({
    onComplete: () => {
      setTimeout(() => { visible.value = false }, 300)
    },
  })

  tl.to(pathA.value, { strokeDashoffset: 0, duration: 0.7, ease: 'power2.inOut' })
  tl.to(pathL.value, { strokeDashoffset: 0, duration: 0.7, ease: 'power2.inOut' }, '-=0.4')
  tl.to(barEl.value, { width: '100%', duration: 0.6, ease: 'power1.inOut' }, '-=0.3')
  tl.to(nameEl.value, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, '-=0.3')
  tl.to(svgEl.value, { scale: 1.05, opacity: 0, duration: 0.35, ease: 'power2.in', delay: 0.3 })
  tl.to([barEl.value, nameEl.value], { opacity: 0, duration: 0.2, ease: 'power2.in' }, '<')
})
</script>

<style scoped>
.loader-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.loader-leave-to {
  opacity: 0;
  transform: scale(1.03);
}
</style>
