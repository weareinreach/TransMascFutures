import { Flex, rem, useMantineTheme } from '@mantine/core'
import { type Meta } from '@storybook/react'

import { LangPicker } from './LangPicker'

export default {
	title: 'Components/LangPicker',
	component: LangPicker,
	parameters: {
		layout: 'fullscreen',
	},
} as Meta<typeof LangPicker>

const DesktopLangPickerWrapper = (args: Record<string, unknown>) => {
	const theme = useMantineTheme()
	return (
		<Flex
			justify='flex-end'
			align='center'
			h={rem(80)}
			sx={{
				backgroundColor: theme.other.colors.softBlack, // eslint-disable-line @typescript-eslint/no-unsafe-member-access
				width: '100%',
				paddingRight: rem(64),
			}}
		>
			<LangPicker {...args} />
		</Flex>
	)
}

export const Default = {
	render: (args: Record<string, unknown>) => <DesktopLangPickerWrapper {...args} />,
	parameters: {
		viewport: {
			defaultViewport: 'responsive',
		},
		nextjs: {
			router: {
				locale: 'en',
				locales: ['en', 'es', 'fr'],
				pathname: '/',
				asPath: '/',
				query: {},
				basePath: '',
			},
		},
	},
}
