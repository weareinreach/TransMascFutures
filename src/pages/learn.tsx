import { Text, Box, Container, Center, List, ScrollArea, createStyles, useMantineTheme } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'

import { Banner } from '../components/Banner/Banner'
import { glossary } from '../data/glossary'

import type { NextPage } from 'next'

const useStyles = createStyles((theme) => ({
	glossaryText: {
		fontSize: theme.fontSizes.md,
		[theme.fn.largerThan('sm')]: {
			fontSize: theme.fontSizes.xl,
		},
	},
}))

export const Learn: NextPage = () => {
	const { classes } = useStyles()
	const theme = useMantineTheme()
	const mediaQuery = useMediaQuery(`(min-width: ${theme.breakpoints.sm}px)`)

	if (glossary) {
		const listItems = glossary.map(({ term, definition }) => (
			<List.Item key={term} mb='lg'>
				<Text className={classes.glossaryText}>
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
					<List
						style={{
							listStyleType: 'none',
							paddingLeft: mediaQuery ? undefined : theme.spacing.xs,
							paddingRight: mediaQuery ? undefined : theme.spacing.xs,
						}}
					>
						{listItems}
					</List>
				</ScrollArea>
			</Container>
		)
	}
	return <></>
}

export default Learn
