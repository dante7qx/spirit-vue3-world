export interface SysUser {
  id: number // Long 对应 number
  username: string
  password: string
  realName: string
  email: string
  mobile: string
  avatar: string
  gender: number // Integer 对应 number，0-未知 1-男 2-女
  status: number // Integer 对应 number，0-禁用 1-正常
  deptId: number // Long 对应 number
  createBy: string
  createTime: string // LocalDateTime 对应 string（ISO8601 格式）
  updateBy: string
  updateTime: string // LocalDateTime 对应 string（ISO8601 格式）
  deleted: number // Integer 对应 number，0-未删除 1-已删除
}

export type CreateUserDTO = Omit<SysUser, 'id' | 'createBy' | 'createTime' | 'updateBy' | 'updateTime' | 'deleted'>
export type UpdateUserDTO = Partial<CreateUserDTO>