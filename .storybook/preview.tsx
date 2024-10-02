import { MantineProvider } from '@mantine/core'
import { type MantineProviderProps } from '@mantine/core'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
import { type StoryFn } from '@storybook/react'
import { type ReactNode } from 'react'
import { I18nextProvider } from 'react-i18next'

import { i18n, i18nLocales } from './i18next'
// import { fontWorkSans } from '~/app/_styles/fonts'
import { mantineTheme } from '~/app/_styles/theme'

export const parameters = {
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
const mantineProviderProps: Omit<MantineProviderProps, 'children'> = {}

const ThemeWrapper = ({ children }: DecoratorProps) => {
	return (
		<MantineProvider theme={mantineTheme} {...mantineProviderProps}>
			{/* <Global styles={fontWorkSans.style} /> */}
			{/* <TypographyStylesProvider> */}
			<I18nextProvider i18n={i18n}>{children}</I18nextProvider>
			{/* </TypographyStylesProvider> */}
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
