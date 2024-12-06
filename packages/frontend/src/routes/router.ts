import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/home.vue'
import ImFeelingLucky from '../views/im-feeling-lucky.vue'
import MirrorMirrorOnTheScreen from '../views/mirror-mirror-on-the-screen.vue'
import OnlyTwoThingsInLifeAreGuaranteed from '../views/only-two-things-in-life-are-guaranteed.vue'

const routes: RouteRecordRaw[] = [
  { path: '/', component: Home },

  { path: '/im-feeling-lucky', component: ImFeelingLucky },
  { path: '/mirror-mirror-on-the-screen', component: MirrorMirrorOnTheScreen },
  { path: '/only-two-things-in-life-are-guaranteed', component: OnlyTwoThingsInLifeAreGuaranteed },

  { path: '/:pathMatch(.*)*', component: Home },
] as const

export const vueRouter = createRouter({
  history: createWebHashHistory(),
  routes,
})
