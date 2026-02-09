<template>
  <div class="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
    <div class="flex justify-between items-center mb-3 gap-3">
      <div class="flex gap-2">
        <button v-for="(demo, i) in demos" :key="demo.name" @click="activeTab = i" :class="['px-4 py-1.5 rounded-full border text-sm transition', activeTab === i ? 'border-sky-400 text-sky-400 bg-sky-400/10' : 'border-slate-700 text-slate-200 hover:border-sky-400 hover:text-sky-400']">
          {{ demo.name }}
        </button>
      </div>
      <button @click="toggleRaw" class="px-4 py-1.5 rounded-full border border-slate-700 text-sm text-slate-200 hover:border-sky-400 hover:text-sky-400 transition">
        {{ showRaw ? '預覽' : '原始碼' }}
      </button>
    </div>
    <div v-if="!showRaw" class="min-h-[240px] flex items-center justify-center border-2 border-dashed border-slate-700 rounded-xl text-slate-400 text-sm">
      <DisplayDemo :name="name" :demo="demos[activeTab]"></DisplayDemo>
    </div>
    <CodeBlock v-else :code="code" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, toRefs } from 'vue'
import CodeBlock from './CodeBlock.vue'
import DisplayDemo from './DisplayDemo.vue'
import type { Demo } from '../types'

interface Props {
  name: string
  path: string
  demos: Demo[]
}
const props = defineProps<Props>()

const { name, demos, path } = toRefs(props)

const activeTab = ref(0)
const showRaw = ref(false)
const code = computed(() => generateCode(demos.value[activeTab.value]))

function toggleRaw() {
  showRaw.value = !showRaw.value
}
function generateCode(demo: Demo) {
  const alias = '@' + path.value.split('/').slice(1, -1).join('/')
  // 尚未考慮組合組件
  const importText = `<!-- import ${name.value} from ${alias} -->`
  const props = Object.keys(demo.example)
    .map((key) => `${key}=${typeof demo.example[key] === 'string' ? `"${demo.example[key]}"` : demo.example[key]}`)
    .join(' ')
  const slots = Object.keys(demo.contents)
    .map((key) => (key === 'default' ? demo.contents[key] : `<slot name="${key}">${demo.contents[key]}</slot>`))
    .join('\n')
  const code = `${importText}
<${name.value} ${props}>${slots ? '\n' + slots + '\n' : ''}</${name.value}>`

  return code
}
</script>
