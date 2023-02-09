import { Flex } from '@mantine/core'

import { StatisticCard } from './StatisticCard'

import type { cardProps } from './StatisticCard'
import type { Meta } from '@storybook/react'

export default {
	title: 'components/Statistic Cards',
	component: StatisticCard,
	parameters: {
		layout: 'fullscreen',
	},
	tags: ['autodocs'],
} as Meta<typeof StatisticCard>

const statistics = [
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

export const Default = ({ title, text }: cardProps) => <StatisticCard title={title} text={text} />
Default.args = {
	title: statistics[0]?.title,
	text: statistics[0]?.text,
}

export const AboutPage = ({ cards }: storyArgs) => {
	const children = cards.map(({ title, text }) => <StatisticCard key={title} title={title} text={text} />)
	return (
		<Flex
			direction={{ base: 'column', md: 'row' }}
			justify={{ md: 'center' }}
			align={{ base: 'center', md: 'start' }}
		>
			{children}
		</Flex>
	)
}
AboutPage.args = {
	cards: statistics,
}

type storyArgs = {
	cards: cardProps[]
}
