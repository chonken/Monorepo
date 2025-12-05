<template>
  <article v-for="{ structure, items } in list" :key="structure">
    <h2 class="font-bold my-15 text-5xl">{{ structure }}</h2>
    <section v-for="{ path, name, props, slots, categorys, keywords, demos } in items" :key="name" :id="'component' + name" class="mt-10">
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
import { toRefs, watch } from 'vue'
import SwitchDemo from '../components/SwitchDemo.vue'

interface Props {
  list: { structure: string; items: any[] }[]
}
const props = withDefaults(defineProps<Props>(), {
  list: () => [],
})
const { list } = toRefs(props)
</script>
