import React from 'react'

import { StoryPreviewCarousel } from './StoryPreviewCarousel'
import { PreviewCard } from '../storyPreviewCard/PreviewCard'

import type { StoryFn, Meta } from '@storybook/react'

export default {
	title: 'Story Preview Carousel',
	component: StoryPreviewCarousel,
	parameters: {
		layout: 'fullscreen',
	},

} as Meta<typeof StoryPreviewCarousel>

const Template: StoryFn<typeof StoryPreviewCarousel> = () => {
	const cardProps = {
		title: "NAME, PRONOUNS, AGE",
		text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt sed illo nihil ipsum laudantium. Saepe nisi officia sit illum nostrum! Voluptas tenetur consectetur reprehenderit! Ea eaque voluptas architecto. Accusantium, recusandae?"
	}

	const PreviewCards = []
	for(let i= 0; i < 9; i++){ PreviewCards.push(<PreviewCard title={`${cardProps.title} ${i+1}`} text={cardProps.text}/>)}

	return (
		<StoryPreviewCarousel>
			{PreviewCards}
		</StoryPreviewCarousel>)
}


export const Default = Template.bind({})
