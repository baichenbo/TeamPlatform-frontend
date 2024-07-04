// 定义路由
import Index from "../pages/Index.vue";
import Team from "../pages/team/TeamPage.vue";
import SearchPage from "../pages/SearchPage.vue";
import UserPage from "../pages/user/UserPage.vue";
import UserEditPage from "../pages/user/UserEditPage.vue";
import SearchResultPage from "../pages/SearchResultPage.vue";
import UserLoginPage from "../pages/user/UserLoginPage.vue";
import TeamAddPage from "../pages/team/TeamAddPage.vue";

const routes = [
    {path: '/index', component: Index},
    {path: '/team', component: Team},
    {path: '/user', component: UserPage},
    {path: '/search', component: SearchPage},
    {path: '/user/edit', component: UserEditPage},
    {path: '/user/list', component: SearchResultPage},
    {path: '/user/login', component: UserLoginPage},
    {path: '/team/add', component: TeamAddPage},
]

export default routes;