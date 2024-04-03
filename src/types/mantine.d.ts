import { type ThemeCustomObject } from '~/styles'

declare module '@mantine/core' {
	// eslint-disable-next-line @typescript-eslint/no-empty-interface
	export interface MantineThemeOther extends ThemeCustomObject {}
}
