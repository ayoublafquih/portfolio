<template>
  <section
    ref="heroEl"
    class="relative min-h-screen flex items-center justify-center overflow-hidden hero-grid"
  >
    <!-- Radial glow background -->
    <div
      class="absolute inset-0 pointer-events-none"
      style="background: radial-gradient(ellipse 80% 60% at 50% -10%, rgba(99,102,241,0.18), transparent)"
    />

    <!-- Floating orbs -->
    <div
      class="absolute top-1/4 left-1/4 w-72 h-72 rounded-full pointer-events-none"
      style="background: radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%); animation: float 8s ease-in-out infinite;"
    />
    <div
      class="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full pointer-events-none"
      style="background: radial-gradient(circle, rgba(129,140,248,0.05) 0%, transparent 70%); animation: float 10s ease-in-out infinite reverse;"
    />

    <!-- Content -->
    <div class="relative z-10 max-w-6xl mx-auto px-6 lg:px-12 pt-24 pb-16 text-center">
      <!-- Availability badge -->
      <div ref="badgeEl" class="opacity-0 mb-8 inline-flex items-center gap-2">
        <span
          class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium
                 bg-accent/10 border border-accent/25 text-accent-light"
        >
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          {{ $t('hero.available') }}
        </span>
      </div>

      <!-- Name -->
      <h1 ref="nameEl" class="opacity-0 text-5xl md:text-7xl font-extrabold leading-tight mb-4">
        <span class="text-text-primary">{{ config.name.first }}</span>
            <br />
            <span class="gradient-text">{{ config.name.last }}</span>
      </h1>

      <!-- Title -->
      <p ref="titleEl" class="opacity-0 text-lg md:text-xl font-medium text-text-secondary mb-3 tracking-wide">
        {{ $t('hero.title') }}
      </p>

      <!-- Tagline -->
      <p ref="taglineEl" class="opacity-0 text-text-muted text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
        {{ $t('hero.tagline') }}
      </p>

      <!-- Description -->
      <p ref="descEl" class="opacity-0 text-text-secondary text-base md:text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
        {{ $t('hero.description') }}
      </p>

      <!-- CTA Buttons -->
      <div ref="ctaEl" class="opacity-0 flex flex-col sm:flex-row items-center justify-center gap-4">
        <a
          :href="config.links.github"
          target="_blank"
          rel="noopener noreferrer"
          class="btn-primary"
        >
          <Icon icon="mdi:github" width="18" />
          {{ $t('hero.github') }}
        </a>
        <a
          :href="config.links.linkedin"
          target="_blank"
          rel="noopener noreferrer"
          class="btn-outline"
        >
          <Icon icon="mdi:linkedin" width="18" />
          {{ $t('hero.linkedin') }}
        </a>
        <RouterLink to="/contact" class="btn-outline">
          <Icon icon="mdi:email-outline" width="18" />
          {{ $t('hero.contact') }}
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { Icon } from '@iconify/vue'
import { config } from '@/config'

const heroEl = ref<HTMLElement | null>(null)
const badgeEl = ref<HTMLElement | null>(null)
const nameEl = ref<HTMLElement | null>(null)
const titleEl = ref<HTMLElement | null>(null)
const taglineEl = ref<HTMLElement | null>(null)
const descEl = ref<HTMLElement | null>(null)
const ctaEl = ref<HTMLElement | null>(null)
const scrollEl = ref<HTMLElement | null>(null)

onMounted(() => {
  gsap.set(
    [badgeEl.value, nameEl.value, titleEl.value, taglineEl.value, descEl.value, ctaEl.value, scrollEl.value],
    { y: 25 },
  )

  const tl = gsap.timeline({ delay: 0.1 })
  tl.to(badgeEl.value, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 0)
    .to(nameEl.value, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 0.15)
    .to(titleEl.value, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 0.3)
    .to(taglineEl.value, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 0.42)
    .to(descEl.value, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 0.54)
    .to(ctaEl.value, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 0.66)
    .to(scrollEl.value, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 0.9)
})
</script>
