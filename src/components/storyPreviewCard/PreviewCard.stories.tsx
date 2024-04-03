import { type Meta } from '@storybook/react'

import { PreviewCard } from './PreviewCard'

export default {
	title: 'Components/Preview Card',
	component: PreviewCard,
	args: {
		title: 'NAME, PRONOUNS, AGE',
		text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt sed illo nihil ipsum laudantium. Saepe nisi officia sit illum nostrum! Voluptas tenetur consectetur reprehenderit! Ea eaque voluptas architecto. Accusantium, recusandae?',
		imgSrc: 'http://placekitten.com/g/480/355',
		imgAlt: 'Cat',
	},
} as Meta<typeof PreviewCard>

export const Default = {}

export const Mobile = {
	parameters: {
		viewport: {
			defaultViewport: 'iphonex',
		},
		layout: 'fullscreen',
	},
}
