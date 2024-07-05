<script setup lang="ts">
import {ref} from 'vue';
import {useRouter} from "vue-router";

const searchText = ref('');

const onSearch = () => {
  tagList.value = oraginTagList.map(parentTag => {
    const tempChildren = [...parentTag.children];
    const tempParentTag = {...parentTag};
    tempParentTag.children = tempChildren.filter(item => item.text.includes(searchText.value));
    return tempParentTag;
  })
};
const onCancel = () => {
  searchText.value = '';
  tagList.value = oraginTagList;
};

const router = useRouter()
const doSearchResult = () => {
  router.push({
    path: '/user/list',
    query: {
      tags: activeIds.value
    }
  })
}

//已选中的标签
const activeIds = ref(['男', '女']);
const activeIndex = ref(0);
const oraginTagList = [
  {
    text: '性别',
    children: [
      {text: '男', id: '男'},
      {text: '女', id: '女'},
    ],
  },
  {
    text: '年级',
    children: [
      {text: '大一', id: '大一'},
      {text: '大二', id: '大二'},
      {text: '大三', id: '大三'},
    ],
  },
  {
    text: '运动',
    children: [
      {text: '羽毛球', id: '羽毛球'},
      {text: '篮球', id: '篮球'},
      {text: '足球', id: '足球'},
      {text: '乒乓球', id: '乒乓球'},
      {text: '跑步', id: '跑步'},
    ],
  },
  {
    text: '兴趣',
    children: [
      {text: 'C++', id: 'C++'},
      {text: 'Java', id: 'Java'},
      {text: 'Python', id: 'Python'},
      {text: 'C#', id: 'C#'},
      {text: 'Golang', id: 'Golang'},
      {text: '前端', id: '前端'},
      {text: '后端', id: '后端'},
    ],
  }
];
let tagList = ref(oraginTagList);

const doClose = (tag) => {
  activeIds.value = activeIds.value.filter(item => {
        return item !== tag
      }
  )
}

</script>

<template>
  <form action="/">
    <van-search
        v-model="searchText"
        show-action
        placeholder="请输入要搜索的标签"
        @search="onSearch"
        @cancel="onCancel"
    />
  </form>
  <van-divider content-position="left">已选标签</van-divider>
  <div v-if="activeIds.length === 0">请选择标签</div>

  <van-row gutter="10" style="padding: 0 16px">
    <van-col v-for="tag in activeIds">
      <van-tag closeable size="medium" type="primary" @close="doClose(tag)">
        {{ tag }}
      </van-tag>
    </van-col>
  </van-row>

  <van-divider content-position="left">选择标签</van-divider>

  <van-tree-select
      v-model:active-id="activeIds"
      v-model:main-active-index="activeIndex"
      :items="tagList"
  />
  <div style="padding: 12px">
    <van-button block type="primary" @click="doSearchResult">搜索</van-button>
  </div>

</template>

<style scoped>

</style>