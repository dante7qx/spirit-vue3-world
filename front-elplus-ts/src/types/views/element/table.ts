export interface User {
  id: number
  username: string
  email: string
  role: string
}

export type CreateUserDTO = Omit<User, 'id'>
export type UpdateUserDTO = Partial<CreateUserDTO>