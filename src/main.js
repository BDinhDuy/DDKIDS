import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router/index";
import "./style.css";
import "./assets/styles/global.css";

const pinia = createPinia();
const app = createApp(App);

// Initialize stores
import { useUserStore } from "./stores/user";
import { useCartStore } from "./stores/cart";

app.use(pinia);

// Initialize user and cart from storage
const userStore = useUserStore();
const cartStore = useCartStore();
userStore.initUser();
cartStore.initCart();

userStore.initUser();
cartStore.initCart();

app.use(router).use(vuetify).mount("#app");
