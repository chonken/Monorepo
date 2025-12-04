<template>
  <aside class="relative z-2 w-72 h-screen shrink-0 bg-[var(--bg-main-2)]">
    <nav class="flex flex-col w-full h-full">
      <div class="p-4 border-b border-[var(--border-main-1)]">
        <h1 class="text-xl font-bold text-[var(--text-main-1)]">組件目錄</h1>
        <SearchBox id="searchComponent2" v-model="searchTerm" class="mt-4" title="搜索元件" />
      </div>
      <div class="p-4 overflow-y-auto">
        <div v-for="group in filteredData" :key="group.category">
          <div class="mt-4 mb-1 text-sm font-bold text-[var(--text-main-1)]">{{ group.category }}</div>
          <DirectoryList :items="group.items" :key="searchTerm" scrollTarget="#main" />
        </div>
      </div>
    </nav>
  </aside>
  <main class="relative z-1 flex flex-col w-full min-w-0 h-full flex-1">
    <Header />
    <div id="main" class="relative z-1 w-full h-full px-[5%] overflow-x-hidden overflow-y-auto">
      <div class="w-full">
        <DisplatModules />
      </div>
    </div>
  </main>
</template>
<script lang="ts" setup>
import { ref, computed } from 'vue'
import DisplatModules from '../layouts/DisplatModules.vue'
import DirectoryList from '../components/DirectoryList.vue'
import SearchBox from '../components/SearchBox.vue'
import Header from '../layouts/Header.vue'

interface Props {
  data: Array<{
    category: string
    items: Array<{
      href: string
      label: string
    }>
  }>
}

const props = withDefaults(defineProps<Props>(), {})
const { data = [] } = props

const searchTerm = ref('')

// 篩選關鍵字
const filteredData = computed(() =>
  data.map((group) => ({
    category: group.category,
    items: group.items.filter((item) => item.label.toLowerCase().includes(searchTerm.value.toLowerCase())),
  })),
)
</script>
<style lang=""></style>
