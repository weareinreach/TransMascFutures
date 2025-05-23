/* eslint-disable @typescript-eslint/no-floating-promises */
import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import HttpApi from 'i18next-http-backend'
import { type HttpBackendOptions } from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'

const ns = ['common', 'story']
export const i18nLocales = {
	en: 'English',
	es: 'Spanish',
}

const supportedLngs = Object.keys(i18nLocales)

i18n
	.use(LanguageDetector)
	.use(HttpApi)
	.use(initReactI18next)
	.init<HttpBackendOptions>({
		debug: true,
		lng: 'en',
		backend: {
			loadPath: '/public/locales/{{lng}}/{{ns}}.json',
		},
		fallbackLng: {
			'en-US': ['en'],
			'es-US': ['es'],
			'fr-US': ['fr'],
		},
		defaultNS: 'common',
		interpolation: { escapeValue: false },
		react: { useSuspense: false },
		cleanCode: true,
		supportedLngs,
		ns,
		// resources,
	})

export { i18n }
