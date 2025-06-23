/**
 * 统一分页结果类型
 */
export interface PaginatedResult<T> {
  records: T[]
  total: number
  size: number
  current: number
  pages: number
}

export interface PageInfo {
  current: number         // 当前页码
  pageSize: number        // 每页显示的条数
  total?: number          // 总记录数 (可选)
  pageCount?: number      // 总页数 (可选)
}

/**
 * 统一 Ajax 请求结果类型
 */
export interface AjaxResult<T = any> {
  data: T
}