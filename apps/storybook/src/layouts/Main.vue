<template>
  <aside class="relative z-2 w-72 h-screen shrink-0 bg-[var(--bg-main-2)]">
    <nav class="flex flex-col w-full h-full">
      <div class="p-4 border-b border-[var(--border-main-1)]">
        <h1 class="text-xl font-bold text-[var(--text-main-1)]">組件目錄</h1>
        <SearchBox id="searchComponent2" v-model="searchTerm" class="mt-4" title="搜索元件" />
      </div>
      <div class="p-4 overflow-y-auto">
        <div v-for="group in filteredData" :key="group.structure">
          <div class="mt-4 mb-1 text-sm font-bold text-[var(--text-main-1)]">{{ group.structure }}</div>
          <DirectoryList :items="group.items" :key="searchTerm" scrollTarget="#main" />
        </div>
      </div>
    </nav>
  </aside>
  <main class="relative z-1 flex flex-col w-full min-w-0 h-full flex-1">
    <Header />
    <div id="main" class="relative z-1 w-full h-full px-[5%] overflow-x-hidden overflow-y-auto">
      <div class="w-full">
        <DisplatModules :list="list" />
      </div>
    </div>
  </main>
</template>
<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
import { typeOfLayouts, typeOfComponents } from '../utils/AsyncImportDemo.js'
import DisplatModules from '../layouts/DisplatModules.vue'
import DirectoryList from '../components/DirectoryList.vue'
import SearchBox from '../components/SearchBox.vue'
import Header from '../layouts/Header.vue'
import regist from '../save/registModules.json' with { type: 'json' }
import demo from '../save/demo.json' with { type: 'json' }

const list = ref<{ structure: string; items: any[] }[]>([])
const searchTerm = ref('')
const tableOfContents = ref<{ structure: string; items: any[] }[]>([])

const pathRegex = /^(\.\.\/)+|\/[^/]+$/g

// 篩選關鍵字
const filteredData = computed(() =>
  tableOfContents.value.map((group) => ({
    structure: group.structure,
    items: group.items.filter((item) => item.label.toLowerCase().includes(searchTerm.value.toLowerCase())),
  })),
)

const formatList = (globObj: Record<string, () => Promise<unknown>>) => {
  const entries = Object.entries(globObj)
  return Promise.all(
    entries.map(async ([p, promise]: [string, any]) => {
      const component = await promise()
      const path = p.replace(pathRegex, '')
      return {
        path,
        name: path.split('/').at(-1) ?? 'Unknown',
        id: component.id,
        props: component.props,
        slots: component.slots,
        categorys: regist[component.id as keyof typeof regist]?.categorys,
        keywords: regist[component.id as keyof typeof regist]?.keywords,
        demos: demo[component.id as keyof typeof demo] ?? [],
      }
    }),
  )
}

onMounted(async () => {
  list.value = [
    { structure: 'Components', items: await formatList(typeOfComponents) },
    { structure: 'Layouts', items: await formatList(typeOfLayouts) },
  ]
  tableOfContents.value = list.value.map((group) => ({
    structure: group.structure,
    items: group.items.map(({ name }) => ({ href: '#component' + name, label: name })),
  }))
})
</script>
<style lang=""></style>
