import {
	type AnchorStylesParams,
	type CheckboxStylesNames,
	type CheckboxStylesParams,
	em,
	type InputWrapperStylesNames,
	type MantineThemeOverride,
	type RadioStylesNames,
	type RadioStylesParams,
	rem,
	type StepperStylesNames,
	type StepperStylesParams,
	type Styles,
	type TextInputStylesNames,
} from '@mantine/core'

const themeCustomObj = {
	colors: {
		glaadGray: '#BEBEBE',
		midGray: '#65676B',
		softBlack: '#21272c',
		black: '#000000',
		white: '#FFFFFF',
		blue: '#5BCEFA',
		pink: '#F5A9B8',
	},
} as const
const hoverAlpha = 0.5
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
							color: theme.other.colors.black, // eslint-disable-line @typescript-eslint/no-unsafe-member-access
							fontWeight: 500,
							textDecoration: 'underline',
							...theme.fn.hover({ textDecoration: 'none' }),
						},
					}) satisfies Styles<'root', AnchorStylesParams>,
			},
		},
		Button: {
			defaultProps: {
				variant: 'primary',
			},
			variants: {
				primary: (theme) => ({
					root: {
						borderRadius: rem(8),
						fontWeight: 600,
						height: 'auto',
						padding: rem(15),
						textAlign: 'center',
						width: rem(175),
						color: theme.other.colors.black, // eslint-disable-line @typescript-eslint/no-unsafe-member-access
						backgroundColor: theme.other.colors.pink, // eslint-disable-line @typescript-eslint/no-unsafe-member-access
						// ['&:hover']: {
						// 	backgroundColor: theme.other.colors.blue,
						// },
						...theme.fn.hover({
							background: `linear-gradient(210deg, rgba(91,206,250,${hoverAlpha}) 0%, rgba(245,169,184,${hoverAlpha}) 25%, rgba(255,255,255,${hoverAlpha}) 50%, rgba(245,169,184,${hoverAlpha}) 75%, rgba(91,206,250,${hoverAlpha}) 100%);`,
						}),
					},
					label: {
						whiteSpace: 'normal',
					},
				}),
				secondary: (theme) => ({
					root: {
						fontWeight: 600,
						height: 'auto',
						padding: rem(15),
						textAlign: 'center',
						width: rem(175),
						backgroundColor: theme.other.colors.blue, // eslint-disable-line @typescript-eslint/no-unsafe-member-access
						borderRadius: rem(8),
						// ['&:hover']: {
						// 	backgroundColor: theme.other.colors.pink,
						// },
						...theme.fn.hover({
							background: `linear-gradient(210deg, rgba(91,206,250,${hoverAlpha}) 0%, rgba(245,169,184,${hoverAlpha}) 25%, rgba(255,255,255,${hoverAlpha}) 50%, rgba(245,169,184,${hoverAlpha}) 75%, rgba(91,206,250,${hoverAlpha}) 100%);`,
						}),
					},
					label: {
						whiteSpace: 'normal',
						textTransform: 'uppercase',
					},
				}),
			},
		},
		TextInput: {
			styles: (theme) =>
				({
					input: {
						maxWidth: rem(300),
					},
				}) satisfies Styles<TextInputStylesNames>,
		},
		Textarea: {
			styles: (theme) => ({
				input: {
					maxWidth: rem(450),
				},
			}),
		},
		InputWrapper: {
			styles: (theme) =>
				({
					label: { marginBottom: rem(4) },
				}) satisfies Styles<InputWrapperStylesNames>,
		},
		Checkbox: {
			styles: (themes) =>
				({
					body: {
						margin: `${rem(8)} 0`,
					},
				}) satisfies Styles<CheckboxStylesNames, CheckboxStylesParams>,
		},
		Radio: {
			styles: (themes) =>
				({
					body: {
						margin: `${rem(8)} 0`,
					},
				}) satisfies Styles<RadioStylesNames, RadioStylesParams>,
		},
		Stepper: {
			styles: (theme) =>
				({
					content: {
						// padding: `${rem(16)} ${rem(80)} ${rem()} ${rem()}`,
						maxWidth: rem(800),
						margin: `${rem(40)} auto 0 auto`,
					},
				}) satisfies Styles<StepperStylesNames, StepperStylesParams>,
		},
	},
	other: themeCustomObj,
}

export type ThemeCustomObject = typeof themeCustomObj
