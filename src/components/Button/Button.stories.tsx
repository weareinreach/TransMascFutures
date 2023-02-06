import { Button } from './Button'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Button> = {
	title: 'Components/Button',
	component: Button,
	tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Button>

export const Default: Story = {
	args: {
		children: 'See Queer Stories',
		color: 'dark',
		variant: 'filled',
	},
}

export const Secondary: Story = {
	args: {
		children: 'CLICK HERE TO PARTICIPATE',
		color: 'gray',
		variant: 'filled',
	},
}
