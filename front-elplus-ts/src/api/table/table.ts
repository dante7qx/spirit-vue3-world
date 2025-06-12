import {RestApi} from '@/api/base'
import type {User, CreateUserDTO, UpdateUserDTO} from '@/types/views/element/table'

export const userApi = new RestApi<User, CreateUserDTO, UpdateUserDTO>('/users')
