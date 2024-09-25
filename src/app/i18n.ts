import { createInstance, type i18n, type Resource } from 'i18next'
import { initReactI18next } from 'react-i18next/initReactI18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import i18nConfig from '~/i18nConfig'
import OtaClient from '@crowdin/ota-client'

export const namespaces = ['common', 'art', 'states', 'stories']

export async function initTranslations(
	locale: string,
	namespaces: string[],
	i18nInstance?: i18n,
	resources?: Resource
) {
	i18nInstance = i18nInstance ?? createInstance()
	i18nInstance.use(initReactI18next)

	if (!resources) {
		const ota = new OtaClient('e-dcab4bdc227e647407683b35wj')
		i18nInstance.use(
			resourcesToBackend((language: string, namespace: string) =>
				namespace === 'stories'
					? ota.getStringsByLocale(language)
					: import(`~public/locales/${language}/${namespace}.json`)
			)
		)
	}

	await i18nInstance.init({
		lng: locale,
		resources,
		fallbackLng: i18nConfig.defaultLocale,
		supportedLngs: i18nConfig.locales,
		defaultNS: namespaces[0],
		fallbackNS: namespaces[0],
		ns: namespaces,
		preload: resources ? [] : i18nConfig.locales,
	})

	return {
		i18n: i18nInstance,
		resources: i18nInstance.services.resourceStore.data,
		t: i18nInstance.t,
	}
}
