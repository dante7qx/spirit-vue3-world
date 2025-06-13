<script setup lang="ts">

import { userApi } from '@/api/table/table'
import type {SysUser} from "@/types/views/element/table.ts"
import type {PageInfo} from "@/types/api/types.ts"


// 获取用户分页列表
const userData = ref<SysUser[]>([])
const pageInfo = reactive<PageInfo>({
  current: 1,
  pageSize: 20,
  total: 0,
})

const loadPage = async (page: PageInfo) => {
  await userApi.page(page).then(res => {
    userData.value = res.records
    pageInfo.current = res.current
    pageInfo.pageSize = res.size
    pageInfo.total = res.total
  })
}

const edit = async (row: SysUser) => {
  console.log(row)
}

// 初始化页面
onMounted(() => {
  loadPage(pageInfo)
})


/*
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
*/
</script>

<template>
  <h3>表格 Table</h3>
  <el-text>
    <div style="margin-bottom: 20px;">
      用于展示多条结构类似的数据， 可对数据进行排序、筛选、对比或其他自定义操作。
    </div>
  </el-text>

  <el-table :data="userData" width="100%" max-height="calc(100vh - 255px)" table-layout="fixed">
    <el-table-column fixed align="center" prop="id" label="ID" width="80" />
    <el-table-column align="center" prop="username" label="用户名" width="150" />
    <el-table-column align="center" prop="realName" label="真实姓名" width="120" />
    <el-table-column align="center" prop="email" label="邮箱" width="200" />
    <el-table-column align="center" prop="mobile" label="手机号" width="130" />
    <el-table-column align="center" prop="avatar" label="头像" width="150">
      <template #default="scope">
        <el-image :src="scope.row.avatar" fit="cover" style="width: 40px; height: 40px; border-radius: 50%;" />
      </template>
    </el-table-column>
    <el-table-column align="center" prop="gender" label="性别" width="80">
      <template #default="scope">
        {{ scope.row.gender === 1 ? '男' : (scope.row.gender === 2 ? '女' : '未知') }}
      </template>
    </el-table-column>
    <el-table-column align="center" prop="status" label="状态" width="80">
      <template #default="scope">
        <el-tag v-if="scope.row.status === 1" type="success">正常</el-tag>
        <el-tag v-else type="danger">禁用</el-tag>
      </template>
    </el-table-column>
    <el-table-column align="center" prop="deptId" label="部门ID" width="100" />
    <el-table-column align="center" prop="createBy" label="创建人" width="120" />
    <el-table-column align="center" prop="createTime" label="创建时间" width="160" />
    <el-table-column align="center" prop="updateBy" label="更新人" width="120" />
    <el-table-column align="center" prop="updateTime" label="更新时间" width="160" />
    <el-table-column align="center" label="操作" width="240" fixed="right">
      <template #default="scope">
        <el-button text size="small" @click="edit(scope.row)">查看</el-button>
         <el-button text size="small">编辑</el-button>
         <el-button text size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

  <pagination
    v-if="(pageInfo.total as number) > 0"
    :current="pageInfo.current"
    :page-size="pageInfo.pageSize"
    :total="pageInfo.total ?? 0"
    @pagination="loadPage" />

</template>

<style scoped lang="scss">

</style>