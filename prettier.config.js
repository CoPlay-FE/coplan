/** @type {import('prettier').Config} */
module.exports = {
  semi: false,
  singleQuote: true,
  trailingComma: 'all',
  useTabs: false,
  tabWidth: 2,
  printWidth: 80,
  arrowParens: 'always',
  endOfLine: 'lf',
  bracketSpacing: true,
  bracketSameLine: false,
  jsxSingleQuote: false,
  plugins: ['prettier-plugin-tailwindcss'], // ✅ 플러그인 등록
}
