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

export const Default = {}

export const Mobile = {
	parameters: {
		viewport: {
			defaultViewport: 'iphonex',
		},
	},
}
