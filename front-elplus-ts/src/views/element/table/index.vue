<script setup lang="ts">
import { userApi } from '@/api/table/table'

// 获取用户列表
const users = await userApi.getList({ page: 1, size: 20 })
console.table(users)

// 获取用户详情
const user = await userApi.getOne(1)
console.table(users)

// 创建用户
await userApi.create({
  username: 'alice',
  email: 'a@example.com',
  role: 'admin',
})

// 更新用户
await userApi.update(1, { email: 'new@example.com' })

// 删除用户
await userApi.remove(1)


</script>

<template>
  <h3>表格 Table</h3>
  <el-text>用于展示多条结构类似的数据， 可对数据进行排序、筛选、对比或其他自定义操作。</el-text>
</template>

<style scoped lang="scss">

</style>