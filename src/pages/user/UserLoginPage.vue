<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {ref} from 'vue';
import {showToast} from 'vant';
import myAxios from "../../plugins/myAxios.ts";

const router = useRouter();
const route = useRoute();
const userAccount = ref('');
const userPassword = ref('');

const onSubmit = async () => {
  const res = await myAxios.post('/user/login', {
    userAccount: userAccount.value,
    userPassword: userPassword.value,
  })

  console.log(res, '用户登录');
  if (res.code === 0 && res.data) {
    showToast('登录成功');
    // 跳转到之前的页面
    const redirectUrl = route.query?.redirect as string ?? '/';
    window.location.href = redirectUrl;
  } else {
    showToast('登录失败')
  }
};
const defaultList = [
  { id: 100, text: '一起来交朋友吧' },
  { id: 101, text: '我要学Java' },
  { id: 102, text: 'PHP是世界上最好的语言~' },
  { id: 103, text: '趁红利，狠赚笔！' },
  { id: 104, text: '小白好棒！！！' },
  { id: 105, text: 'HR你好~~~' },
  { id: 106, text: '666' },
  { id: 106, text: '我要找工作！！！' },
  { id: 107, text: '我爱编程~~~' },
  { id: 107, text: '我喜欢唱、跳、rap、basketball！' },
];
const list = ref([...defaultList]);

</script>

<template>

  <div>
    <van-barrage v-model="list" auto-play duration="8000" delay="1000">
      <div class="video" style="width: 100%; height: 150px"></div>
    </van-barrage>
  </div>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="userAccount"
          name="userAccount"
          label="账号"
          placeholder="请输入账号"
          :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
          v-model="userPassword"
          type="password"
          name="密码"
          label="密码"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请填写密码' }]"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>

<style scoped>

</style>