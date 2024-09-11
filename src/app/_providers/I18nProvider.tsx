'use client'

import { I18nextProvider } from 'react-i18next'
import initTranslations from '~/app/i18n'
import { createInstance, type Resource } from 'i18next'

export function I18nProvider({ children, locale, namespaces, resources }: I18nProviderProps) {
	const i18n = createInstance()

	initTranslations(locale, namespaces, i18n, resources).catch(console.error)

	return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
}

type I18nProviderProps = {
	children: React.ReactNode
	locale: string
	namespaces: string[]
	resources: Resource
}
