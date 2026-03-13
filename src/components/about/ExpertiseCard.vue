<template>
  <div class="glass-card group cursor-default">
    <!-- Icon -->
    <div
      class="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300
             group-hover:scale-110"
      :style="{ background: `${color}15`, border: `1px solid ${color}30` }"
    >
      <Icon :icon="icon" width="22" :style="{ color }" />
    </div>

    <!-- Title -->
    <h3 class="text-text-primary font-semibold text-base mb-2 group-hover:text-accent-light transition-colors duration-300">
      {{ title }}
    </h3>

    <!-- Description -->
    <p class="text-text-muted text-sm leading-relaxed">
      {{ description }}
    </p>

    <!-- Tags -->
    <div v-if="tags?.length" class="mt-4 flex flex-wrap gap-2">
      <span v-for="tag in tags" :key="tag" class="tag-chip">
        {{ tag }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

defineProps<{
  icon: string
  title: string
  description: string
  color?: string
  tags?: string[]
}>()
</script>
