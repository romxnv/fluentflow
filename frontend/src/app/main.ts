import { createApp } from "vue";

import "@/shared/styles/global.css";
import router from "./router";
import store from "./store.ts";
import App from './App.vue';

const app = createApp(App);

app.use(store)
app.use(router);

app.mount("#app");
