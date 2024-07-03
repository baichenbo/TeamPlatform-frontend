<script setup lang="ts">
import {useRoute} from "vue-router";
import {UserType} from "../models/user";
import {onMounted, ref} from 'vue'
import myAxios from '../plugins/myAxios.ts'
import qs from "qs";
import {showToast} from "vant";
import UserCardList from "../components/UserCardList.vue";

const route = useRoute()
const {tags} = route.query;
const userListData = ref([])
onMounted(async () => {
  const userListData = await myAxios.get('/user/search/tags', {
    params: {
      tagNameList: tags
    },
    paramsSerializer: function (params) {
      return qs.stringify(params, {arrayFormat: "repeat"});
    },
  })
      .then(function (response) {
        console.log('/user/search/tags', response);
        showToast('请求成功');
        return response?.data;
      })
      .catch(function (error) {
        console.log('/user/search/tags', error);
        showToast('请求失败');
      })
  console.log("userListData类型：", userListData)
  if (userListData) {
    userListData.forEach(item => {
      if (item.tags) {
        item.tags = JSON.parse(item.tags);
      }
    })
    userList.value = userListData;
  }

})

// const mockUser = {
//   id: 111,
//   username: "秦宝z",
//   userAccount: "aaaa",
//   avatarUrl: "https://ms.bdimg.com/pacific/0/pic/-942620453_996796440.png?x=0&y=0&h=200&w=300&vh=200.00&vw=300.00&oh=200.00&ow=300.00",
//   profile: "精神小伙",
//   gender: '男',
//   phone: "444",
//   email: "qqqq@qq.com",
//   userStatus: 0,
//   userRole: 2,
//   planetCode: "string",
//   tags: ['java', 'C++', 'python', 'PHP'],
//   createTime: new Date,
// }

const userList = ref<UserType>([])
</script>

<template>
  <user-card-list :user-list="userList"/>
  <van-empty v-if="!userList || userList.length < 1" description="搜索结果为空"/>
</template>

<style scoped>

</style>