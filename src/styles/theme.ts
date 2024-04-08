import {
	Anchor,
	Button,
	Checkbox,
	createTheme,
	type CSSVariablesResolver,
	em,
	InputWrapper,
	Radio,
	rem,
	Stepper,
	Textarea,
	TextInput,
} from "@mantine/core";

const themeCustomObj = {
	colors: {
		glaadGray: "#BEBEBE",
		midGray: "#65676B",
		black: "#000000",
		white: "#FFFFFF",
		blue: "#5BCEFA",
		pink: "#F5A9B8",
	},
} as const;

export const cssCustomVars: CSSVariablesResolver = (theme) => ({
	variables: {
		"--mantine-color-custom-glaadgray": theme.other.colors.glaadGray,
		"--mantine-color-custom-midgray": theme.other.colors.midGray,
		"--mantine-color-custom-black": theme.other.colors.black,
		"--mantine-color-custom-white": theme.other.colors.white,
		"--mantine-color-custom-blue": theme.other.colors.blue,
		"--mantine-color-custom-pink": theme.other.colors.pink,
	},
	dark: {},
	light: {},
});

const hoverAlpha = 0.5;
export const appTheme = createTheme({
	fontFamily:
		"Work Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji",
	fontSizes: {
		xs: rem(12),
		sm: rem(14),
		md: rem(16),
		lg: rem(18),
		xl: rem(20),
	},
	headings: {
		fontFamily:
			"Work Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji",
		fontWeight: "500",
		sizes: {
			h1: { fontSize: rem(40), lineHeight: "1.25", fontWeight: undefined },
			h2: { fontSize: rem(24), lineHeight: "1.25", fontWeight: undefined },
			h3: { fontSize: rem(16), lineHeight: "1.25", fontWeight: "600" },
			h4: { fontSize: rem(16), lineHeight: "1.25", fontWeight: "600" },
			h5: { fontSize: rem(16), lineHeight: "1.25", fontWeight: "600" },
			h6: { fontSize: rem(16), lineHeight: "1.25", fontWeight: "600" },
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
		Anchor: Anchor.extend({
			styles: (theme) => ({
				root: {
					"&[data-variant='category']": {
						fontSize: rem(15),
						color: theme.other.colors.black,
						fontWeight: 500,
						textDecoration: "underline",
						"&@mixin hover": { textDecoration: "none" },
					},
				},
			}),
		}),
		Button: Button.extend({
			defaultProps: {
				variant: "primary",
			},
			styles: (theme) => ({
				root: {
					"&[data-variant='primary']": {
						borderRadius: rem(8),
						fontWeight: 600,
						height: "auto",
						padding: rem(15),
						textAlign: "center",
						width: rem(175),
						color: theme.other.colors.black,
						backgroundColor: theme.other.colors.pink,
						"&@mixin hover": {
							background: `linear-gradient(210deg, rgba(91,206,250,${hoverAlpha}) 0%, rgba(245,169,184,${hoverAlpha}) 25%, rgba(255,255,255,${hoverAlpha}) 50%, rgba(245,169,184,${hoverAlpha}) 75%, rgba(91,206,250,${hoverAlpha}) 100%);`,
						},
					},
					"&[data-variant='secondary']": {
						fontWeight: 600,
						height: "auto",
						padding: rem(15),
						textAlign: "center",
						width: rem(175),
						backgroundColor: theme.other.colors.blue,
						borderRadius: rem(8),
						"&@mixin hover": {
							background: `linear-gradient(210deg, rgba(91,206,250,${hoverAlpha}) 0%, rgba(245,169,184,${hoverAlpha}) 25%, rgba(255,255,255,${hoverAlpha}) 50%, rgba(245,169,184,${hoverAlpha}) 75%, rgba(91,206,250,${hoverAlpha}) 100%);`,
						},
					},
				},
				label: {
					"&[data-variant='primary']": {
						whiteSpace: "normal",
					},
					"&[data-variant='secondary']": {
						whiteSpace: "normal",
						textTransform: "uppercase",
					},
				},
			}),
		}),
		TextInput: TextInput.extend({
			styles: (theme) => ({
				input: {
					maxWidth: rem(300),
				},
			}),
		}),
		Textarea: Textarea.extend({
			styles: (theme) => ({
				input: {
					maxWidth: rem(450),
				},
			}),
		}),
		InputWrapper: InputWrapper.extend({
			styles: (theme) => ({
				label: { marginBottom: rem(4) },
			}),
		}),
		Checkbox: Checkbox.extend({
			styles: (themes) => ({
				body: {
					margin: `${rem(8)} 0`,
				},
			}),
		}),
		Radio: Radio.extend({
			styles: (themes) => ({
				body: {
					margin: `${rem(8)} 0`,
				},
			}),
		}),
		Stepper: Stepper.extend({
			styles: (theme) => ({
				content: {
					// padding: `${rem(16)} ${rem(80)} ${rem()} ${rem()}`,
					maxWidth: rem(800),
					margin: `${rem(40)} auto 0 auto`,
				},
			}),
		}),
	},
	other: themeCustomObj,
});

export type ThemeCustomObject = typeof themeCustomObj;
