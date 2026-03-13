<template>
  <div>
    <section class="section-container pt-32">
      <!-- Header -->
      <div ref="headerEl" class="opacity-0 mb-16">
        <div class="accent-line" />
        <h1 class="section-title">{{ $t('skills.title') }}</h1>
        <p class="section-subtitle max-w-2xl">{{ $t('skills.subtitle') }}</p>
      </div>

      <!-- Skills grid -->
      <div class="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-5">
        <SkillCategory
          v-for="cat in skillCategories"
          :key="cat.category"
          v-bind="cat"
        />
      </div>

      <!-- Currently learning -->
      <div ref="learningEl" class="opacity-0 mt-12">
        <div class="glass-card">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
              <Icon icon="mdi:trending-up" width="18" class="text-emerald-400" />
            </div>
            <h3 class="text-text-primary font-semibold text-base">{{ $t('skills.currentlyExploring') }}</h3>
          </div>
          <div class="flex flex-wrap gap-2">
            <SkillBadge
              v-for="skill in exploring"
              :key="skill.name"
              :name="skill.name"
              :icon="skill.icon"
              color="#10b981"
            />
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
import SkillCategory from '@/components/skills/SkillCategory.vue'
import SkillBadge from '@/components/skills/SkillBadge.vue'

const { t, locale } = useI18n()

const headerEl = ref<HTMLElement | null>(null)
const learningEl = ref<HTMLElement | null>(null)

const skillCategories = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _locale = locale.value // reactive dependency so computed re-runs on locale change
  return [
  {
    category: t('skills.categories.frontend'),
    icon: 'mdi:monitor-shimmer',
    color: '#6366f1',
    skills: [
      { name: 'Vue.js', icon: 'mdi:vuejs' },
      { name: 'Nuxt.js', icon: 'simple-icons:nuxtdotjs' },
      { name: 'Angular', icon: 'mdi:angular' },
      { name: 'TypeScript', icon: 'mdi:language-typescript' },
      { name: 'JavaScript', icon: 'mdi:language-javascript' },
      { name: 'Tailwind CSS', icon: 'mdi:tailwind' },
      { name: 'RxJS' },
      { name: 'NgRx' },
      { name: 'Nx' },
      { name: 'SAP Spartacus' },
      { name: 'Angular Material' },
      { name: 'Nuxt UI' },
      { name: 'Storybook', icon: 'simple-icons:storybook' },
      { name: 'SSR' },
    ],
  },
  {
    category: t('skills.categories.backend'),
    icon: 'mdi:server-outline',
    color: '#8b5cf6',
    skills: [
      { name: 'Node.js', icon: 'mdi:nodejs' },
      { name: 'NestJS', icon: 'simple-icons:nestjs' },
      { name: 'Nitro' },
      { name: 'GraphQL', icon: 'simple-icons:graphql' },
      { name: 'gRPC' },
      { name: 'REST APIs' },
      { name: 'PostgreSQL', icon: 'mdi:database' },
      { name: 'MongoDB', icon: 'simple-icons:mongodb' },
      { name: 'MySQL' },
      { name: 'SQLite' },
      { name: 'Redis', icon: 'simple-icons:redis' },
      { name: 'Prometheus' },
      { name: 'Grafana' },
    ],
  },
  {
    category: t('skills.categories.cloud'),
    icon: 'mdi:cloud-outline',
    color: '#06b6d4',
    skills: [
      { name: 'Google Cloud', icon: 'mdi:google-cloud' },
      { name: 'BigQuery' },
      { name: 'Pub/Sub' },
      { name: 'Firestore' },
      { name: 'Cloud Storage' },
      { name: 'Cloud Run' },
      { name: 'Docker', icon: 'mdi:docker' },
      { name: 'GitLab CI', icon: 'mdi:gitlab' },
      { name: 'GitHub Actions', icon: 'mdi:github' },
      { name: 'Git', icon: 'mdi:git' },
      { name: 'Bamboo' },
      { name: 'Figma', icon: 'simple-icons:figma' },
      { name: 'Jira' },
      { name: 'Monday.com' },
    ],
  },
  {
    category: t('skills.categories.security'),
    icon: 'mdi:shield-check-outline',
    color: '#10b981',
    skills: [
      { name: 'Auth0', icon: 'simple-icons:auth0' },
      { name: 'RBAC' },
      { name: 'OAuth 2.0' },
      { name: 'JWT' },
      { name: 'Feature Flags' },
      { name: 'Cypress', icon: 'simple-icons:cypress' },
      { name: 'Jest', icon: 'simple-icons:jest' },
      { name: 'Vitest' },
      { name: 'Jasmine' },
      { name: 'Microservices' },
      { name: 'DDD' },
      { name: 'CQRS' },
    ],
  },
  ]
})

const exploring = [
  { name: 'LLM / AI Integration', icon: 'mdi:brain' },
  { name: 'Rust', icon: 'mdi:language-rust' },
  { name: 'Bun.js' },
  { name: 'Hono.js' },
  { name: 'WebAssembly' },
]

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  gsap.fromTo(
    headerEl.value,
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
  )

  gsap.fromTo(
    '.skill-category-card',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', stagger: 0.1, delay: 0.2 },
  )

  gsap.fromTo(
    learningEl.value,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 0.6 },
  )
})
</script>
