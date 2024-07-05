<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {ref} from "vue";
import myAxios from "../../plugins/myAxios.ts";
import {showToast} from 'vant';
import {getCurrentUser} from "../../services/user.ts";

const route = useRoute()
const router = useRouter()

const editUser = ref({
  editKey: route.query.editKey,
  editName: route.query.editName,
  currentValue: route.query.currentValue
})

const onSubmit = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    showToast('用户未登录')
    return
  }

  const res = await myAxios.post("/user/update", {
    'id': currentUser.id,
    [editUser.value.editKey]: genderChecked.value,
  })
  if (res.code === 0 && res.data > 0) {
    showToast('修改成功');
    router.back();
  } else {
    showToast('修改错误');
  }
};
const genderChecked=ref('男');

</script>

<template>
  <van-form @submit="onSubmit">
    <van-radio-group v-model="genderChecked" style="margin-top: 20px; margin-bottom: 20px; padding-left: 20px;">
      <van-radio name="男">男</van-radio>
      <van-radio name="女" style="margin-top: 20px;">女</van-radio>
    </van-radio-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>

<style scoped>

</style>