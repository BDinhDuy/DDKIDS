import { createRouter, createWebHistory } from "vue-router";
import { components } from "vuetify/dist/vuetify.js";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../components/home.vue"),
    meta: { showNavbar: true, showHeader: true, showFooter: true },
  },
  
  // Cart & Checkout Flow
  {
    path: "/cart",
    name: "cart",
    component: () => import("../components/cart/cart.vue"),
    meta: { showNavbar: true, showHeader: true, showFooter: true },
  },
  {
    path: "/checkout",
    children: [
      {
        path: "",
        name: "checkout",
        component: () => import("../components/cart/checkout.vue"),
        meta: { showNavbar: false, showHeader: true, showFooter: true },
      },
      {
        path: "details",
        name: "checkout-details",
        component: () => import("../components/cart/checkoutDetails.vue"),
        meta: { showNavbar: false, showHeader: true, showFooter: true },
      },
      {
        path: "success",
        name: "order-success",
        component: () => import("../components/cart/orderSuccess.vue"),
        meta: { showNavbar: false, showHeader: true, showFooter: true },
      },
    ],
  },

  // Products
  {
    path: "/products",
    name: "products",
    component: () => import("../components/products/products.vue"),
    meta: { showNavbar: true, showHeader: true, showFooter: true },
  },
  {
    path: "/product/:id",
    name: "product-detail",
    component: () => import("../components/products/producDetails.vue"),
    meta: { showNavbar: true, showHeader: true, showFooter: true },
  },

  // User Authentication
  {
    path: "/auth",
    meta: { showNavbar: false, showHeader: false, showFooter: false },
    children: [
      {
        path: "login",
        name: "login",
        component: () => import("../components/users/auth/login.vue"),
      },
      {
        path: "register",
        name: "register",
        component: () => import("../components/users/auth/register.vue"),
      },
      {
        path: "forgot-password",
        name: "forgot-password",
        component: () => import("../components/users/forgotPassword.vue"),
      },
    ],
  },

  // Profile with tabs
  {
    path: "/profile",
    component: () => import("../components/users/profile.vue"),
    meta: { showNavbar: false, showHeader: true, showFooter: true },
    children: [
      {
        path: "",
        name: "profile",
        components: () => import("../components/users/profile.vue"),
      },
      {
        path: "personal",
        name: "profile-personal",
        component: () => import("../components/users/PersonalInfoTab.vue"),
      },
      {
        path: "wishlist",
        name: "profile-wishlist",
        component: () => import("../components/users/WishlistTab.vue"),
      },
      {
        path: "addresses",
        name: "profile-addresses",
        component: () => import("../components/users/AddressBookTab.vue"),
      },
      {
        path: "orders",
        name: "profile-orders",
        component: () => import("../components/users/OrderHistoryTab.vue"),
      },
      {
        path: "change-password",
        name: "profile-password",
        component: () => import("../components/users/ChangePasswordTab.vue"),
      },
    ],
  },

  // Shop & Policies
  {
    path: "/shop",
    meta: { showNavbar: false, showHeader: true, showFooter: true },
    children: [
      {
        path: "contact",
        name: "contact",
        component: () => import("../components/shop/contact.vue"),
      },
      {
        path: "policy",
        name: "policy",
        component: () => import("../components/shop/policy.vue"),
      },
      {
        path: "policy/refund",
        name: "policyRefund",
        component: () => import("../components/shop/policyRefund.vue"),
      },
      {
        path: "policy/shipping",
        name: "policyTransition",
        component: () => import("../components/shop/policyTransition.vue"),
      },
      {
        path: "form-refund",
        name: "formRefund",
        component: () => import("../components/shop/formRefund.vue"),
      },
    ],
  },

  // 404 Not Found (must be last)
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import("../components/404notFound.vue"),
    meta: { showNavbar: false, showHeader: true, showFooter: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
