<template>
  <div>
    <van-card v-for="user in userList" :key="user.id"
              :tag="user.gender"
              :desc="user.profile"
              :title="user.username"
              :thumb="user.avatarUrl"
    >
      <template #tags>
        <van-tag plain type="primary" v-for="tag in user.tags" :key="tag" style="margin-right: 3px; margin-top: 2px">
          {{ tag }}
        </van-tag>
      </template>
      <template #footer>
        <van-button size="mini" @click="doConnection(user)">联系我</van-button>
      </template>
    </van-card>

    <van-popup v-model:show="showConnect"
               closeable
               close-icon="close"
               position="bottom"
               :style="{ height: '30%' }"
    >
      <p v-if="selectedUser">我的电话为 {{ selectedUser.phone }}<br> 我的邮箱为 {{ selectedUser.email }}</p>
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import { UserType } from "../models/user";
import { ref } from "vue";

interface UserCardListProps {
  loading: boolean;
  userList: UserType[];
}

const showConnect = ref(false);
const selectedUser = ref<UserType | null>(null);
const props = defineProps<UserCardListProps>();

const doConnection = (user: UserType) => {
  selectedUser.value = user;
  showConnect.value = true;
};
</script>

<style scoped>

</style>
