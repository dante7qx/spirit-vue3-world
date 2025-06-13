import http from '@/api/http.ts'
import type {AjaxResult, PaginatedResult} from "@/types/api/types.ts"

/**
 * 封装的RestApi类
 *
 * @param T 表示返回的数据类型
 * @param CreateDTO 表示新增数据的类型
 * @param UpdateDTO 表示更新数据的类型
 */
export class RestApi<
    T,
    CreateDTO = Partial<T>,
    UpdateDTO = Partial<T>,
    QueryDTO = any
> {
  // 参数属性
  constructor(private basePath: string) {}
  /*
  // 上面的写法等同于下面的写法，但是参数属性的写法更简洁，而且可以直接在构造函数中使用this.basePath
  private basePath: string
  constructor(basePath: string) {
    this.basePath = basePath
  }
  */
  page(query?: QueryDTO): Promise<PaginatedResult<T>> {
    return http.post(`${this.basePath}/page`, query)
  }

  list(query?: QueryDTO): Promise<AjaxResult<T>> {
    return http.post(`${this.basePath}/list`, { query })
  }

  get(id: number | string): Promise<T> {
    return http.post(`${this.basePath}/${id}`)
  }

  create(data: CreateDTO): Promise<T> {
    return http.post(`${this.basePath}/edit`, data)
  }

  update(data: UpdateDTO): Promise<T> {
    return http.post(`${this.basePath}/edit`, data)
  }

  updateWithId(id: number | string, data: UpdateDTO): Promise<T> {
    return http.post(`${this.basePath}/${id}`, data)
  }

  remove(id: number | string): Promise<void> {
    return http.post(`${this.basePath}/del/${id}`)
  }
}

/*
  待拓展
    1. 返回结构统一封装（如 { data, code }），	可在 http.ts 中响应拦截器中提取 res.data.data
    2. 统一分页类型定义，创建 PaginatedResult<T> 接口
    3. 后端资源路径变化，可通过 RestAPI 构造参数传入动态路径
 */