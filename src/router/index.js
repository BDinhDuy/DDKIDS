import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/home.vue";
import Cart from "../components/cart/cart.vue";
import Login from "../components/users/login.vue";
import Register from "../components/users/register.vue";
import ForgotPassword from "../components/users/forgotPassword.vue";
import Checkout from "../components/cart/checkout.vue";
import checkoutDeatails from "../components/cart/checkoutDetails.vue";
import orderSuccess from "../components/cart/orderSuccess.vue";
import Product from "../components/products/products.vue";
import ProductDetail from "../components/products/producDetails.vue";
import { fa } from "vuetify/locale";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: { showNavbar: true, showHeader: true, showFooter: true },
  },
  {
    path: "/cart",
    name: "cart",
    component: Cart,
    meta: { showNavbar: true, showHeader: true, showFooter: true },
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: { showNavbar: false, showHeader: false, showFooter: false },
  },
  {
    path: "/register",
    name: "register",
    component: Register,
    meta: { showNavbar: false, showHeader: false, showFooter: false },
  },
  {
    path: "/forgot-password",
    name: "forgot-password",
    component: ForgotPassword,
    meta: { showNavbar: false, showHeader: false, showFooter: false },
  },
  {
    path: "/checkout",
    name: "checkout",
    component: Checkout,
    meta: { showNavbar: false, showHeader: true, showFooter: true },
  },
  {
    path: "/checkoutDeatails",
    name: "checkout-details",
    component: checkoutDeatails,
    meta: { showNavbar: false, showHeader: true, showFooter: true },
  },
  {
    path: "/orderSuccess",
    name: "order-success",
    component: orderSuccess,
    meta: { showNavbar: false, showHeader: true, showFooter: true },
  },
  {
    path: "/products",
    name: "products",
    component: Product,
    meta: { showNavbar: true, showHeader: true, showFooter: true },
  },
  {
    path: "/product/:id",
    name: "product-detail",
    component: ProductDetail,
    meta: { showNavbar: true, showHeader: true, showFooter: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
