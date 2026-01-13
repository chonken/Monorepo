<template>
  <ul class="text-[var(--text-main-1)]">
    <li v-for="list in items" :key="list.href">
      <template v-if="list.children?.length">
        <button class="block w-full text-start py-1 ps-3 pe-1 rounded-md hover:bg-[var(--bg-accent-1)] cursor-pointer" @click="open = !open">{{ list.label }}</button>
        <transition @before-enter="elClose" @enter="elOpen" @leave="elClose" @before-leave="elOpen">
          <div v-show="open" :class="'ps-3 overflow-hidden transition-all duration-300' + (list.href === active ? ' bg-[var(--bg-accent-2)]' : '')">
            <DirectoryList v-if="list.children?.length" :items="list.children" v-model="active" />
          </div>
        </transition>
      </template>
      <a v-else :href="list.href" :class="'block py-1 ps-3 pe-1 rounded-md hover:bg-[var(--bg-accent-1)]' + (list.href === active ? ' bg-[var(--bg-accent-2)]' : '')" @click="onSelect(list.href)">
        {{ list.label }}
      </a>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { toRef, ref } from 'vue'

interface Item {
  href: string
  label: string
  children?: Item[]
}
interface Props {
  items: Item[]
}
const props = defineProps<Props>()
const active = defineModel<string>('active')
const manual = defineModel<boolean>('manual')

const items = toRef(props, 'items')
const open = ref<boolean>(true)

const onSelect = (href: string) => {
  manual.value = true
  active.value = href
  setTimeout(() => {
    manual.value = false
  }, 500)
}

const elClose = (el: Element) => {
  if (el instanceof HTMLElement) {
    el.style.height = '0'
  }
}
const elOpen = (el: Element) => {
  if (el instanceof HTMLElement) {
    el.style.height = el.scrollHeight + 'px'
  }
}
</script>

<style scoped></style>
