import devtoolsJson from 'vite-plugin-devtools-json'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import tailwindcss from '@tailwindcss/vite'

export default {
  build: {
    inlineStylesheets: 'always' as const,
    format: 'file' as const,
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
}
