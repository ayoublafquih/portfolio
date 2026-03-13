<template>
  <div>
    <section class="section-container pt-32">
      <!-- Header -->
      <div ref="headerEl" class="opacity-0 mb-16">
        <div class="accent-line" />
        <h1 class="section-title">{{ $t('skills.title') }}</h1>
        <p class="section-subtitle max-w-2xl">{{ $t('skills.subtitle') }}</p>
      </div>

      <!-- ── Featured frameworks ──────────────────────────────── -->
      <div ref="featuredEl" class="opacity-0 mb-16">
        <p class="text-text-muted text-xs font-semibold uppercase tracking-widest mb-6">
          {{ $t('skills.principalFrameworks') }}
        </p>
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          <a
            v-for="fw in featuredFrameworks"
            :key="fw.name"
            class="featured-fw-card group"
            :style="{ '--fw-color': fw.color }"
          >
            <!-- Glow bg -->
            <div class="featured-fw-glow" />

            <!-- Icon -->
            <div
              class="featured-fw-icon"
              :style="{ background: `color-mix(in srgb, ${fw.color} 12%, transparent)`,
                        border: `1px solid color-mix(in srgb, ${fw.color} 28%, transparent)` }"
            >
              <Icon :icon="fw.icon" width="28" :style="{ color: fw.color }" />
            </div>

            <!-- Name -->
            <p class="text-text-primary font-bold text-sm mt-3 mb-1">{{ fw.name }}</p>

            <!-- Experience badge -->
            <span
              class="featured-fw-badge"
              :style="{ background: `color-mix(in srgb, ${fw.color} 12%, transparent)`,
                        border: `1px solid color-mix(in srgb, ${fw.color} 25%, transparent)`,
                        color: fw.color }"
            >
              {{ fw.exp }}
            </span>
          </a>
        </div>
      </div>

      <!-- Skills grid -->
      <div class="grid sm:grid-cols-2 gap-5">
        <SkillCategory
          v-for="(cat, index) in skillCategories"
          :key="cat.category"
          v-bind="cat"
          :class="{ 'sm:col-span-2': index === skillCategories.length - 1 && skillCategories.length % 2 !== 0 }"
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
import { frameworks } from '@/config/frameworks';

const { t } = useI18n()

const headerEl   = ref<HTMLElement | null>(null)
const learningEl = ref<HTMLElement | null>(null)
const featuredEl = ref<HTMLElement | null>(null)

const featuredFrameworks = frameworks;

const skillCategories = computed(() => {
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
  {
    category: t('skills.categories.softskills'),
    icon: 'mdi:account-heart-outline',
    color: '#f59e0b',
    skills: [
      { name: t('skills.softskills.techLeadership'), icon: 'mdi:account-group-outline' },
      { name: t('skills.softskills.mentoring'), icon: 'mdi:school-outline' },
      { name: t('skills.softskills.agileScrum'), icon: 'mdi:refresh' },
      { name: t('skills.softskills.codeReview'), icon: 'mdi:code-review' },
      { name: t('skills.softskills.collaboration'), icon: 'mdi:handshake-outline' },
      { name: t('skills.softskills.documentation'), icon: 'mdi:file-document-outline' },
      { name: t('skills.softskills.problemSolving'), icon: 'mdi:lightbulb-outline' },
      { name: t('skills.softskills.ownership'), icon: 'mdi:shield-star-outline' },
      { name: t('skills.softskills.communication'), icon: 'mdi:message-text-outline' },
      { name: t('skills.softskills.adaptability'), icon: 'mdi:lightning-bolt-outline' },
      { name: t('skills.softskills.ethicalThinking'), icon: 'mdi:scale-balance' },
      { name: t('skills.softskills.userEmpathy'), icon: 'mdi:heart-outline' },
      { name: t('skills.softskills.continuousLearning'), icon: 'mdi:book-open-page-variant-outline' },
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
    featuredEl.value,
    { opacity: 0, y: 24 },
    { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 0.15,
      scrollTrigger: { trigger: featuredEl.value, start: 'top 88%' } },
  )

  gsap.fromTo(
    '.featured-fw-card',
    { opacity: 0, y: 18, scale: 0.96 },
    { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: 'power2.out', stagger: 0.08, delay: 0.25 },
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

<style scoped>
/* ── Featured framework card ───────────────────────────────── */
.featured-fw-card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 1.5rem 1rem;
  border-radius: 1.25rem;
  background: var(--color-surface);
  border: 1px solid var(--color-surface-border);
  overflow: hidden;
  cursor: default;
  transition: border-color 0.25s, transform 0.25s, box-shadow 0.25s;
}

.featured-fw-card:hover {
  border-color: color-mix(in srgb, var(--fw-color) 40%, transparent);
  transform: translateY(-4px);
  box-shadow: 0 12px 32px color-mix(in srgb, var(--fw-color) 18%, transparent);
}

/* Radial glow that activates on hover */
.featured-fw-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse 80% 60% at 50% 0%,
    color-mix(in srgb, var(--fw-color) 10%, transparent),
    transparent 70%
  );
  opacity: 0;
  transition: opacity 0.3s;
  pointer-events: none;
}

.featured-fw-card:hover .featured-fw-glow {
  opacity: 1;
}

/* Icon box */
.featured-fw-icon {
  position: relative;
  z-index: 1;
  width: 3.25rem;
  height: 3.25rem;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.25s;
}

.featured-fw-card:hover .featured-fw-icon {
  transform: scale(1.1);
}

/* Experience badge */
.featured-fw-badge {
  position: relative;
  z-index: 1;
  font-size: 0.7rem;
  font-weight: 700;
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
  letter-spacing: 0.03em;
}
</style>
