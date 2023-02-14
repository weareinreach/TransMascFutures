import { Text, Box, Container, Center, List, ScrollArea } from '@mantine/core'

import { Banner } from '../components/Banner/Banner'
import { glossary } from '../data/glossary'

import type { NextPage } from 'next'

export const Learn: NextPage = () => {
	if (glossary) {
		const listItems = glossary.map(({ term, definition }) => (
			<List.Item key={term} mb='lg' mx='xl'>
				<Text fz='xl'>
					<p>
						<strong>{term + ': '}</strong>
						{definition}
					</p>
				</Text>
			</List.Item>
		))

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
				</Center>
				<ScrollArea style={{ width: '100%', height: 400 }}>
					<List px={'xl'} style={{ listStyleType: 'none' }}>
						{listItems}
					</List>
				</ScrollArea>
			</Container>
		)
	}
	return <></>
}

export default Learn
