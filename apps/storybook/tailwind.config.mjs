import inherit from '@config/tailwind.config'

export default {
  presets: [inherit],
  content: ['./src/**/*.{astro,vue,html,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
}
