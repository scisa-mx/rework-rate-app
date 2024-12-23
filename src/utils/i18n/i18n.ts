import { createI18n } from 'vue-i18n'

import enLocale from './locales/en.json'
import esLocale from './locales/es.json'

const i18n = createI18n({
  legacy: false,
  locale: 'es',
  fallbackLocale: 'es',
  messages: {
    es: esLocale,
    en: enLocale,
  },
})

export default i18n
