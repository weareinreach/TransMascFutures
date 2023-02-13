import { Act } from './act'

import type { Meta } from '@storybook/react'

export default {
	title: 'Pages/Act',
	component: Act,
	parameters: {
		layout: 'fullscreen',
	},
} as Meta<typeof Act>

export const Default = {}

export const Mobile = {
	parameters: {
		viewport: {
			defaultViewport: 'iphonex',
		},
	},
}
