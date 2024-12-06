import { createApp } from 'vue'
import App from './app.vue'
import { vueRouter } from './routes/router'

import './main.scss'

createApp(App)
  .use(vueRouter)
  .mount('#app')
