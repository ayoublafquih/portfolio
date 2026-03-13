<template>
  <div>
    <section class="section-container pt-32">
      <!-- Header -->
      <div ref="headerEl" class="opacity-0 mb-16 text-center">
        <div class="accent-line mx-auto" />
        <h1 class="section-title">{{ $t('contact.title') }}</h1>
        <p class="section-subtitle max-w-xl mx-auto">{{ $t('contact.subtitle') }}</p>
      </div>

      <div class="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
        <!-- Left: contact links -->
        <div ref="linksEl" class="opacity-0 space-y-4">
          <h2 class="text-text-primary font-semibold text-lg mb-6">{{ $t('contact.connect') }}</h2>

          <a
            v-for="link in contactLinks"
            :key="link.labelKey"
            :href="link.href"
            :target="link.external ? '_blank' : undefined"
            :rel="link.external ? 'noopener noreferrer' : undefined"
            class="flex items-center gap-4 p-4 rounded-xl border border-surface-border bg-surface
                   hover:border-accent/40 hover:bg-surface-hover transition-all duration-300 group"
          >
            <div
              class="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300
                     group-hover:scale-110"
              :style="{ background: `${link.color}15`, border: `1px solid ${link.color}30` }"
            >
              <Icon :icon="link.icon" width="20" :style="{ color: link.color }" />
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-text-muted text-xs font-medium uppercase tracking-wider mb-0.5">
                {{ $t(link.labelKey) }}
              </p>
              <p class="text-text-primary text-sm font-medium truncate group-hover:text-accent-light transition-colors duration-200">
                {{ link.display }}
              </p>
            </div>
            <Icon icon="mdi:arrow-top-right" width="16" class="text-text-muted opacity-0 group-hover:opacity-100 flex-shrink-0 transition-opacity duration-200" />
          </a>
        </div>

        <!-- Right: message card -->
        <div ref="cardEl" class="opacity-0">
          <div class="glass-card h-full flex flex-col justify-between">
            <div>
              <div class="flex items-center gap-3 mb-6">
                <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <p class="text-text-secondary text-sm font-medium">{{ $t('contact.available') }}</p>
              </div>

              <h3 class="text-text-primary font-bold text-xl mb-3">{{ $t('contact.openTitle') }}</h3>
              <p class="text-text-muted text-sm leading-relaxed mb-6">{{ $t('contact.openBody') }}</p>

              <!-- Tags -->
              <div class="flex flex-wrap gap-2 mb-8">
                <span class="tag-chip">{{ $t('contact.tags.fulltime') }}</span>
                <span class="tag-chip">{{ $t('contact.tags.freelance') }}</span>
                <span class="tag-chip">{{ $t('contact.tags.remote') }}</span>
                <span class="tag-chip">{{ $t('contact.tags.onsite') }}</span>
              </div>
            </div>

            <!-- CTA -->
            <a :href="`mailto:${config.email}`" class="btn-primary w-full justify-center">
              <Icon icon="mdi:send-outline" width="16" />
              {{ $t('contact.cta') }}
            </a>
          </div>
        </div>
      </div>

      <!-- Location note -->
      <div ref="locationEl" class="opacity-0 mt-12 text-center">
        <p class="text-text-muted text-sm flex items-center justify-center gap-2">
          <Icon icon="mdi:map-marker-outline" width="16" class="text-accent/60" />
          {{ $t('contact.locationNote') }}
        </p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Icon } from '@iconify/vue'
import { config } from '@/config'

const headerEl = ref<HTMLElement | null>(null)
const linksEl = ref<HTMLElement | null>(null)
const cardEl = ref<HTMLElement | null>(null)
const locationEl = ref<HTMLElement | null>(null)

const contactLinks = [
  {
    labelKey: 'contact.links.email',
    display: config.email,
    href: `mailto:${config.email}`,
    icon: 'mdi:email-outline',
    color: '#6366f1',
    external: false,
  },
  {
    labelKey: 'contact.links.linkedin',
    display: config.display.linkedin,
    href: config.links.linkedin,
    icon: 'mdi:linkedin',
    color: '#0a66c2',
    external: true,
  },
  {
    labelKey: 'contact.links.github',
    display: config.display.github,
    href: config.links.github,
    icon: 'mdi:github',
    color: '#f8fafc',
    external: true,
  },
]

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  const elements = [
    { el: headerEl.value, delay: 0 },
    { el: linksEl.value, delay: 0.1 },
    { el: cardEl.value, delay: 0.15 },
    { el: locationEl.value, delay: 0.2 },
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
