import base from '@repo/astro-config'
import { defineConfig } from 'astro/config'
import devtoolsJson from 'vite-plugin-devtools-json'
import vue from '@astrojs/vue'
import tailwindcss from '@tailwindcss/vite'

/** @type {import('astro').AstroUserConfig} */
const config = {
  ...(base ?? {}),
  integrations: [vue(), ...(base.integrations ?? [])],
  vite: {
    ...(base.vite ?? {}),
    plugins: [devtoolsJson(), tailwindcss()],
  },
  devToolbar: {
    enabled: false,
  },
  output: 'server',
}

export default defineConfig(config)
