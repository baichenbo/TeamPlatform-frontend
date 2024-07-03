<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {showToast} from 'vant';
import {getCurrentUser} from "../services/user.ts";

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
    [editUser.value.editKey]: editUser.value.currentValue,
  })
  console.log(res, '更新请求')
  if (res.code === 0 && res.data > 0) {
    showToast('修改成功');
    router.back();
  } else {
    showToast('修改错误');
  }
  // todo 把 editKey editName currentValue 提交到后台
  console.log("onSubmit", values);
};

</script>

<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="editUser.currentValue"
          :name="editUser.editKey"
          :label="editUser.editName"
          :placeholder="'请输入${editUser.editName}'"

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