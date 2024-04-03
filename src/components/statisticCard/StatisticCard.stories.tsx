import { Flex } from '@mantine/core'
import { type Meta } from '@storybook/react'

import { StatisticCard } from './StatisticCard'
import { type cardProps } from './StatisticCard'

export default {
	title: 'components/Statistic Cards',
	component: StatisticCard,
	parameters: {
		layout: 'centered',
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

export const Default = {
	args: {
		title: statistics[0]?.title,
		text: statistics[0]?.text,
	},

	render: ({ title, text }: cardProps) => <StatisticCard title={title} text={text} />,
}

export const AboutPage = {
	args: {
		cards: statistics,
	},
	parameters: {
		layout: 'fullscreen',
	},

	render: ({ cards }: storyArgs) => {
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
	},
}
type storyArgs = {
	cards: cardProps[]
}
