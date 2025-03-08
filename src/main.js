import { createPinia } from "pinia";
import piniaPersistedState from "pinia-plugin-persistedstate";
import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
// Import global styles
import "./assets/styles/global.scss";

const pinia = createPinia();
pinia.use(piniaPersistedState);

createApp(App).use(pinia).use(router).use(vuetify).mount("#app");
