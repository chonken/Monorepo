import { defineConfig } from 'astro/config'
import devtoolsJson from 'vite-plugin-devtools-json'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  server: {
    host: true,
    port: 4321,
  },
  build: {
    inlineStylesheets: 'always',
    format: 'file',
  },
  vite: {
    plugins: [
      viteStaticCopy({
        targets: [
          {
            src: 'src/pages/img',
            dest: '',
          },
        ],
      }),
      devtoolsJson(),
      tailwindcss(),
    ],
  },
})
