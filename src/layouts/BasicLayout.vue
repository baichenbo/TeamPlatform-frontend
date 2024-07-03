<script setup lang="ts">
// import {ref} from 'vue';
import {showToast} from 'vant';
import {useRouter} from "vue-router";

const router = useRouter()

const onClickLeft = () => {
  router.back();
};
const onClickRight = () => {
  router.push("/search")

};

// const active = ref('index');
 const onChange = (index:any) => showToast(`标签 ${index}`);

</script>

<template>
  <!--  导航栏 -->
  <van-nav-bar
      title="标题"
      left-text="返回"
      right-text="按钮"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
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
    <van-tabbar-item to="/team" icon="search" name="team">队伍页</van-tabbar-item>
    <van-tabbar-item to="user" icon="friends-o" name="user">个人</van-tabbar-item>
  </van-tabbar>


</template>


<style scoped>

</style>