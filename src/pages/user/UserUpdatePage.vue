<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../../services/user.ts";

const user = ref();

onMounted(async () => {
  user.value = await getCurrentUser();
})

const router = useRouter();

const toEdit = (editKey: string, editName: string, currentValue: string) => {
  router.push({
    path: '/user/edit',
    query: {
      editKey,
      editName,
      currentValue
    }
  })
}

const toGender = (editKey: string, editName: string, currentValue: string) => {
  router.push({
    path: '/user/gender',
    query: {
      editKey,
      editName,
      currentValue
    }
  })
}

const formatDate = (value) => {
  const date = new Date(value);
  return date.toLocaleDateString('zh-CN'); // 使用本地化的日期格式
}
</script>

<template>
  <template v-if="user">
    <van-cell title="昵称" is-link to="/user/edit" :value="user.username"
              @click="toEdit('username', '昵称', user.username)"/>
    <van-cell title="账号" :value="user.userAccount"/>
    <van-cell title="头像" is-link to="/user/edit">
      <img :src="user.avatarUrl">
    </van-cell>
    <van-cell title="性别" is-link to="/user/gender" :value="user.gender"
              @click="toGender('gender', '性别', user.gender)"/>
    <van-cell title="电话" is-link to="/user/edit" :value="user.phone" @click="toEdit('phone', '电话', user.phone)"/>
    <van-cell title="邮箱" is-link to="/user/edit" :value="user.email" @click="toEdit('email', '邮箱', user.email)"/>
    <van-cell title="注册时间" :value="formatDate(user.createTime)"/>
  </template>
</template>

<style scoped>

</style>