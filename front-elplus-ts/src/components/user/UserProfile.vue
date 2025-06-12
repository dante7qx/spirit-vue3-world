<script setup lang="ts">
import {UserFilled} from "@element-plus/icons-vue"
import {useLoginUserStore} from "@/store/login-user.ts"
import {ElMessageBox} from "element-plus"
import router from "@/router"
import {useI18n} from "vue-i18n"
import type {LoginUser} from "@/types/login/auth-user.ts"

const { t } = useI18n()
const loginUser: LoginUser | null = useLoginUserStore().loginUser

const handleUserCommand = (command: string) => {
  if (command === 'profile') {
    console.log('profile')
  } else if (command === 'logout') {
    ElMessageBox.confirm(
        t('message.logout'),
        {
          confirmButtonText: t('common.confirm'),
          cancelButtonText: t('common.cancel'),
          type: 'warning',
        }
    )
    .then(() => {
      useLoginUserStore().logout()
      router.push('/login') // 跳转到登录页
    }).catch(() => {})
  }
}
</script>

<template>
  <el-dropdown @command="handleUserCommand" placement="bottom">
    <div class="box-avatar">
      <el-avatar :icon="UserFilled" size="default" :src="loginUser != null ? loginUser.avatar : ''" />
      <el-text class="user-profile">
        <b>{{ loginUser != null ? loginUser.nickname : '暂无昵称' }}</b>
      </el-text>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="profile">
          <span>{{ t('user.profile') }}</span>
        </el-dropdown-item>
        <el-dropdown-item divided command="logout">
          <span>{{ t('login.logout') }}</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>

</template>

<style scoped lang="scss">
.box-avatar {
  display: flex;
  align-items: center;
  cursor: pointer;

  .user-profile {
    margin-left: 10px;
    font-size: 14px;
    color: #333;
    .dark & {
      color: #eff0fd;
    }
  }
}
:deep(.el-dropdown) {
  border: none;
}
</style>