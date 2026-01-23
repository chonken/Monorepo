<template>
  <div class="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
    <div class="flex justify-between items-center mb-3 gap-3">
      <div class="flex gap-2">
        <button v-for="(tab, i) in tabs" :key="tab" @click="activeTab = i" :class="['px-4 py-1.5 rounded-full border text-sm transition', activeTab === i ? 'border-sky-400 text-sky-400 bg-sky-400/10' : 'border-slate-700 text-slate-200 hover:border-sky-400 hover:text-sky-400']">
          {{ tab }}
        </button>
      </div>

      <button @click="toggleRaw" class="px-4 py-1.5 rounded-full border border-slate-700 text-sm text-slate-200 hover:border-sky-400 hover:text-sky-400 transition">
        {{ showRaw ? 'Preview' : 'Raw' }}
      </button>
    </div>

    <div v-if="!showRaw" class="min-h-[240px] flex items-center justify-center border-2 border-dashed border-slate-700 rounded-xl text-slate-400 text-sm">
      <!-- 組件實際效果插槽 -->
      <slot name="preview">組件實際效果展示區（留空）</slot>
    </div>

    <CodeBlock v-else :code="codes[activeTab]" />
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs } from 'vue'
import CodeBlock from './CodeBlock.vue'

interface Props {
  tabs?: string[]
  codes: string[]
}
const props = withDefaults(defineProps<Props>(), {
  tabs: () => ['範例一', '範例二', '範例三'],
})

const { tabs, codes } = toRefs(props)

const activeTab = ref(0)
const showRaw = ref(false)

function toggleRaw() {
  showRaw.value = !showRaw.value
}
</script>
