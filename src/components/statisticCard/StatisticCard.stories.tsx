import { Flex } from '@mantine/core'
import React from 'react'

import { StatisticCard } from './StatisticCard'

import type { StoryFn, Meta } from '@storybook/react'

export default {
	title: 'Statistic Cards',
	component: StatisticCard,
	parameters: {
		layout: 'fullscreen',
	},
} as Meta<typeof StatisticCard>

const Template: StoryFn<typeof StatisticCard> = () => {
	const cardsInfo = [
		{
			title: '59%',
			text: 'Of trans men and masculine youth have considered suicide.',
		},
		{
			title: '1 in 5',
			text: 'Transgender and nonbinary youth have attempted suicide',
		},
		{
			title: '36%',
			text: 'Of the U.S. trans population identify as trans men.',
		},
	]

	const cards = cardsInfo.map((card) => <StatisticCard key={card.text} title={card.title} text={card.text} />)

	return (
		<Flex
			direction={{ base: 'column', md: 'row' }}
			justify={{ md: 'center' }}
			align={{ base: 'center', md: 'start' }}
		>
			{cards}
		</Flex>
	)
}

export const Default = Template.bind({})
