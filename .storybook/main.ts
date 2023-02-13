import { merge } from 'merge-anything'

import type { StorybookConfig } from '@storybook/nextjs'

const config: StorybookConfig = {
	stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
	staticDirs: [
		{
			from: '../public',
			to: '/',
		},
	],
	addons: [
		'@storybook/addon-a11y',
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-interactions',
	],
	framework: {
		name: '@storybook/nextjs',
		options: {},
	},
	docs: {
		autodocs: 'tag',
	},
	typescript: {
		check: true,
		reactDocgen: 'react-docgen-typescript',
		reactDocgenTypescriptOptions: {
			shouldExtractLiteralValuesFromEnum: true,
			shouldExtractValuesFromUnion: true,
			compilerOptions: {
				esModuleInterop: false,
			},
		},
	},
	webpackFinal: (config) => {
		const configAdditions: typeof config = {
			resolve: {
				alias: {
					'next-i18next': 'react-i18next',
				},
			},
		}
		const mergedConfig = merge(config, configAdditions)
		return mergedConfig
	},
}

export default config
