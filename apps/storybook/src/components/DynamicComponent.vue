<template>
  <div v-html="html"></div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import getContent from '../utils/getContent.ts'
import type { Demo } from '../types'

interface Props {
  name: string
  demo?: Demo
}
const props = defineProps<Props>()
const { name, demo } = props

const html = ref('')
onMounted(async () => {
  if (demo) {
    const { props, slots } = await getContent(demo['category'], demo['styles'])
    html.value = await fetch(`render/${name}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        props: { ...demo['example'], ...props },
        slots: { ...demo['contents'], ...slots },
      }),
    }).then((res) => res.text())
  } else {
    html.value = await fetch(`render/${name}`).then((res) => res.text())
  }
})
</script>
