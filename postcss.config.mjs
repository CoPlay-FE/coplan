/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {}, // CSS애 접두사(Vendor Prefix, 예: -webkit-, -moz-) 붙여줌
  },
}

export default config
