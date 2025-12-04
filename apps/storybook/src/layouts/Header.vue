<template>
  <header class="sticky flex px-8 items-center top-0 z-2 w-full h-16 bg-[var(--bg-main-3)]">
    <h1 class="absolute -z-1 inset-0 flex items-center justify-center font-bold text-center text-2xl">Storybook</h1>
    <ThemeToggle />
  </header>
</template>

<script setup lang="ts">
import ThemeToggle from '../components/ThemeToggle.vue'
</script>
