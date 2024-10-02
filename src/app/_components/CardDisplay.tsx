import { Center, Container, Grid, GridCol, rem, Group } from '@mantine/core'
import { type ReactNode, Children } from 'react'

import { StoryPreviewCarousel } from '~/app/_components/StoryPreviewCarousel'
import classes from './CardDisplay.module.css'

type CardDisplayProps = {
	children: ReactNode[]
}

export const CardDisplay = ({ children }: CardDisplayProps) => {
	const generateStoryGrid = () => {
		const queue = Children.toArray(children)
		const output: ReactNode[][] = []

		while (queue.length) {
			output.push(queue.splice(0, 3))
		}
		return output
	}

	const getMobileBorderVariant = (i: number) => {
		if (i % 3 === 0) {
			return '2'
		}
		if (i % 2 === 0) {
			return '1'
		}
		return '0'
	}
	const storyGrid = generateStoryGrid()

	if (!children.length || !storyGrid.length) return <>Loading...</>

	return (
		<Container fluid mb='sm'>
			<Group visibleFrom='md'>
				<StoryPreviewCarousel>
					{storyGrid.map((grid, i) => (
						<Center key={i}>
							<Grid grow maw='80vw'>
								{grid.map((item, i2) => (
									<GridCol
										key={`${i}.${i2}`}
										span={3}
										mx={8}
										className={classes.gradientBorder}
										mod={{ bordervar: i2 }}
									>
										<Center className={classes.hover}>{item}</Center>
									</GridCol>
								))}
							</Grid>
						</Center>
					))}
				</StoryPreviewCarousel>
			</Group>
			<Grid hiddenFrom='md' style={{ justifyContent: 'center', gap: rem(10) }}>
				{children.map((child, i) => (
					<GridCol
						span={{ sm: 5 }}
						key={i}
						className={classes.gradientBorder}
						mod={{ bordervar: getMobileBorderVariant(i) }}
						mx='auto'
					>
						{child}
					</GridCol>
				))}
			</Grid>
		</Container>
	)
}
