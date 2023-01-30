import { ExampleButton } from './ExampleButton'

import type { Meta, StoryObj } from '@storybook/react'

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta: Meta<typeof ExampleButton> = {
	title: 'Example/Button',
	component: ExampleButton,
	tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ExampleButton>

// More on writing stories with args: https://storybook.js.org/docs/7.0/react/writing-stories/args
export const Primary: Story = {
	args: {
		children: 'Button',
	},
}

export const Secondary: Story = {
	args: {
		children: 'Button',
		variant: 'light',
	},
}

export const Large: Story = {
	args: {
		size: 'lg',
		children: 'Button',
	},
}

export const Small: Story = {
	args: {
		size: 'sm',
		children: 'Button',
	},
}
