<template>
  <header
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      scrolled
        ? 'bg-bg-primary/90 backdrop-blur-md border-b border-surface-border shadow-lg shadow-black/20'
        : 'bg-transparent',
    ]"
  >
    <nav class="max-w-6xl mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
      <!-- Logo / Initials -->
      <RouterLink
        to="/"
        class="flex items-center gap-2 group"
        :aria-label="$t('nav.home')"
      >
        <div
          class="w-9 h-9 rounded-lg bg-accent/10 border border-accent/30 flex items-center justify-center
                 group-hover:bg-accent/20 group-hover:border-accent/60 transition-all duration-300"
        >
          <span class="text-accent font-bold text-sm tracking-tight">{{ config.name.initials }}</span>
        </div>
        <span class="hidden sm:block text-text-secondary text-sm font-medium group-hover:text-text-primary transition-colors">
          {{ config.name.full }}
        </span>
      </RouterLink>

      <!-- Desktop Nav -->
      <ul class="hidden md:flex items-center gap-1">
        <li v-for="link in navLinks" :key="link.to">
          <RouterLink
            :to="link.to"
            class="relative px-4 py-2 text-sm font-medium text-text-muted rounded-lg
                   transition-all duration-200 hover:text-text-primary hover:bg-surface group"
            active-class="text-text-primary"
          >
            <span class="relative z-10">{{ $t(link.labelKey) }}</span>
            <!-- Active indicator dot -->
            <span
              class="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent
                     opacity-0 group-[.router-link-active]:opacity-100 transition-opacity duration-200"
            />
          </RouterLink>
        </li>
      </ul>

      <!-- Right actions -->
      <div class="flex items-center gap-2">
        <!-- Language switcher -->
        <button
          class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-text-muted hover:text-text-primary
                 hover:bg-surface transition-all duration-200 text-xs font-semibold tracking-wide border border-transparent
                 hover:border-surface-border"
          :aria-label="locale === 'en' ? 'Passer en français' : 'Switch to English'"
          @click="switchLocale"
        >
          <Icon icon="mdi:translate" width="15" />
          <span>{{ locale === 'en' ? 'FR' : 'EN' }}</span>
        </button>

        <!-- GitHub link -->
        <a
          :href="config.links.github"
          target="_blank"
          rel="noopener noreferrer"
          class="p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface transition-all duration-200"
          aria-label="GitHub"
        >
          <Icon icon="mdi:github" width="20" />
        </a>

        <!-- LinkedIn link -->
        <a
          :href="config.links.linkedin"
          target="_blank"
          rel="noopener noreferrer"
          class="p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface transition-all duration-200"
          aria-label="LinkedIn"
        >
          <Icon icon="mdi:linkedin" width="20" />
        </a>

        <!-- Mobile menu toggle -->
        <button
          class="md:hidden p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface transition-all duration-200"
          :aria-label="$t('nav.toggleMenu')"
          @click="mobileOpen = !mobileOpen"
        >
          <Icon :icon="mobileOpen ? 'mdi:close' : 'mdi:menu'" width="20" />
        </button>
      </div>
    </nav>

    <!-- Mobile menu -->
    <Transition name="mobile-menu">
      <div
        v-if="mobileOpen"
        class="md:hidden bg-bg-secondary/95 backdrop-blur-md border-b border-surface-border"
      >
        <ul class="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-1">
          <li v-for="link in navLinks" :key="link.to">
            <RouterLink
              :to="link.to"
              class="block px-4 py-3 text-sm font-medium text-text-muted rounded-xl
                     hover:text-text-primary hover:bg-surface transition-all duration-200"
              active-class="text-text-primary bg-surface"
              @click="mobileOpen = false"
            >
              {{ $t(link.labelKey) }}
            </RouterLink>
          </li>
        </ul>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useWindowScroll } from '@vueuse/core'
import { Icon } from '@iconify/vue'
import { config } from '@/config'

const { locale } = useI18n({ useScope: 'global' })
const { y: scrollY } = useWindowScroll()
const scrolled = computed(() => scrollY.value > 20)
const mobileOpen = ref(false)

const navLinks = [
  { to: '/', labelKey: 'nav.home' },
  { to: '/about', labelKey: 'nav.about' },
  { to: '/experience', labelKey: 'nav.experience' },
  { to: '/skills', labelKey: 'nav.skills' },
  { to: '/contact', labelKey: 'nav.contact' },
]

function switchLocale() {
  const next = locale.value === 'en' ? 'fr' : 'en'
  locale.value = next
  localStorage.setItem('locale', next)
}

const route = useRoute()
watch(() => route.path, () => {
  mobileOpen.value = false
})
</script>

<style scoped>
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: all 0.25s ease;
}
.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
