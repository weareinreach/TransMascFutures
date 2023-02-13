import { Text, Box, Container, Center, List, ScrollArea } from '@mantine/core'

import { Banner } from '../components/Banner/Banner'

import type { NextPage } from 'next'

export type glossaryElement = { title: string; definition: string }

type glossaryProps = {
	glossary?: glossaryElement[]
}

export const Glossary = ({ glossary }: glossaryProps) => {
	if (glossary) {
		const listItems = glossary.map(({ title, definition }) => (
			<List.Item key={title} mb='lg' mx='xl'>
				<Text fz='xl'>
					<p>
						<strong>{title}</strong>
						{definition}
					</p>
				</Text>
			</List.Item>
		))

		return (
			<ScrollArea style={{ width: '100%', height: 400 }}>
				<List px={'xl'} style={{ listStyleType: 'none' }}>
					{listItems}
				</List>
			</ScrollArea>
		)
	}
	return <></>
}

export const Learn: NextPage = () => {
	return (
		<Container fluid>
			<Banner title='Learn' />
			<Center style={{ width: '100%' }}>
				<Box
					sx={(theme) => ({
						width: '80%',
						height: '10px',
						backgroundColor: theme.other.colors.glaadGray,
					})}
				></Box>
				<Glossary />
			</Center>
		</Container>
	)
}

export default Learn
