<template>
  <!-- 應根據是否有 mobile 來決定要不要用 RWDIframe -->
  <!-- 缺少展示用的資訊 -->
  <!-- <ResponsiveIframe v-if="structure === 'Layouts'" :name="name" />
  <DynamicModule v-else="structure === 'Components'" :name="name" :props="{ color: 'red' }" :slots="{ default: '你好世界' }" /> -->

  <DynamicModule :name="name" :demo="demo" />
</template>
<script setup lang="ts">
import ResponsiveIframe from '../components/ResponsiveIframe.vue'
import DynamicModule from '../views/DynamicModule.vue'
import type { Demo } from '../types'

interface Props {
  name: string
  demo: Demo | undefined
}
const props = defineProps<Props>()
const { name, demo } = props
</script>
<style></style>
