import { type Meta, type StoryObj } from '@storybook/react'

import { IndividualStory } from './IndividualStory'

const meta: Meta<typeof IndividualStory> = {
	title: 'Layouts/Individual Story',
	component: IndividualStory,
	tags: ['autodocs'],
	args: {
		age: 18,
		image: 'https://i.ibb.co/r4RLjcM/Screen-Shot-2023-02-13-at-10-04-32-PM.png',
		name: 'Name',
		pronouns: 'Pronouns',
		quotes: [
			{
				label: 'Joy',
				text: "When I first came out, I was told I couldn't feel that way about myself because of my disability - but now, after I found my place around people who care about me, being trans is something I wouldn't trade for anything.",
			},
			{
				label: 'Access',
				text: 'When I was able to access HRT, my life changed for the better and I was immediately happier in my own skin.',
			},
		],
	},
}

export default meta
type Story = StoryObj<typeof IndividualStory>

export const Default: Story = {}

export const Mobile: Story = {
	parameters: {
		viewport: {
			defaultViewport: 'iphonex',
		},
	},
}
