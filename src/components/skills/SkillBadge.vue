<template>
  <span
    class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium
           border transition-all duration-300 cursor-default
           hover:scale-105 hover:shadow-lg"
    :style="{
      backgroundColor: `${color}12`,
      borderColor: `${color}30`,
      color: color,
      boxShadow: hovered ? `0 4px 15px ${color}20` : undefined,
    }"
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
  >
    <Icon v-if="icon" :icon="icon" width="14" />
    {{ name }}
  </span>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

defineProps<{
  name: string
  icon?: string
  color?: string
}>()

const hovered = ref(false)
</script>
