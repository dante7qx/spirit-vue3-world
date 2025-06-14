import type {I18nSchema} from "@/types/components/i18n.ts"


const zh: I18nSchema = {
  common: {
    cancel: '取消',
    confirm: '确定',
    close: '关闭',
    save: '保存',
    edit: '编辑',
    delete: '删除',
    add: '添加',
    search: '搜索',
    reset: '重置'
  },
  route: {
    home: '首页',
    elementPlus: 'Element Plus',
    basic: '基础组件',
    globalConfig: '全局配置',
    form: '表单组件',
    table: '表格组件',
    codegen: '代码生成器'
  },
  message: {
    logout: '你确定要退出登录吗？'
  },
  login: {
    username: '用户名',
    password: '密码',
    signIn: '登录',
    signUp: '注册',
    rememberMe: '记住我',
    forgotPassword: '忘记密码',
    noAccountYet: '还没有账号？',
    requireUserName: '请输入用户名',
    requirePassword: '请输入密码',
    loginSuccess: '登录成功！',
    loginFail: '用户名或密码错误！',
    logout: '退出登录'
  },
  index: {
    welcome: '你好，Vue3 + TypeScript + Vite + Element Plus ！',
    subtitle: '这是一个神秘的页面'
  },
  user: {
    profile: '个人中心'
  }
}

export default zh
