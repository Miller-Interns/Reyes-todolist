import { createRouter, createWebHistory } from 'vue-router'
import landingPage from '@/pages/landing-page.vue'
import todoApp from '@/pages/todo-app.vue'
import { RouteNames } from './route-names'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: RouteNames.Home,
      component: landingPage,
    },
    {
      path: '/about',
      name: RouteNames.About,
      component: todoApp,
    },
  ],
})

export default router
