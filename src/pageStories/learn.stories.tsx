import { type Meta } from '@storybook/react'

import { Learn } from '../pages/learn'

export default {
	title: 'Pages/Learn',
	component: Learn,
	parameters: {
		layout: 'fullscreen',
	},
} as Meta<typeof Learn>

export const Desktop = {}

export const Mobile = {
	parameters: {
		viewport: {
			defaultViewport: 'iphonex',
		},
	},
}
