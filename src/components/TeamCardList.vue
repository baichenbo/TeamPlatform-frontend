<script setup lang="ts">
import {TeamType} from "../models/team";
import {teamStatusEnum} from "../constants/team";
import kun from "../assets/kun.png"
import myAxios from "../plugins/myAxios.ts";
import {showToast} from "vant";

interface TeamCardListProps {
  teamList: TeamType[];
}

const props = defineProps<TeamCardListProps>();

const preJoinTeam = (id: number) => {

}

const doJoinTeam = async (id: number) => {
  const res = await myAxios.post('/team/join', {teamId: id});
  if (res?.code === 0) {
    showToast("加入成功");
  } else {
    showToast("加入失败" + res.descrpition ? `${res.description}`:'');
  }
}
</script>

<template>
  <van-card
      v-for="team in props.teamList"
      :thumb="kun"
      :desc="team.description"
      :title="`${team.name}`"
  >
    <template #tags>
      <van-tag plain type="danger" style="margin-right: 8px; margin-top: 8px">
        {{
          teamStatusEnum[team.status]
        }}
      </van-tag>
    </template>
    <template #bottom>
      <div>
        {{ `队伍人数: ${team.hasJoinNum}/${team.maxNum}` }}
      </div>
      <div v-if="team.expireTime">
        {{ '过期时间: ' + team.expireTime }}
      </div>
      <div>
        {{ '创建时间: ' + team.createTime }}
      </div>
    </template>

    <template #footer>
      <van-button size="small" type="primary"
                  @click="doJoinTeam(team.id)">
        加入队伍
      </van-button>
    </template>
  </van-card>
</template>

<style scoped>

</style>