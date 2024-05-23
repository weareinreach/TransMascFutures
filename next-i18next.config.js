/* eslint-disable turbo/no-undeclared-env-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
// @ts-check
/* eslint-disable import/no-unused-modules */
const path = require('path')

const isBrowser = typeof window !== 'undefined'
const plugins = () => {
	/** @type {any[]} */
	const pluginsToUse = []
	if (process.env.NODE_ENV === 'development') {
		if (isBrowser) {
			import('i18next-hmr/plugin').then(({ HMRPlugin }) =>
				pluginsToUse.push(new HMRPlugin({ webpack: { client: true } }))
			)
		} else {
			import('i18next-hmr/plugin').then(({ HMRPlugin }) =>
				pluginsToUse.push(new HMRPlugin({ webpack: { server: true } }))
			)
		}
	}
	return pluginsToUse
}

/**
 * @template {import('next-i18next').UserConfig} T
 * @type {import('next-i18next').UserConfig}
 * @param {T} config
 * @constraint {{import('next-i18next').UserConfig}}
 */
const config = {
	i18n: {
		defaultLocale: 'en',
		locales: ['en', 'es'],
	},
	defaultNS: 'common',
	localePath: path.resolve('./public/locales'),
	reloadOnPrerender: process.env.NODE_ENV !== 'production',
	debug: false, //process.env.NODE_ENV !== 'production',
	nonExplicitSupportedLngs: true,
	cleanCode: true,
	react: { useSuspense: false },
	joinArrays: '',
	serializeConfig: false,
	use: plugins(),
	interpolation: {
		skipOnVariables: false,
		alwaysFormat: true,
		format: (value, format, lng, edit) => {
			switch (format) {
				case 'lowercase': {
					if (typeof value === 'string') return value.toLocaleLowerCase()
					break
				}
				case 'uppercase': {
					if (typeof value === 'string') return value.toLocaleUpperCase()
					break
				}
			}
			return value
		},
	},
}
module.exports = config
