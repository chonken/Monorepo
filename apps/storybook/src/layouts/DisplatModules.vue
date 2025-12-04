<template>
  <div>
    <article v-for="group in list" :key="group.structure">
      <h2 class="font-bold my-15 text-5xl">{{ group.structure }}</h2>
      <section v-for="{ path, name, props, categorys, keywords } in group.items" :key="name" :id="'component' + name" class="mt-10">
        <h3 class="font-bold text-4xl">{{ name }}</h3>
        <small class="inline-block mt-4 px-3.5 py-0.5 text-sm italic rounded-lg bg-[var(--bg-elevated-4)]">
          {{ path }}
        </small>
        <!-- <ul>
          <li v-for="keyword in keywords" :key="keyword">
            {{ keyword }}
          </li>
        </ul>
        <ul>
          <li v-for="category in categorys" :key="category">
            {{ category }}
          </li>
        </ul> -->
        <div class="mt-10">
          <!-- 缺少展示用的資訊 -->
          <LayoutFrame v-if="group.structure === 'Layouts'" :name="name" :breakpoints="props.mobile.type" />
          <DynamicComponent v-else="group.structure === 'Components'" :name="name" :props="{ color: 'red' }" :slots="{ default: '你好世界' }" />
        </div>
        <!-- <PropsTable :props="props" /> -->
      </section>
    </article>
  </div>
</template>

<script setup lang="ts">
import { typeOfLayouts, layouts, typeOfComponents, components } from '../utils/AsyncImportDemo.js'
import LayoutFrame from '../components/LayoutFrame.vue'
import DynamicComponent from '../components/DynamicComponent.vue'
import config from '../demo/config.json'
import content from '../content/demo.json'
// import PropsTable from '../PropsTable.astro'

const pathRegex = /^(\.\.\/)+|\/[^/]+$/g

function formatList(globObj: Record<string, () => Promise<unknown>>) {
  const entries = Object.entries(globObj)
  return Promise.all(
    entries.map(async ([p, promise]: [string, any]) => {
      const component = await promise()
      const path = p.replace(pathRegex, '')
      return {
        path,
        name: path.split('/').at(-1) ?? 'Unknown',
        id: component.id,
        props: component.props,
        slots: component.slots,
        categorys: config[component.id as keyof typeof config]?.categorys,
        keywords: config[component.id as keyof typeof config]?.keywords,
      }
    }),
  )
}

const list = [
  { structure: 'Components', items: await formatList(typeOfComponents) },
  { structure: 'Layouts', items: await formatList(typeOfLayouts) },
]
</script>
