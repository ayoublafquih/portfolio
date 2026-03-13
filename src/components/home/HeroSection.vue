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
    <div class="relative z-10 max-w-6xl mx-auto px-6 lg:px-12 pt-24 pb-16 w-full">
      <div class="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">

        <!-- Left: Text -->
        <div class="flex-1 text-center lg:text-left">
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
          <p ref="taglineEl" class="opacity-0 text-text-muted text-base md:text-lg max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed">
            {{ $t('hero.tagline') }}
          </p>

          <!-- Description -->
          <p ref="descEl" class="opacity-0 text-text-secondary text-base md:text-lg max-w-2xl mx-auto lg:mx-0 mb-12 leading-relaxed">
            {{ $t('hero.description') }}
          </p>

          <!-- CTA Buttons -->
          <div ref="ctaEl" class="opacity-0 flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4">
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

        <!-- Right: Photo -->
        <div ref="photoEl" class="opacity-0 flex-shrink-0 flex items-center justify-center">
          <div class="profile-photo-wrapper">
            <!-- Outer glow ring -->
            <div class="profile-glow-ring" />
            <!-- Photo frame -->
            <div class="profile-photo-frame">
              <img
                :src="photo"
                :alt="config.name.full"
                class="profile-photo"
              />
            </div>
            <!-- Decorative corner accent -->
            <div class="profile-accent-dot profile-accent-dot--tr" />
            <div class="profile-accent-dot profile-accent-dot--bl" />
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { Icon } from '@iconify/vue'
import { config } from '@/config'
import photo from '@/assets/images/photo.jpeg'

const heroEl    = ref<HTMLElement | null>(null)
const badgeEl   = ref<HTMLElement | null>(null)
const nameEl    = ref<HTMLElement | null>(null)
const titleEl   = ref<HTMLElement | null>(null)
const taglineEl = ref<HTMLElement | null>(null)
const descEl    = ref<HTMLElement | null>(null)
const ctaEl     = ref<HTMLElement | null>(null)
const photoEl   = ref<HTMLElement | null>(null)

onMounted(() => {
  gsap.set(
    [badgeEl.value, nameEl.value, titleEl.value, taglineEl.value, descEl.value, ctaEl.value],
    { y: 25 },
  )
  gsap.set(photoEl.value, { y: 30, scale: 0.95 })

  const tl = gsap.timeline({ delay: 0.1 })
  tl.to(photoEl.value,   { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out' }, 0)
    .to(badgeEl.value,   { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 0.2)
    .to(nameEl.value,    { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 0.35)
    .to(titleEl.value,   { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 0.5)
    .to(taglineEl.value, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 0.62)
    .to(descEl.value,    { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 0.74)
    .to(ctaEl.value,     { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 0.86)
})
</script>

<style scoped>
/* ── Photo wrapper ─────────────────────────────────────────── */
.profile-photo-wrapper {
  position: relative;
  width: 280px;
  height: 280px;
}

@media (min-width: 768px) {
  .profile-photo-wrapper {
    width: 340px;
    height: 340px;
  }
}

/* Animated glow ring */
.profile-glow-ring {
  position: absolute;
  inset: -6px;
  border-radius: 50%;
  background: conic-gradient(
    from 0deg,
    rgba(99, 102, 241, 0.8),
    rgba(129, 140, 248, 0.4),
    rgba(99, 102, 241, 0),
    rgba(99, 102, 241, 0.8)
  );
  animation: spin-glow 6s linear infinite;
  z-index: 0;
}

@keyframes spin-glow {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

/* Photo frame */
.profile-photo-frame {
  position: absolute;
  inset: 3px;
  border-radius: 50%;
  overflow: hidden;
  z-index: 1;
  background: var(--color-bg-primary);
  box-shadow:
    0 0 0 2px var(--color-bg-primary),
    0 20px 60px rgba(99, 102, 241, 0.25),
    0 8px 30px rgba(0, 0, 0, 0.15);
}

.profile-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  display: block;
}

/* Decorative accent dots */
.profile-accent-dot {
  position: absolute;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--color-accent);
  z-index: 2;
  animation: glowPulse 3s ease-in-out infinite;
}

.profile-accent-dot--tr {
  top: 12px;
  right: 12px;
}

.profile-accent-dot--bl {
  bottom: 12px;
  left: 12px;
  animation-delay: 1.5s;
  background: rgba(129, 140, 248, 0.8);
}
</style>
