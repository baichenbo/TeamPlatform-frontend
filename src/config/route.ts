// 定义路由
import Index from "../pages/Index.vue";
import Team from "../pages/team/TeamPage.vue";
import SearchPage from "../pages/SearchPage.vue";
import UserPage from "../pages/user/UserPage.vue";
import UserEditPage from "../pages/user/UserEditPage.vue";
import UserGenderEditPage from "../pages/user/UserGenderEditPage.vue";
import UserUpdatePage from "../pages/user/UserUpdatePage.vue";
import UserTeamJoinPage from "../pages/team/UserTeamJoinPage.vue";
import UserTeamCreatePage from "../pages/team/UserTeamCreatePage.vue";
import SearchResultPage from "../pages/SearchResultPage.vue";
import UserLoginPage from "../pages/user/UserLoginPage.vue";
import TeamAddPage from "../pages/team/TeamAddPage.vue";
import TeamUpdatePage from "../pages/team/TeamUpdatePage.vue";

const routes = [
    {path: '/index', component: Index},
    {path: '/team', title: '小队', component: Team},
    {path: '/user', title: '用户', component: UserPage},
    {path: '/search', title: '搜索小队', component: SearchPage},
    {path: '/user/edit', title: '编辑小队',component: UserEditPage},
    {path: '/user/gender', title: '编辑小队',component: UserGenderEditPage},
    {path: '/user/list', title: '用户列表',component: SearchResultPage},
    {path: '/user/login', title: '用户登录',component: UserLoginPage},
    {path: '/user/update', title: '修改用户信息',component: UserUpdatePage},
    {path: '/user/team/join',title: '我加入的小队', component: UserTeamJoinPage},
    {path: '/user/team/create', title: '我创建的小队',component: UserTeamCreatePage},
    {path: '/team/add', title: '创建小队',component: TeamAddPage},
    {path: '/team/update', title: '更新小队',component: TeamUpdatePage},
]

export default routes;