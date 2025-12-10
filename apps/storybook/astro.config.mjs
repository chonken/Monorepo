import base from '@repo/astro-config'
import { defineConfig } from 'astro/config'
import devtoolsJson from 'vite-plugin-devtools-json'
import vue from '@astrojs/vue'
import tailwindcss from '@tailwindcss/vite'
import config from './src/save/config.json' with { type: 'json' }

/** @type {import('astro').AstroUserConfig} */
const userConfig = {
  ...(base ?? {}),
  server: {
    ...(base.server ?? {}),
    port: config.port,
  },
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

export default defineConfig(userConfig)
