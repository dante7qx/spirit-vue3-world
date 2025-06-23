<script setup lang="ts">
import { useRequest } from 'alova/client'
import { list } from '@/api/gencode/gen-code.ts'
import { NImage } from 'naive-ui'

const { loading, data, error, send } = useRequest(list, {
  immediate: true,
})
const columns = [
  { title: 'ID', key: 'id', width: 80, align: 'center' },
  { title: '用户名', key: 'username', width: 120, align: 'center' },
  { title: '姓名', key: 'realName', width: 100, align: 'center' },
  { title: '邮箱', key: 'email', width: 180, align: 'center' },
  { title: '手机号', key: 'mobile', width: 120, align: 'center' },
  {
    title: '头像',
    key: 'avatar',
    width: 80,
    align: 'center',
    render: (row) => {
      return h(
        NImage,
        {
          src: row.avatar,
          fit: 'cover',
          width: 40,
          height: 40,
          round: true,
        }
      )
    }
  },
  {
    title: '性别',
    key: 'gender',
    width: 80,
    align: 'center'
  },
  {
    title: '状态',
    key: 'status',
    width: 80,
    align: 'center'
  },
  { title: '部门ID', key: 'deptId', width: 80, align: 'center' },
  { title: '创建者', key: 'createBy', width: 100, align: 'center' },
  { title: '创建时间', key: 'createTime', width: 160, align: 'center' },
  { title: '更新时间', key: 'updateTime', width: 160, align: 'center' }
]
</script>

<template>
  <n-h2 style="text-align: center;">代码生成器</n-h2>
  <div v-if="error">{{ error.message }}</div>
  <div v-else>
    <div>请求结果: </div>
    <n-data-table
      :columns="columns"
      :data="data.data"
      :loading="loading"
      :max-height="700"
    ></n-data-table>
    <button @click="send">手动修改data</button>
  </div>
</template>

<style scoped lang="scss">

</style>