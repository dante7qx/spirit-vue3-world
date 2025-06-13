import {RestApi} from '@/api/base'
import type {SysUser, CreateUserDTO, UpdateUserDTO} from '@/types/views/element/table'

export const userApi = new RestApi<SysUser, CreateUserDTO, UpdateUserDTO>('/user')
