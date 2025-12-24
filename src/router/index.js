import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../components/home.vue"),
    meta: { showNavbar: true, showHeader: true, showFooter: true },
  },
  {
    path: "/cart",
    name: "cart",
    component: () => import("../components/cart/cart.vue"),
    meta: { showNavbar: true, showHeader: true, showFooter: true },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../components/users/login.vue"),
    meta: { showNavbar: false, showHeader: false, showFooter: false },
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../components/users/register.vue"),
    meta: { showNavbar: false, showHeader: false, showFooter: false },
  },
  {
    path: "/checkout",
    name: "checkout",
    component: () => import("../components/cart/checkout.vue"),
    meta: { showNavbar: true, showHeader: true, showFooter: true },
  },
  {
    path: "/product/:id",
    name: "product-detail",
    component: () => import("../components/products/producDetails.vue"),
    meta: { showNavbar: true, showHeader: true, showFooter: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
