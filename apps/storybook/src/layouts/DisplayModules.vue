<template>
  <!-- 紀錄: 如果用解構來提取屬性的話，會讓響應式數據失效 -->
  <article v-for="{ structure, items } in list" :key="structure">
    <h2 class="font-bold my-15 text-5xl">{{ structure }}</h2>
    <section ref="sections" v-for="{ path, name, props, slots, categorys, keywords, demos } in items" :key="name" :id="'component' + name" class="mt-10">
      <h3 class="font-bold text-4xl">{{ name }}</h3>
      <small class="inline-block mt-4 px-3.5 py-0.5 text-sm italic rounded-lg bg-[var(--bg-elevated-4)]">
        {{ path }}
      </small>
      <!-- <ul>
        <li v-for="keyword in keywords" :key="keyword">
          {{ keyword }}
        </li>
      </ul> -->
      <div class="mt-10">
        <SwitchDemo :name="name" :demos="demos" />
      </div>
      <!-- <PropsTable :props="props" /> -->
    </section>
  </article>
</template>

<script setup lang="ts">
import { ref, toRefs, watch, nextTick } from 'vue'
import SwitchDemo from '../components/SwitchDemo.vue'

interface Props {
  list: { structure: string; items: any[] }[]
}
const props = defineProps<Props>()
const sectionsModel = defineModel<HTMLElement[]>('sections')
const { list } = toRefs(props)
const sections = ref<HTMLElement[]>()

watch(list, async () => {
  // 等 DOM 更新完成
  nextTick(() => {
    sectionsModel.value = sections.value
  })
})
</script>
