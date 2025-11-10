import { defineConfig } from 'astro/config'
import base from '@repo/astro-config'

export default defineConfig({
  ...base,
  vite: {
    ...base.vite,
    plugins: [
      ...base.vite.plugins,
      // 個別專案內的vite插件
    ],
  },
})
