<template>
  <footer class="border-t border-surface-border bg-bg-secondary/50">
    <div class="max-w-6xl mx-auto px-6 lg:px-12 py-10">
      <div class="flex flex-col md:flex-row items-center justify-between gap-6">
        <!-- Brand -->
        <div class="flex items-center gap-3">
          <div
            class="w-8 h-8 rounded-lg bg-accent/10 border border-accent/30 flex items-center justify-center"
          >
            <span class="text-accent font-bold text-xs">AL</span>
          </div>
          <div>
            <p class="text-text-secondary text-sm font-medium">Ayoub Lafquih</p>
            <p class="text-text-muted text-xs">{{ $t('footer.role') }}</p>
          </div>
        </div>

        <!-- Nav links -->
        <nav class="flex items-center gap-6">
          <RouterLink
            v-for="link in footerLinks"
            :key="link.to"
            :to="link.to"
            class="text-text-muted text-sm hover:text-text-primary transition-colors duration-200"
          >
            {{ $t(link.labelKey) }}
          </RouterLink>
        </nav>

        <!-- Social links -->
        <div class="flex items-center gap-3">
          <a
            href="https://github.com/lafquihayoub"
            target="_blank"
            rel="noopener noreferrer"
            class="p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface transition-all duration-200"
            aria-label="GitHub"
          >
            <Icon icon="mdi:github" width="18" />
          </a>
          <a
            href="https://www.linkedin.com/in/ayoub-lafquih-js/"
            target="_blank"
            rel="noopener noreferrer"
            class="p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface transition-all duration-200"
            aria-label="LinkedIn"
          >
            <Icon icon="mdi:linkedin" width="18" />
          </a>
          <a
            href="mailto:lafquihayoub@gmail.com"
            class="p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface transition-all duration-200"
            aria-label="Email"
          >
            <Icon icon="mdi:email-outline" width="18" />
          </a>
        </div>
      </div>

      <!-- Bottom line -->
      <div class="mt-8 pt-6 border-t border-surface-border/50 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p class="text-text-muted text-xs">
          © {{ new Date().getFullYear() }} Ayoub Lafquih. {{ $t('footer.built') }}
        </p>
        <p class="text-text-muted text-xs">
          {{ $t('footer.location') }}
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

const footerLinks = [
  { to: '/about', labelKey: 'nav.about' },
  { to: '/experience', labelKey: 'nav.experience' },
  { to: '/skills', labelKey: 'nav.skills' },
  { to: '/contact', labelKey: 'nav.contact' },
]
</script>
