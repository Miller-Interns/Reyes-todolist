import { createRouter, createWebHistory } from 'vue-router'
import landingPage from '@/pages/landing-page.vue'
import todoApp from '@/pages/todo-app.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: landingPage,
    },
    {
      path: '/about',
      name: 'about',
      component: todoApp,
    },
  ],
})

export default router
