import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../views/home/index.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
