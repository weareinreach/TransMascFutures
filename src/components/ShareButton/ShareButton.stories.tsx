import { type Meta } from '@storybook/react'

import { ShareButton } from './ShareButton'

export default {
	title: 'Components/ShareButton',
	component: ShareButton,
	parameters: {
		layout: 'center',
	},
	args: {
		path: '/',
	},
} as Meta<typeof ShareButton>

export const Default = {
	parameters: {
		viewport: {
			defaultViewport: 'responsive',
		},
	},
}
