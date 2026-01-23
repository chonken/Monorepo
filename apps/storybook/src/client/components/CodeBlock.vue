<template>
  <div>
    <div class="flex justify-between items-center mb-3">
      <div class="font-semibold tracking-wide">原始碼</div>
      <button @click="copy" class="px-3 py-1.5 rounded-lg border border-slate-700 text-sm text-slate-200 hover:border-sky-400 hover:text-sky-400 transition">
        {{ copied ? '已複製' : '複製' }}
      </button>
    </div>

    <pre class="bg-slate-950 rounded-xl p-4 overflow-x-auto text-sm leading-relaxed text-slate-200">
<code>{{ code }}</code>
    </pre>
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs } from 'vue'

interface Props {
  code: string
}
const props = defineProps<Props>()
const { code } = toRefs(props)

const copied = ref(false)

async function copy() {
  try {
    await navigator.clipboard.writeText(code.value)
    copied.value = true
    setTimeout(() => (copied.value = false), 1500)
  } catch (e) {
    alert('複製失敗，請手動選取')
  }
}
</script>
