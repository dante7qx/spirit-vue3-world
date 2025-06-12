/**
 * i18n 类型接口
 */
export interface I18nSchema {
  common: {
    cancel: string
    confirm: string
    close: string
    save: string
    edit: string
    delete: string
    add: string
    search: string
    reset: string
  }
  // 路由
  route: {
    home: string
    elementPlus: string
    basic: string
    globalConfig: string
    form: string
    table: string
  },
  // 消息
  message: {
    logout: string
  },
  // 登录
  login: {
    username: string
    password: string
    signIn: string
    signUp: string
    rememberMe: string
    forgotPassword: string
    noAccountYet: string
    requireUserName: string
    requirePassword: string
    loginSuccess: string
    loginFail: string
    logout: string
    [key: string]: any
  },
  // 首页
  index: {
    welcome: string
    subtitle: string
  },
  // 用户相关
  user: {
    profile: string
  }
}