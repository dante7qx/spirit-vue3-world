export interface LoginUser {
  id: string
  username: string
  nickname?: string
  avatar?: string
  email?: string
  roles?: string[]
  [key: string]: any
}

export interface AuthResult {
  accessToken: string
  user: LoginUser
}