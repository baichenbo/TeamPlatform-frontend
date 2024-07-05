<script setup lang="ts">
// import {ref} from 'vue';
import {showToast} from 'vant';
import {useRouter} from "vue-router";
import {ref} from "vue";
import routes from "../config/route";

const router = useRouter()
const DEFAULT_TITLE = '小白小队';
const title = ref(DEFAULT_TITLE);
const onClickLeft = () => {
  router.back();
};
const onClickRight = () => {
  router.push("/search")

};

// const active = ref('index');
 const onChange = (index:any) => showToast(`标签 ${index}`);

/**
 * 根据路由切换标题
 */
router.beforeEach((to, from) => {
  const toPath = to.path;
  const route = routes.find((route) => {
    return toPath == route.path;
  })
  title.value = route?.title ?? DEFAULT_TITLE;
})


</script>

<template>
  <!--  导航栏 -->
  <van-nav-bar
      :title="title"
      left-text="返回"
      right-text="按钮"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
      placeholder="true"
      fixed="true"
  >
    <template #right>
      <van-icon name="search" size="18"/>
    </template>
  </van-nav-bar>

  <div id="content">
  <router-view/>
  </div>

  <!--Tabbar标签栏-->
  <van-tabbar route @change="onChange">
    <van-tabbar-item to="/index" icon="home-o" name="index">主页</van-tabbar-item>
    <van-tabbar-item to="/team" icon="search" name="team">小队</van-tabbar-item>
    <van-tabbar-item to="/user" icon="friends-o" name="user">个人</van-tabbar-item>
  </van-tabbar>


</template>


<style scoped>
#content {
  padding-bottom: 50px;
}
</style>