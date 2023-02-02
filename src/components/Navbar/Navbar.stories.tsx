import { fireEvent, userEvent, within } from '@storybook/testing-library'
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

const Template: StoryFn<typeof Navbar> = (args) => <Navbar />

export const Default = Template.bind({})

export const Mobile = Template.bind({})

Mobile.parameters = {
	viewport: {
		defaultViewport: 'iphonex',
	},
}

// Mobile.play =  async ({ canvasElement }) => {
// 	const canvas = within(canvasElement);

// };
