<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../../plugins/myAxios.ts";
import {showToast} from "vant";
import TeamCardList from "../../components/TeamCardList.vue";

const router = useRouter();
const searchText = ref("");
const active = ref('public')

const doAddTeam = () => {
  router.push("/team/add");
}

const onSearch = (val) => {
  searchTeam(val);
}

const searchTeam = async (val = '', status = 0) => {
  const res = await myAxios.get("/team/list", {
    params: {
      searchText: val,
      pageNum: 1,
      status,
    }
  });
  if (res?.code === 0) {
    teamList.value = res.data;
  } else {
    showToast("小队列表加载失败，请刷新重试。")
  }
}

const onTabChange = (status) => {
  if (status === 'public') {
    searchTeam(searchText.value, 0);
  } else {
    searchTeam(searchText.value, 2);
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
    <van-tabs v-model:active="active" @change="onTabChange">
      <van-tab title="公开" name="public"/>
      <van-tab title="加密" name="secret"/>
    </van-tabs>
    <van-button class="add-button" type="primary" icon="plus" @click="doAddTeam"></van-button>
    <team-card-list :team-list="teamList"/>
    <van-empty v-if="teamList.length < 1" description="小队列表为空"/>
  </div>
</template>

<style scoped>

</style>