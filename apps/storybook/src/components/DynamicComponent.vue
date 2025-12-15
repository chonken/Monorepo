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
  if (!demo) {
    html.value = await fetch(`render/${name}`).then((res) => res.text())
    return
  }

  const { props, slots } = await getContent(demo['category'], demo['styles'])
  switch (demo['category']) {
    case 'list':
      html.value = await fetch(`render/${name}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          path: '/List.astro',
          props: { ...demo['example'], ...props },
          slots: { ...demo['contents'], ...(await getListSlots(name, slots)) },
        }),
      }).then((res) => res.text())
      break
    default:
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
      break
  }
})
async function getListSlots(name: string, items: { default: string; marker: string }[]): Promise<{ default: string }> {
  let result = { default: '' }
  const itemHtml = await fetch(`render/${name}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      path: '/Item.astro',
      slots: {
        default: '<slot/>',
        marker: items[0].marker !== '' ? '<slot:marker/>' : undefined,
      },
    }),
  }).then((res) => res.text())
  for (const item of items) {
    result.default += itemHtml.replace('<slot/>', item.default).replace('<slot:marker/>', item.marker)
  }
  return result
}
</script>
