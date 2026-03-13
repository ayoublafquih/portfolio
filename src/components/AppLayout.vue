<template>
  <div class="min-h-screen bg-bg-primary text-text-primary font-sans">
    <AppNavBar />
    <main>
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppNavBar from '@/components/AppNavBar.vue'
import AppFooter from '@/components/AppFooter.vue'
</script>
