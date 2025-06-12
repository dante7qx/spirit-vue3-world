import {type Composer, createI18n} from "vue-i18n"
import zh from './zh'
import en from './en'
import type {I18nSchema} from "@/types/components/i18n.ts"
import type {Language} from 'element-plus/es/locale'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import enUs from 'element-plus/es/locale/lang/en'

const LOCALE_KEY = 'spirit-locale'
export type SupportedLocale = 'zh' | 'en'

// 获取所有语言信息
export const getLanguages = (): Record<SupportedLocale, string> => {
  return  {
    zh: '中文',
    en: 'English'
  }
}

// 获取当前语言信息
const currentLanguage = (localStorage.getItem(LOCALE_KEY) || 'zh') as SupportedLocale
export const currentLocale = ref<SupportedLocale>(currentLanguage)

// Element Plus 语言包映射
const elementLocales: Record<SupportedLocale, Language> = {
  zh: zhCn,
  en: enUs
}

// Element Plus 当前语言包
export const elementLocale = computed(() => elementLocales[currentLocale.value])

export const i18n = createI18n<[I18nSchema], SupportedLocale>({
  legacy: false,                        // 启用组合式 API
  locale: currentLanguage,              // 默认语言
  globalInjection: true,                // 全局注入 $t 函数
  fallbackLocale: 'en',                 // 回退语言
  messages: {
    zh,
    en,
  },
})

// 设置语言
export const setLanguage = (locale: SupportedLocale) => {
  currentLocale.value = locale
  localStorage.setItem(LOCALE_KEY, locale)

  const composer = i18n.global as unknown as Composer
  composer.locale.value = locale
}