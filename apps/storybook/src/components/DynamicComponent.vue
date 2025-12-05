<template>
  <div v-html="html"></div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getSlotContent } from '../utils/slotFormatter.ts'

interface Props {
  name: string
  props?: Record<string, unknown>
  content?: string
  contentsStyle?: Record<string, string>
}
const props = withDefaults(defineProps<Props>(), {})
const { name, props: params, content, contentsStyle } = props

const html = ref('')
onMounted(async () => {
  html.value = await fetch(`render/${name}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      props: params,
      slots: content && (await getSlotContent(content, contentsStyle)),
    }),
  }).then((res) => res.text())
})
</script>
