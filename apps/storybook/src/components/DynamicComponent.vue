<template>
  <div v-html="html"></div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'

interface Props {
  name: string
  props?: Record<string, unknown>
  slots?: Record<string, string>
}
const props = withDefaults(defineProps<Props>(), {})
const { name, props: params, slots } = props

const html = ref('')
onMounted(async () => {
  html.value = await fetch(`render/${name}?href=#${name}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      props: params,
      slots,
    }),
  }).then((res) => res.text())
})
</script>
