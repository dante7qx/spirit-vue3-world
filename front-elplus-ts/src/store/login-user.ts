import {defineStore} from 'pinia'
import type {LoginUser} from "@/types/user.ts"

const STORE_KEY = 'spirit-login-user'

export const useLoginUserStore = defineStore(STORE_KEY, {
  state: ()=> ({
    accessToken: '',
    loginUser: null as LoginUser | null,
  }),
  actions: {
    setLoginUser(user: LoginUser) {
      this.loginUser = user
    },
    clearLoginUser() {
      this.loginUser = null
    },
    setToken(token: string) {
      this.accessToken = token
    },
    clearToken() {
      this.accessToken = ''
    },
    logout() {
      this.clearLoginUser()
      this.clearToken()
      localStorage.removeItem(STORE_KEY)
      // 调用 API 注销或跳转到登录页
    }
  },
  persist: {
    storage: localStorage
  }
})