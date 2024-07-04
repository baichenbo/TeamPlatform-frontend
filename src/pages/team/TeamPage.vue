<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../../plugins/myAxios.ts";
import {showToast} from "vant";
import TeamCardList from "../../components/TeamCardList.vue";

const router = useRouter();


const doAddTeam = () => {
  router.push("/team/add");
}

const teamList = ref([])

onMounted(async () => {
  const res = await myAxios.get("/team/list");
  if (res?.code === 0) {
    teamList.value = res.data;
  } else {
    showToast("队伍列表加载失败，请刷新重试。")
  }
})
</script>

<template>
  <div id="teamPage">
    <van-button type="primary" @click="doAddTeam">加入队伍</van-button>
    <team-card-list :team-list="teamList" />
  </div>
</template>

<style scoped>

</style>