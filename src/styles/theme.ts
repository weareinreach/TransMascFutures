import type { MantineThemeOverride, DefaultProps } from '@mantine/core'
import type { PolymorphicComponentProps } from '@mantine/utils'

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
		xs: 12,
		sm: 14,
		md: 16,
		lg: 18,
		xl: 20,
	},
	headings: {
		fontFamily:
			'Work Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji',
		fontWeight: 500,
		sizes: {
			h1: { fontSize: 40, lineHeight: 1.25, fontWeight: undefined },
			h2: { fontSize: 24, lineHeight: 1.25, fontWeight: undefined },
			h3: { fontSize: 16, lineHeight: 1.25, fontWeight: 600 },
			h4: { fontSize: 16, lineHeight: 1.25, fontWeight: 600 },
			h5: { fontSize: 16, lineHeight: 1.25, fontWeight: 600 },
			h6: { fontSize: 16, lineHeight: 1.25, fontWeight: 600 },
		},
	},
	other: themeCustomObj,
}

export type PolyComponent<ComponentProps extends DefaultProps> = PolymorphicComponentProps<
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>,
	ComponentProps
>
type ThemeCustomObject = typeof themeCustomObj
declare module '@mantine/core' {
	// eslint-disable-next-line @typescript-eslint/no-empty-interface
	export interface MantineThemeOther extends ThemeCustomObject {}
}
