import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../components/main.vue')
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('../components/cart/cart.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../components/users/login.vue')
  },
  {
    path: '/logout',
    name: 'logout',
    component: () => import('../components/users/register.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../components/users/register.vue')
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: () => import('../components/cart/checkout.vue')
  },
  {
    path: '/product/:id',
    name: 'product-detail',
    component: () => import('../components/products/producDetails.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
