<template>
  <table class="mx-auto mt-10 max-w-6xl border">
    <thead>
      <tr>
        <th class="px-6 py-2.5 text-center font-bold text-xl border bg-[var(--bg-main-4)]">屬性名</th>
        <th class="px-6 py-2.5 text-center font-bold text-xl border bg-[var(--bg-main-4)]">資料型態</th>
        <th class="px-6 py-2.5 text-center font-bold text-xl border bg-[var(--bg-main-4)]">說明</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="({ props, type, optional }, index) in info" :key="index">
        <th class="px-4 py-2 text-end border bg-[var(--bg-main-3)]">{{ props }}</th>
        <td class="px-4 py-2 border bg-[var(--bg-main-1)]">
          <p>{{ type }}</p>
        </td>
        <td class="px-4 py-2 border bg-[var(--bg-main-1)]">
          <p>預設值: {{ findDefaultProps(props) }}</p>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { toRefs } from 'vue'

interface Props {
  props?: Record<string, any>
  defaultProps?: Record<string, any>
}
const props = defineProps<Props>()
const { props: info, defaultProps } = toRefs(props)

const findDefaultProps = (props: string): unknown => {
  const result = defaultProps.value?.[props]
  if (result === undefined) return '無'
  if (typeof result === 'string') return `'${result}'`
  return result
}
</script>
