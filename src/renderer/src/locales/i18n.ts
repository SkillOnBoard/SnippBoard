import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import languages from './languages'

// Configuración de i18n
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: languages,
    fallbackLng: 'en',
    interpolation: { escapeValue: false } // React ya se encarga de escapar por seguridad
  })

export default i18n
