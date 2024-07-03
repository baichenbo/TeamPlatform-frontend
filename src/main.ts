import { createApp } from 'vue'
import App from './App.vue'
// import { Button, NavBar, Icon, Tabbar, TabbarItem} from 'vant'
import {createMemoryHistory, createRouter, createWebHashHistory} from 'vue-router'
import routes from "./config/route.ts";
import Vant from 'vant'
import 'vant/lib/index.css';
const app = createApp(App)

app.use(Vant)

const router = createRouter({
    // history: createMemoryHistory(),
    history: createWebHashHistory(),
    routes,
})

app.use(router)
app.mount('#app')