<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import myAxios from "../../plugins/myAxios.ts";
import {showToast} from "vant"
import {TeamType} from "../../models/team";
// 展示日期选择器
const showPicker = ref(false);
const minDate = new Date();
const router = useRouter();
const route = useRoute();
const id = route.query.id;

// 需要用户填写的表单数据
const addTeamData = ref<TeamType>({})

// 获取之前的小队信息
onMounted(async () => {
  if (id <= 0) {
    showToast('加载小队失败');
    return;
  }
  const res = await myAxios.get("/team/get", {
    params: {
      id,
    }
  });
  if (res?.code === 0) {
    addTeamData.value = res.data; // 设置响应式对象的值
  } else {
    showToast('加载小队失败，请刷新重试');
  }
});

const onConfirm = ({selectedValues}) => {
  const year = selectedValues[0];
  const month = selectedValues[1] - 1; // 减去1以匹配 JavaScript 的月份索引
  const day = selectedValues[2];

  // 构造日期对象，使用 UTC 方法
  const expireDate = new Date(Date.UTC(year, month, day));

  // 格式化成 ISO 8601 格式的日期字符串
  const isoExpireDate = expireDate.toISOString().split('T')[0]; // 只获取日期部分，去掉时间部分

  // 更新 addTeamData.expireTime
  addTeamData.expireTime = isoExpireDate;

  console.log(addTeamData.expireTime);
  showPicker.value = false;
};

// 提交
const onSubmit = async () => {
  const postData = {
    ...addTeamData.value,
    expireTime: addTeamData.expireTime,
    status: Number(addTeamData.value.status)
  }
  console.log(addTeamData.value)
  // todo 前端参数校验
  const res = await myAxios.post("/team/update", postData);
  if (res?.code === 0 && res.data) {
    showToast('更新成功');
    router.push({
      path: '/team',
      replace: true,
    });
  } else {
    showToast('更新失败');
  }
}

const formatDate = (value) => {
  const date = new Date(value);
  return date.toLocaleDateString('zh-CN'); // 使用本地化的日期格式
}

</script>

<template>
  <div id="teamJoinPage">
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
            v-model="addTeamData.name"
            name="name"
            label="小队名"
            placeholder="请输入小队名"
            :rules="[{ required: true, message: '请输入小队名' }]"
        />
        <van-field
            v-model="addTeamData.description"
            rows="4"
            autosize
            label="小队描述"
            type="textarea"
            placeholder="请输入小队描述"
        />
        <van-field
            is-link
            readonly
            name="datePicker"
            label="过期时间"
            :placeholder="formatDate(addTeamData.expireTime) ?? '点击选择过期时间'"
            @click="showPicker = true"
        />
        <van-popup v-model:show="showPicker" position="bottom">
          <van-date-picker
              @confirm="onConfirm"
              @cancel="showPicker = false"
              title="选择日期"
              :min-date="minDate"
          />
        </van-popup>
        <van-field name="radio" label="小队状态">
          <template #input>
            <van-radio-group v-model="addTeamData.status" direction="horizontal">
              <van-radio name="0">公开</van-radio>
              <van-radio name="2">加密</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field
            v-if="Number(addTeamData.status) === 2"
            v-model="addTeamData.password"
            type="password"
            name="password"
            label="密码"
            placeholder="请输入小队密码"
            :rules="[{ required: true, message: '请填写密码' }]"
        />
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<style scoped>
#teamJoinPage {

}
</style>