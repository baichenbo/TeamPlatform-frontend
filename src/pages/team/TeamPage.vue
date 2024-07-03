<script setup lang="ts">
import {useRouter} from "vue-router";
const router = useRouter();


const doJoinTeam = () => {
  router.push("/team/join");
}
</script>

<template>
  <div id="teamPage">
    <van-button type="primary" @click="doJoinTeam">加入队伍</van-button>
  </div>
</template>

<style scoped>

</style>