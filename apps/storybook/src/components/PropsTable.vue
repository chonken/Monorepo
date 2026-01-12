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
      <tr v-for="(datas, name, index) in info" :key="index">
        <th class="px-4 py-2 text-end border bg-[var(--bg-main-3)]">{{ name }}</th>
        <td class="px-4 py-2 border bg-[var(--bg-main-1)]">???</td>
        <td class="px-4 py-2 border bg-[var(--bg-main-1)]">
          <p class="mt-0">
            <span>預設值: {{ typeof datas === 'string' ? `'${datas}'` : datas }}</span>
          </p>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { toRefs } from 'vue'

interface Props {
  props?: Record<string, Record<string, any>>
}
const props = defineProps<Props>()
const { props: info } = toRefs(props)
</script>
