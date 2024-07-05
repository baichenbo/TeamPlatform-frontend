<script setup lang="ts">
import {useRoute} from "vue-router";
import {UserType} from "../models/user";
import {onMounted, ref, watchEffect} from 'vue'
import myAxios from '../plugins/myAxios.ts'
import {showToast} from "vant";
import UserCardList from "../components/UserCardList.vue";

const isMatchMode = ref<boolean>(false)
const route = useRoute()
const {tags} = route.query;
const userListData = ref([])
const loading = ref<boolean>(true)
const loadData = async () => {
  let userListData = [];
  // 匹配模式，根据标签匹配用户
  if (isMatchMode.value) {
    const num = 10
    userListData = await myAxios.get('/user/match', {
      params: {
        num,
      },
    })
        .then(function (response) {
          console.log('/user/recommend/tags', response);
          showToast('系统已根据您的兴趣推荐用户');
          return response?.data
        })
        .catch(function (error) {
          console.log('/user/search/tags', error);
          showToast('请求失败');
        })
  } else {
    // 普通模式，根据分页匹配用户
    userListData = await myAxios.get('/user/recommend', {
      params: {
        pageSize: 8,
        pageNum: 1,
      },
    })
        .then(function (response) {
          console.log('/user/recommend/tags', response);
          showToast('已切换到普通模式');
          return response?.data?.records;
        })
        .catch(function (error) {
          console.log('/user/search/tags', error);
          showToast('请求失败');
        })
  }
  if (userListData) {
    userListData.forEach((user: UserType) => {
      if (user.tags) {
        user.tags = JSON.parse(user.tags);
      }
    })
    userList.value = userListData;
  }
  loading.value = false;
}

onMounted(async () => {
  const userListData = await myAxios.get('/user/recommend', {
    params: {
      pageSize: 8,
      pageNum: 1,
    },
  })
      .then(function (response) {
        console.log('/user/recommend/tags', response);
        showToast('请求成功');
        return response?.data?.records;
      })
      .catch(function (error) {
        console.log('/user/search/tags', error);
        showToast('请求失败');
      })
  if (userListData) {
    userListData.forEach(item => {
      if (item.tags) {
        item.tags = JSON.parse(item.tags);
      }
    })
    userList.value = userListData;
  }

})

watchEffect(() => {
  loadData()
})

const userList = ref<UserType>([])
</script>

<template>
  <van-cell center title="推荐模式">
    <template #right-icon>
      <van-switch v-model="isMatchMode"/>
    </template>
  </van-cell>
  <user-card-list :user-list="userList" :loading="loading"/>

  <van-empty v-if="!userList || userList.length < 1" description="搜索结果为空"/>
</template>

<style scoped>

</style>