<template>
  <div>
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
          <SwitchDemo :name :props :demos />
        </div>
        <!-- <PropsTable :props="props" /> -->
      </section>
    </article>
  </div>
</template>

<script setup lang="ts">
import { typeOfLayouts, typeOfComponents } from '../utils/AsyncImportDemo.js'
import SwitchDemo from '../components/SwitchDemo.vue'
import regist from '../save/registModules.json' with { type: 'json' }
import demo from '../save/demo.json' with { type: 'json' }
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
        categorys: regist[component.id as keyof typeof regist]?.categorys,
        keywords: regist[component.id as keyof typeof regist]?.keywords,
        demos: demo[component.id as keyof typeof demo] ?? [],
      }
    }),
  )
}

const list = [
  { structure: 'Components', items: await formatList(typeOfComponents) },
  { structure: 'Layouts', items: await formatList(typeOfLayouts) },
]
</script>
