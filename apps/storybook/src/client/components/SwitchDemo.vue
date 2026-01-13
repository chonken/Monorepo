<template>
  <!-- 應根據是否有 mobile 來決定要不要用 RWDIframe -->
  <!-- 缺少展示用的資訊 -->
  <!-- <ResponsiveIframe v-if="structure === 'Layouts'" :name="name" />
  <DynamicComponent v-else="structure === 'Components'" :name="name" :props="{ color: 'red' }" :slots="{ default: '你好世界' }" /> -->

  <DynamicComponent v-if="demos.length > 0" :name="name" v-for="demo in demos" :key="demo.name" :demo="demo" />
  <DynamicComponent v-else :name="name" />
</template>
<script setup lang="ts">
import ResponsiveIframe from '../components/ResponsiveIframe.vue'
import DynamicComponent from '../views/DynamicComponent.vue'
import type { Demo } from '../../types'

interface Props {
  name: string
  demos: Demo[]
}
const props = defineProps<Props>()
const { name, demos } = props
</script>
<style></style>
