import {nanoid} from 'nanoid'
import type {AuthResult, LoginUser} from "@/types/login/auth-user.ts"

// 模拟用户列表
const userList: LoginUser[] = [
  {
    id: '1',
    username: 'admin',
    nickname: '管理员',
    password: 'admin123',
    avatar: 'https://avatars.githubusercontent.com/u/13984587?v=4',
    roles: ['admin']
  },
  {
    id: '200',
    username: 'user',
    nickname: '用户',
    password: 'user123',
    avatar: 'https://avatars.githubusercontent.com/u/13984587?v=4',
    roles: ['user']
  },
  {
    id: '300',
    username: 'guest',
    nickname: '访客',
    password: 'guest123',
    avatar: 'https://avatars.githubusercontent.com/u/13984587?v=4',
    roles: ['guest']
  }
]

// 模拟登录接口
export function login(username: string, password: string): Promise<AuthResult> {
  return new Promise((resolve, reject) => {
    const user = userList.find(user => user.username === username && user.password === password)
    if (user) {
      const accessToken = nanoid()
      resolve({ accessToken, user })
    } else {
      reject(new Error())
    }
  })
}