<template>
  <div class="glass-card skill-category-card">
    <!-- Category header -->
    <div class="flex items-center gap-3 mb-5">
      <div
        class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
        :style="{ background: `${color}15`, border: `1px solid ${color}30` }"
      >
        <Icon :icon="icon" width="18" :style="{ color }" />
      </div>
      <h3 class="text-text-primary font-semibold text-base">{{ category }}</h3>
    </div>

    <!-- Skills list -->
    <div class="flex flex-wrap gap-2">
      <SkillBadge
        v-for="skill in skills"
        :key="skill.name"
        :name="skill.name"
        :icon="skill.icon"
        :color="color"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import SkillBadge from './SkillBadge.vue'

defineProps<{
  category: string
  icon: string
  color: string
  skills: { name: string; icon?: string }[]
}>()
</script>
