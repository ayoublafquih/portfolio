<template>
  <div>
    <section class="section-container pt-32">
      <!-- Header -->
      <div ref="headerEl" class="opacity-0 mb-16">
        <div class="accent-line" />
        <h1 class="section-title">{{ $t('about.title') }}</h1>
        <p class="section-subtitle max-w-2xl">{{ $t('about.subtitle') }}</p>
      </div>

      <!-- Bio grid -->
      <div class="grid md:grid-cols-2 gap-12 mb-20">
        <!-- Left: photo + text -->
        <div ref="bioEl" class="opacity-0 space-y-6">

          <!-- Profile photo -->
          <div class="about-photo-wrapper">
            <img
              :src="photo"
              :alt="config.name.full"
              class="about-photo"
            />
            <!-- Accent border frame -->
            <div class="about-photo-accent" />
          </div>

          <p class="text-text-secondary leading-relaxed">{{ $t('about.bio1') }}</p>
          <p class="text-text-secondary leading-relaxed">{{ $t('about.bio2') }}</p>
          <p class="text-text-secondary leading-relaxed">{{ $t('about.bio3') }}</p>

          <!-- Stats -->
          <div class="grid grid-cols-3 gap-4 pt-4">
            <div
              v-for="stat in stats"
              :key="stat.labelKey"
              class="text-center p-4 rounded-xl bg-surface border border-surface-border"
            >
              <p class="text-2xl font-bold gradient-text">{{ stat.value }}</p>
              <p class="text-text-muted text-xs mt-1">{{ $t(stat.labelKey) }}</p>
            </div>
          </div>
        </div>

        <!-- Right: info card -->
        <div ref="infoEl" class="opacity-0 space-y-4">
          <div class="glass-card space-y-4">
            <h3 class="text-text-primary font-semibold text-sm uppercase tracking-wider mb-4">
              {{ $t('about.quickInfo.title') }}
            </h3>
            <div
              v-for="info in quickInfo"
              :key="info.icon"
              class="flex items-center gap-3"
            >
              <div class="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                <Icon :icon="info.icon" width="16" class="text-accent-light" />
              </div>
              <div>
                <p class="text-text-muted text-xs">{{ $t(info.labelKey) }}</p>
                <p class="text-text-secondary text-sm font-medium">{{ $t(info.valueKey) }}</p>
              </div>
            </div>
            <!-- Email row -->
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                <Icon icon="mdi:email-outline" width="16" class="text-accent-light" />
              </div>
              <div>
                <p class="text-text-muted text-xs">{{ $t('about.quickInfo.email') }}</p>
                <p class="text-text-secondary text-sm font-medium">{{ config.email }}</p>
              </div>
            </div>
          </div>

          <!-- Availability -->
          <div class="glass-card">
            <div class="flex items-center gap-3">
              <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
              <div>
                <p class="text-text-primary text-sm font-medium">{{ $t('about.availability.title') }}</p>
                <p class="text-text-muted text-xs mt-0.5">{{ $t('about.availability.subtitle') }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Expertise cards -->
      <div ref="cardsEl" class="opacity-0">
        <h2 class="text-2xl font-bold text-text-primary mb-8">{{ $t('about.expertiseTitle') }}</h2>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <ExpertiseCard
            v-for="card in expertiseCards"
            :key="card.titleKey"
            :title="$t(card.titleKey)"
            :description="$t(card.descKey)"
            :icon="card.icon"
            :color="card.color"
            :tags="card.tags"
          />
        </div>
      </div>

      <!-- Education & Certifications -->
      <div ref="eduEl" class="opacity-0 mt-20 grid md:grid-cols-2 gap-12">
        <!-- Education -->
        <div>
          <h2 class="text-2xl font-bold text-text-primary mb-8">{{ $t('about.educationTitle') }}</h2>
          <div class="space-y-4">
            <div v-for="edu in education" :key="edu.degree" class="glass-card">
              <div class="flex items-start gap-4">
                <div class="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon icon="mdi:school-outline" width="20" class="text-accent-light" />
                </div>
                <div>
                  <p class="text-text-primary font-semibold text-sm">{{ edu.degree }}</p>
                  <p class="text-accent-light text-xs font-medium mt-0.5">{{ edu.school }}</p>
                  <p class="text-text-muted text-xs mt-1">{{ edu.period }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Certifications -->
        <div>
          <h2 class="text-2xl font-bold text-text-primary mb-8">{{ $t('about.certificationsTitle') }}</h2>
          <div class="space-y-4">
            <div v-for="cert in certifications" :key="cert.name" class="glass-card">
              <div class="flex items-start gap-4">
                <div class="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon icon="mdi:certificate-outline" width="20" class="text-accent-light" />
                </div>
                <div>
                  <p class="text-text-primary font-semibold text-sm">{{ cert.name }}</p>
                  <p class="text-text-muted text-xs mt-1">{{ cert.issuer }}</p>
                  <p class="text-text-muted text-xs mt-0.5 opacity-60">{{ cert.date }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Icon } from '@iconify/vue'
import ExpertiseCard from '@/components/about/ExpertiseCard.vue'
import { config } from '@/config'
import photo from '@/assets/images/photo.jpeg'

const { t, tm } = useI18n()

const headerEl = ref<HTMLElement | null>(null)
const bioEl = ref<HTMLElement | null>(null)
const infoEl = ref<HTMLElement | null>(null)
const cardsEl = ref<HTMLElement | null>(null)
const eduEl = ref<HTMLElement | null>(null)

const stats = [
  { value: '6+', labelKey: 'about.stats.years' },
  { value: '3', labelKey: 'about.stats.companies' },
  { value: '∞', labelKey: 'about.stats.coffee' },
]

const quickInfo = [
  { icon: 'mdi:map-marker-outline', labelKey: 'about.quickInfo.location', valueKey: 'footer.location' },
  { icon: 'mdi:briefcase-outline', labelKey: 'about.quickInfo.role', valueKey: 'about.quickInfo.roleValue' },
  { icon: 'mdi:translate', labelKey: 'about.quickInfo.languages', valueKey: 'about.quickInfo.languagesValue' },
]

const expertiseCards = [
  { icon: 'mdi:cube-outline', titleKey: 'about.expertise.saas.title', descKey: 'about.expertise.saas.description', color: '#6366f1', tags: ['NestJS', 'Nuxt 3', 'gRPC', 'Feature Flags'] },
  { icon: 'mdi:chart-scatter-plot', titleKey: 'about.expertise.data.title', descKey: 'about.expertise.data.description', color: '#8b5cf6', tags: ['GraphQL', 'GCP', 'BigQuery', 'Charts'] },
  { icon: 'mdi:cart-outline', titleKey: 'about.expertise.ecommerce.title', descKey: 'about.expertise.ecommerce.description', color: '#06b6d4', tags: ['Angular', 'GTM', 'A/B Testing', 'SEO'] },
  { icon: 'mdi:shield-lock-outline', titleKey: 'about.expertise.security.title', descKey: 'about.expertise.security.description', color: '#10b981', tags: ['Auth0', 'RBAC', 'OAuth 2.0', 'JWT'] },
  { icon: 'mdi:brain', titleKey: 'about.expertise.ai.title', descKey: 'about.expertise.ai.description', color: '#f59e0b', tags: ['Gemini', 'LLM', 'Prompt Engineering'] },
  { icon: 'mdi:account-group-outline', titleKey: 'about.expertise.leadership.title', descKey: 'about.expertise.leadership.description', color: '#ec4899', tags: ['Team Lead', 'Code Review', 'Agile', 'CI/CD'] },
]

const education = computed(() => {
  return (tm('about.education') as any[]).map((_, i) => ({
    degree: t(`about.education[${i}].degree`),
    school: t(`about.education[${i}].school`),
    period: t(`about.education[${i}].period`),
  }))
})

const certifications = computed(() => {
  return (tm('about.certifications') as any[]).map((_, i) => ({
    name: t(`about.certifications[${i}].name`),
    issuer: t(`about.certifications[${i}].issuer`),
    date: t(`about.certifications[${i}].date`),
  }))
})

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  const elements = [
    { el: headerEl.value, delay: 0 },
    { el: bioEl.value, delay: 0.1 },
    { el: infoEl.value, delay: 0.15 },
    { el: cardsEl.value, delay: 0.1 },
    { el: eduEl.value, delay: 0.1 },
  ]

  elements.forEach(({ el, delay }) => {
    if (!el) return
    gsap.fromTo(
      el,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        delay,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 85%' },
      },
    )
  })
})
</script>

<style scoped>
.about-photo-wrapper {
  position: relative;
  display: inline-block;
  border-radius: 1.25rem;
  overflow: visible;
}

.about-photo {
  width: 100%;
  max-width: 360px;
  aspect-ratio: 4 / 5;
  object-fit: cover;
  object-position: center top;
  border-radius: 1.25rem;
  display: block;
  box-shadow:
    0 20px 60px rgba(99, 102, 241, 0.2),
    0 8px 30px rgba(0, 0, 0, 0.15);
}

/* Offset accent border */
.about-photo-accent {
  position: absolute;
  inset: -8px;
  border-radius: 1.5rem;
  border: 2px solid rgba(99, 102, 241, 0.35);
  pointer-events: none;
  z-index: -1;
}
</style>
