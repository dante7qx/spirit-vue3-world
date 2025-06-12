import type {I18nSchema} from "@/types/components/i18n.ts"

const en: I18nSchema = {
  common: {
    cancel: 'Cancel',
    confirm: 'Confirm',
    close: 'Close',
    save: 'Save',
    edit: 'Edit',
    delete: 'Delete',
    add: 'Add',
    search: 'Search',
    reset: 'Reset'
  },
  route: {
    home: 'Home',
    elementPlus: 'Element Plus',
    basic: 'Basic',
    globalConfig: 'GlobalConfig',
    form: 'Form',
    table: 'Table'
  },
  message: {
    logout: 'Are you sure you want to log out?'
  },
  login: {
    username: 'Username',
    password: 'Password',
    signIn: 'Sign In',
    signUp: 'Sign Up',
    rememberMe: 'Remember Me',
    forgotPassword: 'Forgot Password',
    noAccountYet: 'No Account Yet?',
    requireUserName: 'Please enter username',
    requirePassword: 'Please enter password',
    loginSuccess: 'Login Success!',
    loginFail: 'Incorrect username or password!',
    logout: 'Logout'
  },
  index: {
    welcome: 'Hello, Vue3 + TypeScript + Vite + Element Plus !',
    subtitle: 'This is a mystery page'
  },
  user: {
    profile: 'Profile'
  },
}

export default en