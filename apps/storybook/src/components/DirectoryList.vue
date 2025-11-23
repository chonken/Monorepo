<template>
  <ul :class="mergeClasses(classList, ['text-[var(--text-main-1)]'])">
    <li v-for="list in items" :key="list.href">
      <!-- 最好是做個下拉按鈕 -->
      <div v-if="list.children?.length" :class="'block py-1 ps-3 rounded-md' + (hrefToId(list.href) === active ? ' bg-[var(--bg-accent-2)]' : '')">
        {{ list.label }}
        <DirectoryList v-if="list.children?.length" :items="list.children" :model-value="modelValue" :scroll-target="scrollTarget" :root-margin="rootMargin" />
      </div>
      <a v-else :href="list.href" :class="'block py-1 ps-3 pe-1 rounded-md hover:bg-[var(--bg-accent-1)]' + (hrefToId(list.href) === active ? ' bg-[var(--bg-accent-2)]' : '')" @click="onSelect(list.href)">
        {{ list.label }}
      </a>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { mergeClasses } from '@utils'
import { computed, onMounted, onBeforeUnmount, watch, ref } from 'vue'

interface Item {
  href: string
  label: string
  children?: Item[]
}
interface Props {
  class?: string
  items: Item[]
  modelValue?: string
  scrollTarget?: string | Element | null
  rootMargin?: string
}

const props = withDefaults(defineProps<Props>(), {
  scrollTarget: null,
  rootMargin: '-60px 0px 20% 0px',
})
const emit = defineEmits<{ (e: 'update:modelValue', id: string): void }>()
const { items = [], class: classList = '' } = props

// 自身決定或從外部雙向綁定 active 狀態
const temp = ref<string>(props.modelValue || '')
const active = computed<string>({
  get: () => props.modelValue ?? temp.value,
  set: (v) => {
    temp.value = v
    emit('update:modelValue', v)
  },
})
watch(
  () => props.modelValue,
  (v) => {
    if (v !== undefined) active.value = v
  }
)

// href取消#號
function hrefToId(h: string) {
  return h?.startsWith('#') ? h.slice(1) : h
}

// 點擊時先同步 active
function onSelect(href: string) {
  active.value = hrefToId(href)
}

// 把IntersectionObserver改掉，滾輪不會觸發所有的元素，導致剛進畫面的元素被單獨偵測並覆蓋bestRatio，結果就是跳來跳去
let io: IntersectionObserver | null = null
let rootEl: Element | null = null

function resolveRoot(target: Props['scrollTarget']) {
  if (!target) return null
  return typeof target === 'string' ? document.querySelector(target) : target
}

// 收集所有層級的 id（從 href 提取）
function collectIds(list: Item[], out: string[] = []) {
  for (const it of list) {
    const id = hrefToId(it.href)
    if (id) out.push(id)
    if (it.children?.length) collectIds(it.children, out)
  }
  return out
}

function handleIO(entries: IntersectionObserverEntry[]) {
  let bestId: string | null = null
  let bestRatio = 0
  for (const e of entries) {
    const id = e.target.getAttribute('id')
    if (!id) continue
    if (e.isIntersecting && e.intersectionRatio > bestRatio) {
      bestId = id
      bestRatio = e.intersectionRatio
    }
  }
  if (bestId) active.value = bestId
}

function setupObserver() {
  cleanupObserver()

  rootEl = resolveRoot(props.scrollTarget)
  io = new IntersectionObserver(handleIO, {
    root: rootEl,
    rootMargin: props.rootMargin,
    threshold: [0, 0.25, 0.5, 0.75, 1],
  })

  for (const id of collectIds(items)) {
    const el = document.getElementById(id)
    if (el) io.observe(el)
  }
}

function cleanupObserver() {
  io?.disconnect()
  io = null
}

onMounted(setupObserver)
onBeforeUnmount(cleanupObserver)
watch(() => [items, props.scrollTarget, props.rootMargin], setupObserver, { deep: true })
</script>
