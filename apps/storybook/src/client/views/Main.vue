<template>
  <aside class="relative z-2 w-72 h-screen shrink-0 bg-[var(--bg-main-2)]">
    <nav class="flex flex-col w-full h-full">
      <div class="p-4 border-b border-[var(--border-main-1)]">
        <h1 class="text-xl font-bold text-[var(--text-main-1)]">組件目錄</h1>
        <SearchBox id="searchComponent2" v-model="searchTerm" class="mt-4" title="搜索元件" />
      </div>
      <div class="p-4 overflow-y-auto">
        <template v-for="group in directoryTags" :key="group.structure">
          <template v-if="group.items.length > 0">
            <div class="mt-4 mb-1 text-sm font-bold text-[var(--text-main-1)]">{{ group.structure }}</div>
            <!-- 紀錄: 目前是根據 IntersectionObserver 決定 active，會導致按後排目錄時，當目錄高度不夠，active不會是對應按鈕，解決方式是加上 manual 標記是否是手動點擊的，是的話就不更新 -->
            <DirectoryList :items="group.items" v-model:active="active" v-model:manual="manual" />
          </template>
        </template>
      </div>
    </nav>
  </aside>
  <main class="relative z-1 flex flex-col w-full min-w-0 h-full flex-1">
    <Header />
    <div ref="scrollRoot" class="relative z-1 w-full h-full px-[5%] pb-[10%] overflow-x-hidden overflow-y-auto">
      <!-- 紀錄: 除了created和有before外，子組件的生命週期順序都先於父組件，所以雙方都在onMounted寫程式時，子組件onMounted的程式是不會有父組件在onMounted的更新，解法是子組件用watch監聽父組件的關鍵數據 -->
      <DisplayModules :list="info.list" v-model:sections="sections" />
    </div>
  </main>
</template>
<script lang="ts" setup>
import { ref, onMounted, computed, onBeforeUnmount, watch } from 'vue'
import DisplayModules from '../layouts/DisplayModules.vue'
import DirectoryList from '../components/DirectoryList.vue'
import SearchBox from '../components/SearchBox.vue'
import Header from '../layouts/Header.vue'
import getInfo, { type Info } from '../../utils/getInfo.js'

const info = ref<Info>({ list: [], idMap: new Map(), nameMap: new Map() })
const searchTerm = ref<string>('')
const tableOfContents = ref<{ structure: string; items: any[] }[]>([])
const scrollRoot = ref<HTMLElement | null>(null)

// 根據 searchTerm 更新篩選 items
const directoryTags = computed(() =>
  tableOfContents.value.map((group) => ({
    structure: group.structure,
    items: group.items.filter((item) => item.label.toLowerCase().includes(searchTerm.value.toLowerCase())),
  })),
)

onMounted(async () => {
  info.value = await getInfo()
  tableOfContents.value = info.value.list.map((group) => ({
    structure: group.structure,
    items: [
      ...group.items.map(({ name }) => ({ href: '#component' + name, label: name })),
      {
        href: '#a',
        label: 'test1',
        children: [
          { href: '#a-1', label: 'test1-1' },
          { href: '#a-2', label: 'test1-2' },
        ],
      },
    ],
  }))
})

// IntersectionObserver 實現動態更新
const active = ref<string>('')
const manual = ref<boolean>(false)
let observer: IntersectionObserver | null = null
const ratioMap = new Map<string, number>()
const sections = ref<HTMLElement[]>()
watch(sections, (newSections, oldSections) => {
  oldSections?.forEach((sec) => {
    ratioMap.clear()
    return observer?.unobserve(sec)
  })
  newSections?.forEach((sec) => {
    ratioMap.set(sec.id, 0)
    return observer?.observe(sec)
  })
})
onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      // 更新 ratioMap，取出占比最高的元素作為當前節點
      for (const e of entries) {
        const id = e.target.id
        if (!id) continue
        ratioMap.set(id, e.intersectionRatio)
      }
      let bestId: string | null = null
      let bestRatio = 0
      for (const [id, ratio] of ratioMap.entries()) {
        if (ratio > bestRatio) {
          bestId = id
          bestRatio = ratio
        }
      }
      if (!manual.value && bestId) active.value = '#' + bestId
    },
    {
      root: scrollRoot.value,
      threshold: [0, 0.25, 0.5, 0.75, 1],
    },
  )
})
onBeforeUnmount(() => {
  if (observer) observer.disconnect()
})
</script>
