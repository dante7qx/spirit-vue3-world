import { createAlova } from 'alova'
import VueHook from 'alova/vue'
import adapterFetch from 'alova/fetch'
import $message from '@/utils/spirit'
import type {AjaxResult} from "@/types/api/types.ts";

const alovaInstance = createAlova({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  statesHook: VueHook,
  requestAdapter: adapterFetch(),

  // 全局请求拦截器
  beforeRequest(method) {
    method.config.headers = {
      'Content-Type': 'application/json',
      'accessToken': localStorage.getItem('token') || 'hello-naive-alova'
    }
  },
  // 全局响应拦截器, 包括请求成功的拦截器、请求失败的拦截器，和请求完成的拦截器。
  responded:  {
    // 请求成功的拦截器
    onSuccess: async (response, _method) : Promise<AjaxResult>  => {
      if (response.status >= 400) {
        throw new Error(response.statusText);
      }
      const json = await response.json();
      if (json.code !== 200) {
        // 抛出错误或返回reject状态的Promise实例时，此请求将抛出错误
        throw new Error(json.message);
      }
      // 解析的响应数据将传给method实例的transform钩子函数，这些函数将在后续讲解
      $message.success(json.message)
      return json
    },
    // 响应失败的拦截器
    onError: error => {
      console.log('onError', error.message)
      $message.error(error.message)
    },
    // 请求完成的拦截器, 无论成功或失败，都会执行该拦截器
    onComplete: async method => {
      console.log('onComplete', method)
    }
  }
})


export default alovaInstance

/*
  待拓展
    1. 文件上传 / 下载流
    2. 多接口并发
    3. 分页（load more）
    4. 自动重试
    5. 缓存（localStorage / memory）
    6. 状态共享（多个组件共享相同接口数据）
 */