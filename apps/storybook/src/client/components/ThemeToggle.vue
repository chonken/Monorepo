<template>
  <div ref="themeToggle" :class="mergeClasses(classList, ['relative', 'z-1', 'flex', 'items-center', 'ml-auto', 'gap-[1em]', 'px-[0.8em]', 'pt-[0.5em]', 'pb-[0.45em]', 'rounded-full', 'text-white', 'bg-black', 'opacity-75', 'hover:opacity-100', 'transition-all', 'duration-200', 'cursor-pointer'])" v-bind="$attrs" @click="onToggle">
    <div class="absolute inset-[0.125em] pointer-events-none">
      <div ref="themeBackgroud" class="w-[2.6em] h-full rounded-full bg-white mix-blend-difference transition-[translate] duration-800"></div>
    </div>
    <i class="fa-solid fa-moon text-white"></i>
    <i class="fa-solid fa-sun text-white"></i>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { mergeClasses } from '@utils'
import config from '../../save/config.json' with { type: 'json' }

interface Props {
  class?: string
}
const props = defineProps<Props>()
const { class: classList = '' } = props

const themeBackgroud = ref<HTMLDivElement | null>(null)
const themeToggle = ref<HTMLDivElement | null>(null)

const themeSet = () => {
  if (document.body.classList.contains('dark')) {
    themeBackgroud.value?.classList.remove('translate-x-[calc(2.25/2.6*100%)]')
    themeToggle.value?.classList.add('invert')
  } else {
    themeBackgroud.value?.classList.add('translate-x-[calc(2.25/2.6*100%)]')
    themeToggle.value?.classList.remove('invert')
  }
}

const onToggle = () => {
  document.body.classList.toggle('dark')
  themeSet()
}
</script>

<style scoped></style>
