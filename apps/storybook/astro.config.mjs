import base from '@repo/astro-config'
import { defineConfig } from 'astro/config'
import devtoolsJson from 'vite-plugin-devtools-json'
import tailwindcss from '@tailwindcss/vite'

/** @type {import('astro').AstroUserConfig} */
const config = {
  ...base,
  vite: {
    ...base.vite,
    plugins: [devtoolsJson(), tailwindcss()],
  },
  devToolbar: {
    enabled: false,
  },
}

export default defineConfig(config)
