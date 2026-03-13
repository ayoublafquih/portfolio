<template>
  <AppPageLoader v-if="loading" @done="loading = false" />
  <AppLayout v-else>
    <RouterView />
  </AppLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AppPageLoader from '@/components/AppPageLoader.vue'
import AppLayout from '@/components/AppLayout.vue'

const loading = ref(true)
</script>
