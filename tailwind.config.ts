import type { Config } from 'tailwindcss'

const pxToRem = require('tailwindcss-preset-px-to-rem')

const config: Config = {
  darkMode: 'class',
  presets: [pxToRem],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      screens: {
        mobile: { max: '375px' },
        tablet: { max: '744px' },
        desktop: { max: '1920px' },
      },
    },
  },
  plugins: [],
}
export default config
