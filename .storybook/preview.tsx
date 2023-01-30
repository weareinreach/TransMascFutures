import { Global, MantineProvider, TypographyStylesProvider } from '@mantine/core'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
import { I18nextProvider } from 'react-i18next'

import { i18n, i18nLocales } from './i18next'
import { storybookFont } from '../src/styles'
import { theme } from '../src/styles/theme'

import type { MantineProviderProps } from '@mantine/core'
import type { StoryFn } from '@storybook/react'
import type { ReactNode } from 'react'

export const parameters = {
	actions: { argTypesRegex: '^on[A-Z].*' },
	layout: 'centered',
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
	i18n,
	locale: 'en',
	locales: i18nLocales,
	viewport: {
		viewports: INITIAL_VIEWPORTS,
	},
}
const mantineProviderProps: Omit<MantineProviderProps, 'children'> = {
	withCSSVariables: false,
	withGlobalStyles: true,
	withNormalizeCSS: false,
}

const ThemeWrapper = ({ children }: DecoratorProps) => {
	return (
		<MantineProvider theme={theme} {...mantineProviderProps}>
			<Global styles={storybookFont} />
			<TypographyStylesProvider>
				<I18nextProvider i18n={i18n}>{children}</I18nextProvider>
			</TypographyStylesProvider>
		</MantineProvider>
	)
}

export const decorators = [
	(Story: StoryFn) => (
		<ThemeWrapper>
			<Story />
		</ThemeWrapper>
	),
]

type DecoratorProps = {
	children: ReactNode
}
