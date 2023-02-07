import { Navbar } from './Navbar'

import type { Meta } from '@storybook/react'

export default {
	title: 'Components/Navbar',
	component: Navbar,
	parameters: {
		layout: 'fullscreen',
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
