// src/utils/http.ts
import axios, {AxiosError, AxiosHeaders} from 'axios'
import { useLoginUserStore } from '@/store/login-user.ts'

// 创建 axios 实例，使用 fetch adapter
const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 15000,   // 请求超时时间, 单位毫秒
  adapter: 'fetch', // 使用 fetch 为底层
})

// 请求拦截器
http.interceptors.request.use(config => {
  const authStore = useLoginUserStore()
  const token = authStore.accessToken

  // 初始化 headers（确保类型兼容 AxiosHeaders）
  if (!config.headers) {
    config.headers = AxiosHeaders.from({})
  }

  const headers = config.headers

  // 设置 Authorization
  if (token && typeof headers.set === 'function') {
    headers.set('Authorization', `Bearer ${token}`)
  }

  // 自动设置 Content-Type
  const isFormData = config.data instanceof FormData
  const isUrlEncoded = config.data instanceof URLSearchParams
  const isJsonObject =
      typeof config.data === 'object' &&
      config.data !== null &&
      !isFormData &&
      !isUrlEncoded
  if (isJsonObject && !headers.get('Content-Type')) {
    headers.set('Content-Type', 'application/json')   // 自动设置为 JSON
  }

  return config
})

// 响应拦截器
http.interceptors.response.use(
    res => {
      return res.data
    },
    (error: AxiosError) => {
      // 根据错误类型进行统一处理
      if (error.response) {
        const status = error.response.status

        if (status === 401) {
          // 可跳转登录页或清除登录态
          const authStore = useLoginUserStore()
          authStore.logout()
        }

        // 可根据需求使用 UI 框架提示
        console.error('HTTP Error:', status, error.message)
      } else if (error.request) {
        console.error('Network error or timeout:', error.message)
      }

      return Promise.reject(error)
    }
)

export default http

/*
待完善功能：

文件下载（Blob 响应）
NProgress 页面加载提示
Refresh Token 自动续签
多实例支持（多个后端 baseURL）

*/