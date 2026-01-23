<template>
  <div :class="mergeClasses(classList, ['relative', 'flex', 'items-center', 'cursor-text'])" data-input v-bind="$attrs" @click="onClickContainer">
    <input ref="inputRef" :id="id" type="text" name="search" :placeholder="placeholder" class="p-3 outline-none" @input="onInput" :value="modelValue" />
    <label :for="id" class="absolute top-3 left-3 transition-all border-l-0 border-transparent pointer-events-none">
      {{ title }}
    </label>
    <fieldset class="absolute inset-0 top-[-0.5em] text-xs px-1.5 rounded-sm border-2 border-gray-500 box-border pointer-events-none">
      <legend class="w-0 text-nowrap opacity-0 overflow-hidden">
        {{ title }}
      </legend>
    </fieldset>
    <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="10" cy="10" r="7"></circle>
      <line x1="15" y1="15" x2="21" y2="21"></line>
    </svg>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { mergeClasses } from '@utils'

interface Props {
  id: string
  class?: string
  title?: string
  placeholder?: string
  modelValue: string
}
const props = withDefaults(defineProps<Props>(), {
  title: '搜尋',
  placeholder: '請輸入關鍵字...',
})
const { id, class: classList = '', title, placeholder } = props

const inputRef = ref<HTMLInputElement | null>(null)
const onClickContainer = () => {
  inputRef.value?.focus()
}

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

// input 事件處理
const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<style scoped>
@reference "@tailwind";

input::placeholder {
  @apply text-transparent;
}
input:focus::placeholder {
  @apply text-[var(--text-main-1)] opacity-50;
}

input:focus ~ label,
input:not(:placeholder-shown) ~ label {
  @apply top-[-0.5em] text-xs border-l-2;
}
[data-input]:hover fieldset,
input:focus ~ fieldset {
  @apply border-[var(--border-1)];
}
input:focus ~ fieldset legend,
input:not(:placeholder-shown) ~ fieldset legend {
  @apply w-auto px-1.5;
}
</style>
