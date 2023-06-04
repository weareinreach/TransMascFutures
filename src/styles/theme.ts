import { type AnchorStylesParams, em, type MantineThemeOverride, rem, type Styles } from '@mantine/core'

const themeCustomObj = {
	colors: {
		glaadGray: '#BEBEBE',
		midGray: '#65676B',
		black: '#000000',
		white: '#FFFFFF',
		blue: '#5BCEFA',
		pink: '#F5A9B8',
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
	breakpoints: {
		xs: em(500),
		sm: em(768),
		md: em(1024),
		lg: em(1200),
		xl: em(1440),
	},
	components: {
		Anchor: {
			variants: {
				category: (theme) =>
					({
						root: {
							fontSize: rem(15),
							color: theme.other.colors.black,
							fontWeight: 500,
							textDecoration: 'underline',
							...theme.fn.hover({ textDecoration: 'none' }),
						},
					} satisfies Styles<'root', AnchorStylesParams>),
			},
		},
		Button: {
			defaultProps: {
				variant: 'primary',
			},
			variants: {
				primary: (theme) => ({
					root: {
						borderRadius: 0,
						fontWeight: 600,
						height: 'auto',
						padding: rem(15),
						textAlign: 'center',
						width: rem(175),
						color: theme.other.colors.white,
						backgroundColor: theme.other.colors.black,
						['&:hover']: {
							backgroundColor: theme.other.colors.midGray,
						},
					},
					label: {
						whiteSpace: 'normal',
					},
				}),
				secondary: (theme) => ({
					root: {
						borderRadius: 0,
						fontWeight: 600,
						height: 'auto',
						padding: rem(15),
						textAlign: 'center',
						width: rem(175),
						backgroundColor: theme.other.colors.midGray,
						['&:hover']: {
							backgroundColor: theme.other.colors.black,
						},
					},
					label: {
						whiteSpace: 'normal',
						textTransform: 'uppercase',
					},
				}),
			},
		},
	},
	other: themeCustomObj,
}

export type ThemeCustomObject = typeof themeCustomObj
