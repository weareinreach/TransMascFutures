import React from 'react'

import { PreviewCard } from './PreviewCard'

import type { StoryFn, Meta } from '@storybook/react'

export default {
	title: 'Previewcard',
	component: PreviewCard,
	parameters: {
		layout: 'fullscreen',
	},

} as Meta<typeof PreviewCard>

const Template: StoryFn<typeof PreviewCard> = (args) => <PreviewCard title={args.title} text={args.text}/>


export const Default = Template.bind({})
Default.args = {
	title: "NAME, PRONOUNS, AGE",
	text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt sed illo nihil ipsum laudantium. Saepe nisi officia sit illum nostrum! Voluptas tenetur consectetur reprehenderit! Ea eaque voluptas architecto. Accusantium, recusandae?"
}

export const Mobile = Template.bind({})


Mobile.args = Default.args

Mobile.parameters = {
	viewport: {
		defaultViewport: 'iphonex',
	},
}
