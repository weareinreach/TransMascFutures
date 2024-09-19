import {
	createTheme,
	type CSSVariablesResolver,
	rem,
	em,
	Anchor,
	Button,
	TextInput,
	InputWrapper,
	Checkbox,
	Radio,
	Stepper,
} from '@mantine/core'

import { Work_Sans } from 'next/font/google'

import AnchorStyles from './variants/Anchor.module.css'
import ButtonStyles from './variants/Button.module.css'
import TextInputStyles from './variants/TextInput.module.css'
import InputWrapperStyles from './variants/InputWrapper.module.css'
import CheckboxStyles from './variants/Checkbox.module.css'
import RadioStyles from './variants/Radio.module.css'
import StepperStyles from './variants/Stepper.module.css'

const fontWorkSans = Work_Sans({
	subsets: ['latin'],
	weight: ['400', '500', '600'],
	display: 'swap',
	fallback: [
		'-apple-system',
		'BlinkMacSystemFont',
		'Segoe UI',
		'Roboto',
		'Helvetica',
		'Arial',
		'sans-serif',
		'Apple Color Emoji',
		'Segoe UI Emoji',
	],
})

export const mantineTheme = createTheme({
	fontFamily: fontWorkSans.style.fontFamily,
	// 'Work Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji',
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
		fontWeight: '500',
		sizes: {
			h1: { fontSize: rem(40), lineHeight: '1.25', fontWeight: undefined },
			h2: { fontSize: rem(24), lineHeight: '1.25', fontWeight: undefined },
			h3: { fontSize: rem(16), lineHeight: '1.25', fontWeight: '600' },
			h4: { fontSize: rem(16), lineHeight: '1.25', fontWeight: '600' },
			h5: { fontSize: rem(16), lineHeight: '1.25', fontWeight: '600' },
			h6: { fontSize: rem(16), lineHeight: '1.25', fontWeight: '600' },
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
		Anchor: Anchor.extend({ classNames: AnchorStyles }),
		Button: Button.extend({
			defaultProps: { variant: 'primary' },
			classNames: ButtonStyles,
		}),
		TextInput: TextInput.extend({
			classNames: TextInputStyles,
		}),
		InputWrapper: InputWrapper.extend({
			classNames: InputWrapperStyles,
		}),
		Checkbox: Checkbox.extend({ classNames: CheckboxStyles }),
		Radio: Radio.extend({ classNames: RadioStyles }),
		Stepper: Stepper.extend({ classNames: StepperStyles }),
	},
	other: {
		colors: {
			glaadGray: '#BEBEBE',
			midGray: '#65676B',
			black: '#000000',
			white: '#FFFFFF',
			blue: '#5BCEFA',
			pink: '#F5A9B8',
		},
	},
})

export const cssResolver: CSSVariablesResolver = (theme) => ({
	variables: {
		'--mantine-color-glaad-gray': theme.other.colors.glaadGray,
		'--mantine-color-mid-gray': theme.other.colors.midGray,
		'--mantine-color-black': theme.other.colors.black,
		'--mantine-color-white': theme.other.colors.white,
		'--mantine-color-blue': theme.other.colors.blue,
		'--mantine-color-pink': theme.other.colors.pink,
	},
	dark: {},
	light: {},
})
declare module '@mantine/core' {
	export interface MantineThemeOther {
		colors: {
			glaadGray: '#BEBEBE'
			midGray: '#65676B'
			black: '#000000'
			white: '#FFFFFF'
			blue: '#5BCEFA'
			pink: '#F5A9B8'
		}
	}
}
