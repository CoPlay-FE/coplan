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
        mobile: { max: '375px' }, // 0 ~ 375px
        tablet: { raw: '(min-width: 376px) and (max-width: 744px)' }, // 376 ~ 1919px
        mobileS: { raw: '(min-width: 0px) and (max-width: 683px)' }, // 376 ~ 1919px
        tabletS: { raw: '(min-width: 684px) and (max-width: 1439px)' }, // 376 ~ 1919px
      },
    },
  },
  plugins: [],
}
export default config
