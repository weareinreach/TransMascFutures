/* eslint-disable turbo/no-undeclared-env-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
// @ts-check
/* eslint-disable import/no-unused-modules */
const path = require('path')
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
