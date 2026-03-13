<template>
  <div ref="timelineEl" class="opacity-0">
    <TimelineItem
      v-for="(exp, index) in experiences"
      :key="index"
      v-bind="exp"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TimelineItem from './TimelineItem.vue'

const { t, tm } = useI18n()

const experiences = computed(() => {
  return (tm('experience.jobs') as any[]).map((job, i) => ({
    role: t(`experience.jobs[${i}].role`),
    company: job.company as string,
    location: t(`experience.jobs[${i}].location`),
    period: t(`experience.jobs[${i}].period`),
    bullets: (tm(`experience.jobs[${i}].bullets`) as any[]).map((_, j) =>
      t(`experience.jobs[${i}].bullets[${j}]`)
    ),
    stack: job.stack as string[],
  }))
})

const timelineEl = ref<HTMLElement | null>(null)

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)
  gsap.fromTo(
    timelineEl.value,
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: timelineEl.value,
        start: 'top 85%',
      },
    },
  )
})
</script>
