<template>
  <!-- 紀錄: 如果單純用解構來提取屬性的話，會讓響應式數據失效，要記得用 toRefs -->
  <article v-for="{ structure, items } in list" :key="structure">
    <h2 class="font-bold my-15 text-5xl">{{ structure }}</h2>
    <section ref="sections" v-for="({ path, name, props, slots, defaultProps, categorys, keywords, demos }, index) in items" :key="index" :id="'component' + name" class="mt-10">
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
        <AsyncComp v-if="visible[index]" :name="name" :demos="demos" />
      </div>
      <PropsTable :props="props" :default-props="defaultProps" />
    </section>
  </article>
</template>

<script setup lang="ts">
import { ref, toRefs, watch, nextTick, defineAsyncComponent } from 'vue'
import PropsTable from '../components/PropsTable.vue'
import type { Item } from '../../types'

interface Props {
  list: { structure: string; items: Item[] }[]
}
const props = defineProps<Props>()
const sectionsModel = defineModel<HTMLElement[]>('sections')
const { list } = toRefs(props)
const sections = ref<HTMLElement[]>()

const AsyncComp = defineAsyncComponent({
  loader: () => import('../components/SwitchDemo.vue'),
  // loadingComponent: ,
  // errorComponent: ,
  // delay: 200,
  // timeout: 10000,
})
const visible = ref<boolean[]>([])
let observer: IntersectionObserver | null = null
watch(list, async () => {
  // 等 DOM 更新完成
  nextTick(() => {
    sectionsModel.value = sections.value
    // SwitchDemo 懶加載(未完成)
    sections.value?.forEach((el, i) => {
      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          visible.value[i] = true
          observer?.disconnect()
        }
      })
      observer.observe(el)
    })
  })
})
</script>
