<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import {currentLocale, getLanguages, setLanguage, type SupportedLocale} from "@/locales"
import { useLoginUserStore } from '@/store/login-user.ts'
import router from "@/router"
import type {AuthResult} from "@/types/login/auth-user.ts"
import {login} from "@/api/login/login.ts"

const { t } = useI18n()
const formRef = ref()
const form = ref({
  username: 'admin',
  password: 'admin123',
  remember: false
})

const rules = {
  username: [{ required: true, message: t('login.requireUserName'), trigger: 'blur' }],
  password: [{ required: true, message: t('login.requirePassword'), trigger: 'blur' }]
}

const languages = computed(() => getLanguages())
const switchLocale = (value: unknown) => {
  setLanguage(value as SupportedLocale)
}

const onLogin = async () => {
  await formRef.value.validate((valid: boolean) => {
    if (valid) {
      login(form.value.username, form.value.password).then(resp => {
        persistLoginUser(resp)
        ElMessage.success(t('login.loginSuccess'))
      }).catch(_error => {
        ElMessage.error(t('login.loginFail'))
      })
    }
  })
}

// 使用 Pinia 保存登录用户信息
const persistLoginUser = (resp: AuthResult) => {
  const store = useLoginUserStore()
  const user = resp.user
  store.setLoginUser({
    id: user.id,
    username: user.username,
    nickname: user.nickname,
    avatar: user.avatar,
    email: user.email,
    roles: user.roles
  })
  store.setToken(resp.accessToken)
  router.push('/')
}
</script>

<template>
  <div class="login-container">
    <div class="login-box">
      <div class="login-left">
        <img src="@/assets/login-bg.jpg" alt="login banner" />
      </div>
      <div class="login-right">
        <h2 class="login-title">{{ t('login.signIn') }}</h2>
        <div class="social-icons">
          <el-radio-group v-model="currentLocale" size="small" fill="#67C23A" @change="switchLocale">
            <el-radio-button v-for="(value, key) in languages" :key="key" :label="value" :value="key" />
          </el-radio-group>
        </div>
        <el-form :model="form" :rules="rules" ref="formRef" class="login-form">
          <el-form-item prop="username">
            <el-input v-model="form.username" :placeholder="t('login.username')" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="form.password" type="password" :placeholder="t('login.password')" show-password />
          </el-form-item>
          <el-button type="warning" class="login-btn" @click="onLogin">{{ t('login.signIn') }}</el-button>
          <div class="login-options">
            <el-checkbox v-model="form.remember">{{ t('login.rememberMe') }}</el-checkbox>
            <a href="#" class="forgot">{{ t('login.forgotPassword') }}</a>
          </div>
          <div class="signup">
            {{ $t('login.noAccountYet') }} <a href="#">{{ t('login.signUp') }}</a>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/login.scss';
</style>