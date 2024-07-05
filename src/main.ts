import {createApp} from 'vue'
import App from './App.vue'
import {createRouter, createWebHistory} from 'vue-router'
import routes from "./config/route.ts";
import Vant from 'vant'
import 'vant/lib/index.css';
import '../global.css'

const app = createApp(App)

app.use(Vant)

const router = createRouter({
    // history: createMemoryHistory(),
    history: createWebHistory(),
    routes,
})

app.use(router)
app.mount('#app')