import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import VueTablerIcons from "vue-tabler-icons";
import VueClickAway from "vue3-click-away";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import "@/assets/css/index.css";
import "@/assets/css/tailwind.css";

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app.use(VueTablerIcons);
app.use(VueClickAway);
app.use(router);

app.mount("#app");
