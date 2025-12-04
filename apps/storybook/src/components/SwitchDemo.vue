<template>
  <!-- 應根據是否有 mobile 來決定要不要用 RWDIframe -->
  <!-- 缺少展示用的資訊 -->
  <!-- <ResponsiveIframe v-if="structure === 'Layouts'" :name="name" />
  <DynamicComponent v-else="structure === 'Components'" :name="name" :props="{ color: 'red' }" :slots="{ default: '你好世界' }" /> -->
  <div>
    <DynamicComponent v-for="demo in demos" :key="demo.name" :name="name" :props="demo.example" :content="demo.content" />
  </div>
</template>
<script setup lang="ts">
import ResponsiveIframe from '../components/ResponsiveIframe.vue'
import DynamicComponent from '../components/DynamicComponent.vue'

type Demo = {
  name: string
  example: Record<string, unknown>
  content: string
  description: Record<string, unknown>
}
interface Props {
  name: string
  demos: Demo[]
}
const props = withDefaults(defineProps<Props>(), {})
const { name, demos } = props
</script>
<style></style>
