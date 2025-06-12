import { type Meta } from '@storybook/react'

import { Navbar } from './Navbar'

export default {
	title: 'Components/Navbar',
	component: Navbar,
	parameters: {
		layout: 'fullscreen',
	},
	args: {
		path: '/',
	},
} as Meta<typeof Navbar>

export const Default = {
	render: (args: Record<string, unknown>) => <Navbar {...args} />,
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

export const Mobile = {
	render: (args: Record<string, unknown>) => <Navbar {...args} />,
	parameters: {
		viewport: {
			defaultViewport: 'iphonex',
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
