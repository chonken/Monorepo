<template>
  <article>
    <PreviewPanel :name="name" :path="path" :demos="demos" />
  </article>
</template>
<script setup lang="ts">
import { toRefs } from 'vue'
import PreviewPanel from '../components/PreviewPanel.vue'
import type {  Item } from '../types';

interface Props {
  item: Item
}
const props = defineProps<Props>()

const { item } = toRefs(props)
const { name, path, demos } = toRefs(item.value)
</script>
