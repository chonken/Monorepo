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
}
const props = withDefaults(defineProps<Props>(), {})
const { name, props: params, content } = props

const html = ref('')
onMounted(async () => {
  console.log(content && getSlotContent(content))
  html.value = await fetch(`render/${name}?href=#${name}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      props: params,
      slots: content && getSlotContent(content),
    }),
  }).then((res) => res.text())
})
</script>
