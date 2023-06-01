import { type Meta } from '@storybook/react'

import { Act } from '../pages/act'

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
