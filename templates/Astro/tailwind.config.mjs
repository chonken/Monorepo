import inherit from '@config/tailwind.config'

export default {
  presets: [inherit],
  content: ['./src/**/*.{astro,html,js,ts,jsx,tsx}'],
  corePlugins: {
    preflight: false,
  },
}
