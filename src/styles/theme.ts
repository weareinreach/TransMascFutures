import { rem } from '@mantine/core'
import { type MantineThemeOverride } from '@mantine/core'

const themeCustomObj = {
	colors: {
		glaadGray: '#BEBEBE',
		midGray: '#65676B',
		black: '#000000',
	},
} as const

export const theme: MantineThemeOverride = {
	colorScheme: 'light',
	fontFamily:
		'Work Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji',
	fontSizes: {
		xs: rem(12),
		sm: rem(14),
		md: rem(16),
		lg: rem(18),
		xl: rem(20),
	},
	headings: {
		fontFamily:
			'Work Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji',
		fontWeight: 500,
		sizes: {
			h1: { fontSize: rem(40), lineHeight: 1.25, fontWeight: undefined },
			h2: { fontSize: rem(24), lineHeight: 1.25, fontWeight: undefined },
			h3: { fontSize: rem(16), lineHeight: 1.25, fontWeight: 600 },
			h4: { fontSize: rem(16), lineHeight: 1.25, fontWeight: 600 },
			h5: { fontSize: rem(16), lineHeight: 1.25, fontWeight: 600 },
			h6: { fontSize: rem(16), lineHeight: 1.25, fontWeight: 600 },
		},
	},
	other: themeCustomObj,
}

export type ThemeCustomObject = typeof themeCustomObj
