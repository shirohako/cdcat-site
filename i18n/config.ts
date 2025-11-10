import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import zhCN from './locales/zh-CN.json';
import en from './locales/en.json';

// 翻译资源
const resources = {
  'zh-CN': {
    translation: zhCN
  },
  en: {
    translation: en
  }
};

i18n
  // 检测用户语言
  .use(LanguageDetector)
  // 传递 i18n 实例给 react-i18next
  .use(initReactI18next)
  // 初始化 i18next
  .init({
    resources,
    fallbackLng: 'zh-CN', // 回退语言
    debug: false,

    // 语言检测选项
    detection: {
      order: ['localStorage', 'navigator'], // 优先从 localStorage 读取，然后是浏览器设置
      caches: ['localStorage'], // 缓存用户语言选择到 localStorage
      lookupLocalStorage: 'i18nextLng',
    },

    interpolation: {
      escapeValue: false // React 已经默认转义了
    }
  });

export default i18n;
