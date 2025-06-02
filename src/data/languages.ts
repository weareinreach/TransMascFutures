export type LocaleCodes = 'en' | 'es' | 'fr'

export const translatedLangs = [
	{ localeCode: 'en' as const, nativeName: 'English' },
	{ localeCode: 'es' as const, nativeName: 'Español' },
	{ localeCode: 'fr' as const, nativeName: 'Français' },
]

const localesArrayForType = translatedLangs.map((lang) => lang.localeCode)
export type LocaleCodesDerived = (typeof localesArrayForType)[number]
