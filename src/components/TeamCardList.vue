<script setup lang="ts">
import {TeamType} from "../models/team";
import {teamStatusEnum} from "../constants/team";
import kun from "../assets/kun.png"
import myAxios from "../plugins/myAxios.ts";
import {showToast} from "vant";
import {getCurrentUser} from "../services/user.ts";
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";

interface TeamCardListProps {
  teamList: TeamType[];
}

const props = defineProps<TeamCardListProps>();
const currentUser = ref();
const router = useRouter()
const showPasswordDialog = ref(false);
const joinTeamId = ref(0);
const password = ref('');

onMounted(async () => {
  currentUser.value = await getCurrentUser();
})

const preJoinTeam = (team: TeamType) => {
  joinTeamId.value = team.id;
  if (team.status === 0) {
    doJoinTeam()
  } else {
    showPasswordDialog.value = true;
  }
}

const doJoinCancel = () => {
  joinTeamId.value = 0;
  password.value = '';
}

const doJoinTeam = async () => {
  const res = await myAxios.post('/team/join', {
    teamId: joinTeamId.value,
    password: password.value
  });
  if (res?.code === 0) {
    showToast("加入成功");
  } else {
    showToast("加入失败" + res.descrpition ? `${res.description}` : '');
  }
}

const doUpdateTeam = async (id: number) => {
  router.push({
    path: '/team/update',
    query: {
      id,
    }
  })
}

const doQuitTeam = async (id: number) => {
  const res = await myAxios.post('/team/quit', {teamId: id});
  if (res?.code === 0) {
    showToast("退出成功");
  } else {
    showToast("退出失败" + res.descrpition ? `${res.description}` : '');
  }
}

const doDeleteTeam = async (id: number) => {
  const res = await myAxios.post('/team/delete', {id});
  if (res?.code === 0) {
    showToast("解散成功");
  } else {
    showToast("解散失败" + res.descrpition ? `${res.description}` : '');
  }
}

const formatDate = (value) => {
  const date = new Date(value);
  return date.toLocaleDateString('zh-CN'); // 使用本地化的日期格式
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
        {{ `小队人数: ${team.hasJoinNum}/${team.maxNum}` }}
      </div>
      <div v-if="team.expireTime">
        {{ '过期时间: ' + formatDate(team.expireTime) }}
      </div>
      <div>
        {{ '创建时间: ' + formatDate(team.createTime) }}
      </div>
    </template>

    <template #footer>
      <van-button v-if="team.createUser?.id !== currentUser?.id" size="small" type="primary"
                  @click="preJoinTeam(team)">
        加入小队
      </van-button>
      <van-button v-if="team.createUser?.id === currentUser?.id" size="small" @click="doUpdateTeam(team.id)">
        更新小队
      </van-button>
      <van-button v-if="team.createUser?.id !== currentUser?.id" size="small" type="primary"
                  @click="doQuitTeam(team.id)">
        退出小队
      </van-button>
      <van-button v-if="team.createUser?.id === currentUser?.id" size="small" type="danger" plain
                  @click="doDeleteTeam(team.id)">
        解散小队
      </van-button>
    </template>
  </van-card>
  <van-dialog v-model:show="showPasswordDialog" title="请输入密码" show-cancel-button @confirm="doJoinTeam"
              @cancel="doJoinCancel">
    <van-field v-model="password" placeholder="请输入密码"/>
  </van-dialog>
</template>

<style scoped>

</style>