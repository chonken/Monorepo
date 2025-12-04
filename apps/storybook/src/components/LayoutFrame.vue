<template>
  <div :class="classList">
    <ul class="flex flex-wrap justify-center gap-2">
      <li v-for="item in [...sizes]" :key="item" class="min-w-20">
        <button class="px-3 py-1.5 w-full text-center leading-tight bg-[var(--bg-inverted)] hover:bg-transparent text-[var(--text-inverted)] hover:text-[var(--text-elevated-2)] rounded-full border-[var(--bg-inverted)] border-2 transition cursor-pointer" :data-breakpoints="item" @click="changePoint(item)">
          {{ item }}
        </button>
      </li>
    </ul>
    <div ref="compRef" class="component mt-10 w-full">
      <div class="inner">
        <iframe ref="iframeRef" class="block w-full mx-auto outline-1 outline-red-500" :src="`getDemo/${name}`"></iframe>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { mergeClasses } from '@utils'
import breakpoint from '@config/breakpoint.json'

type Breakpoints = {
  '3xl': string
  '2xl': string
  'xl': string
  'lg': string
  'md': string
  'sm': string
  'xs': string
  '2xs': string
  'none': string
}
interface Props {
  class?: string
  name: string
  breakpoints?: (keyof Breakpoints)[]
  otherSize?: number[]
}
const props = withDefaults(defineProps<Props>(), {})
const { class: className = '', name, breakpoints = [], otherSize = [1920] } = props
const classList = mergeClasses(className, [''])

const iframeRef = ref<HTMLIFrameElement | null>(null)
const compRef = ref<HTMLDivElement | null>(null)

const sizes = [...otherSize, ...breakpoints.filter((size) => size !== 'none')]

// 之後改成設定預設值
let last = otherSize[0]

function onResize() {
  const iframe = iframeRef.value
  const comp = compRef.value
  if (!iframe || !comp) return

  const containerWidth = comp.clientWidth ?? 0
  const scale = containerWidth / last
  if (scale < 1) {
    iframe.style.zoom = scale + ''
    iframe.style.width = '100%'
  } else {
    iframe.style.zoom = '1'
    iframe.style.width = last + 'px'
  }
}

type Sizes = (typeof sizes)[number]
function changePoint(sizes: Sizes) {
  if (typeof sizes === 'number') {
    last = sizes
  } else {
    last = +breakpoint[sizes]?.slice(0, -2)
  }
  onResize()
}

onMounted(() => {
  const iframe = iframeRef.value
  if (iframe) {
    window.addEventListener('message', (event) => {
      if (event.data.iframeHeight) {
        iframe.style.height = event.data.iframeHeight + 'px'
      }
    })
  }

  onResize()
  window.addEventListener('resize', () => onResize())
})

onUnmounted(() => {
  window.removeEventListener('resize', () => onResize())
})
</script>
