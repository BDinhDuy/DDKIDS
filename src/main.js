import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router/index";
import "./style.css";

const pinia = createPinia();

createApp(App).use(pinia).use(router).use(vuetify).mount("#app");
