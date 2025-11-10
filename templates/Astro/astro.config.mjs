import { defineConfig } from 'astro/config'
import base from '@repo/astro-config'

/** @type {import('astro').AstroUserConfig} */
const config = {
  ...base,
  vite: {
    ...base.vite,
    plugins: [
      ...base.vite.plugins,
      // 個別專案內的vite插件
    ],
  },
}

export default defineConfig(config)
