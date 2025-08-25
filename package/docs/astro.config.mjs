import base from '../../base-astro.config.mts'
import { defineConfig } from 'astro/config'
import devtoolsJson from 'vite-plugin-devtools-json'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  ...base,
  vite: {
    ...base.vite,
    plugins: [devtoolsJson(), tailwindcss()],
  },
  devToolbar: {
    enabled: false,
  },
})
