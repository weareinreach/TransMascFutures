import React from 'react'

import { Navbar } from './Navbar'

import type { StoryFn, Meta } from '@storybook/react'

export default {
	title: 'Navbar',
	component: Navbar,
	parameters: {
		layout: 'fullscreen',
	},
} as Meta<typeof Navbar>

const Template: StoryFn<typeof Navbar> = () => <Navbar />

export const Default = Template.bind({})

export const Mobile = Template.bind({})

Mobile.parameters = {
	viewport: {
		defaultViewport: 'iphonex',
	},
}
