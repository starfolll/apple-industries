import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],

  base: '/apple-industries/',

  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern',
      },
    },
  },
})
