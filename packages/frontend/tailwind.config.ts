import { tailwindPlugins } from './src/tailwind-extend/tailwind-extend'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],

  theme: {
    extend: {},
  },

  plugins: [
    ...tailwindPlugins,
  ],
}
