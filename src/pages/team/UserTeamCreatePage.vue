<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../../plugins/myAxios.ts";
import {showToast} from "vant";
import TeamCardList from "../../components/TeamCardList.vue";

const router = useRouter();
const searchText = ref("");

const doAddTeam = () => {
  router.push("/team/add");
}

const onSearch = (val) => {
  searchTeam(val);
}

/**
 * 搜索小队
 * @param val
 */
const searchTeam = async (val) => {
  const res = await myAxios.get("/team/list/my/create", {
    params: {
      searchText: val,
      pageNum: 1,
    }
  });
  if (res?.code === 0) {
    teamList.value = res.data;
  } else {
    showToast("小队列表加载失败，请刷新重试。")
  }
}

const teamList = ref([])

onMounted(async () => {
  searchTeam('');
})
</script>

<template>
  <div id="teamPage">
    <van-search v-model="searchText" placeholder="搜索小队" @search="onSearch"/>
    <van-button type="primary" @click="doAddTeam">加入小队</van-button>
    <team-card-list :team-list="teamList"/>
    <van-empty v-if="teamList.length < 1" description="小队列表为空"/>
  </div>
</template>

<style scoped>

</style>