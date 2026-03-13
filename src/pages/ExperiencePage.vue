<template>
  <div>
    <section class="section-container pt-32">
      <!-- Header -->
      <div ref="headerEl" class="opacity-0 mb-16">
        <div class="accent-line" />
        <h1 class="section-title">{{ $t('experience.title') }}</h1>
        <p class="section-subtitle max-w-2xl">{{ $t('experience.subtitle') }}</p>
      </div>

      <ExperienceTimeline />
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ExperienceTimeline from '@/components/experience/ExperienceTimeline.vue'

const headerEl = ref<HTMLElement | null>(null)

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)
  gsap.fromTo(
    headerEl.value,
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'power2.out',
      scrollTrigger: { trigger: headerEl.value, start: 'top 85%' },
    },
  )
})
</script>
