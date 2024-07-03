// 定义路由
import Index from "../pages/Index.vue";
import Team from "../pages/Team.vue";
import SearchPage from "../pages/SearchPage.vue";
import UserPage from "../pages/UserPage.vue";
import UserEditPage from "../pages/UserEditPage.vue";
import SearchResultPage from "../pages/SearchResultPage.vue";
import UserLoginPage from "../pages/UserLoginPage.vue";

const routes = [
    {path: '/index', component: Index},
    {path: '/team', component: Team},
    {path: '/user', component: UserPage},
    {path: '/search', component: SearchPage},
    {path: '/user/edit', component: UserEditPage},
    {path: '/user/list', component: SearchResultPage},
    {path: '/user/login', component: UserLoginPage},
]

export default routes;