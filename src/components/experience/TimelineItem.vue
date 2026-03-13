<template>
  <div
    class="relative pl-8 md:pl-12 pb-12 last:pb-0 group"
  >
    <!-- Timeline line -->
    <div
      class="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-accent/40 via-surface-border to-transparent
             group-last:bg-gradient-to-b group-last:from-accent/40 group-last:to-transparent"
    />

    <!-- Timeline dot -->
    <div
      class="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-accent border-2 border-bg-primary
             -translate-x-[3px] group-hover:scale-150 group-hover:shadow-lg group-hover:shadow-accent/30
             transition-all duration-300"
    />

    <!-- Card -->
    <div class="glass-card group-hover:border-accent/40 transition-all duration-300">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
        <div>
          <h3 class="text-text-primary font-bold text-lg leading-tight">{{ role }}</h3>
          <div class="flex items-center gap-2 mt-1">
            <span class="text-accent-light font-medium text-sm">{{ company }}</span>
            <span class="text-surface-border">·</span>
            <span class="text-text-muted text-sm">{{ location }}</span>
          </div>
        </div>

        <div class="flex-shrink-0">
          <span
            class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium
                   bg-accent/10 border border-accent/20 text-accent-light whitespace-nowrap"
          >
            <Icon icon="mdi:calendar-outline" width="12" />
            {{ period }}
          </span>
        </div>
      </div>

      <!-- Bullets -->
      <ul class="space-y-2 mb-5">
        <li
          v-for="item in bullets"
          :key="item"
          class="flex items-start gap-2.5 text-text-muted text-sm leading-relaxed"
        >
          <Icon icon="mdi:arrow-right" width="14" class="text-accent/60 flex-shrink-0 mt-0.5" />
          {{ item }}
        </li>
      </ul>

      <!-- Stack -->
      <div v-if="stack?.length" class="flex flex-wrap gap-2">
        <span v-for="tech in stack" :key="tech" class="tag-chip">{{ tech }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

defineProps<{
  role: string
  company: string
  location: string
  period: string
  bullets: string[]
  stack?: string[]
}>()
</script>
