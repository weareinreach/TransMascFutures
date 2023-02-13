import { Container } from '@mantine/core'

import { Learn, Glossary } from './learn'

import type { glossaryElement } from './learn'
import type { Meta } from '@storybook/react'

const filling: glossaryElement[] = []
for (let i = 0; i < 5; i++) {
	filling.push({ title: 'ETC:', definition: '...' })
}

export default {
	title: 'Pages/Learn',
	component: Learn,
	parameters: {
		layout: 'fullscreen',
	},
	render: () => {
		const glossary = [
			{
				title: 'Alphabetical order glossary of terms: ',
				definition: 'With definitions provided by queer resources and organizations',
			},
			{
				title: 'Include any submitted identifiers by participants: ',
				definition:
					'Even if a label is less known or more obscure, each individual that contributes should have their gender identity recognized if accurate definitions are possible to obtain',
			},
		].concat(filling)

		return (
			<>
				<Learn />
				<Container fluid>
					<Glossary glossary={glossary} />
				</Container>
			</>
		)
	},
} as Meta<typeof Learn>

export const Default = {}
