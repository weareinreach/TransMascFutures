import { Center, Container, createStyles, Grid, MediaQuery, rem } from '@mantine/core'
import { type ReactNode, useMemo } from 'react'

import { StoryPreviewCarousel } from '../components/storyPreviewCarousel/StoryPreviewCarousel'

type CardDisplayProps = {
	children: ReactNode[]
}

const hoverAlpha = 0.33

const useStyles = createStyles((theme) => ({
	gradientBorder: {
		borderRadius: rem(16),
		borderWidth: rem(5),
		borderImageSource:
			'linear-gradient(135deg, #5BCEFA 0%, #5BCEFA 20%, #F5A9B8 20%, #F5A9B8 40%, #FFFFFF 40%, #FFFFFF 60%, #F5A9B8 60%,#F5A9B8 80%, #5BCEFA 80%, #5BCEFA 100%)',
		borderStyle: 'solid',
		borderImageWidth: 'auto',
		borderImageSlice: 5,
		boxShadow: `${rem(2)} ${rem(4)} ${rem(16)} black`,
		...theme.fn.hover({
			background: `linear-gradient(210deg, rgba(91,206,250,${hoverAlpha}) 0%, rgba(245,169,184,${hoverAlpha}) 25%, rgba(255,255,255,${hoverAlpha}) 50%, rgba(245,169,184,${hoverAlpha}) 75%, rgba(91,206,250,${hoverAlpha}) 100%);`,
		}),
		[theme.fn.smallerThan('md')]: {
			margin: `${rem(20)} ${rem(0)}`,
		},
	},
	border1: {
		borderImageSource:
			'linear-gradient(45deg, #5BCEFA 0%, #5BCEFA 20%, #F5A9B8 20%, #F5A9B8 40%, #FFFFFF 40%, #FFFFFF 60%, #F5A9B8 60%,#F5A9B8 80%, #5BCEFA 80%, #5BCEFA 100%)',
	},
	border2: {
		borderImageSource:
			'linear-gradient(90deg, #5BCEFA 0%, #5BCEFA 20%, #F5A9B8 20%, #F5A9B8 40%, #FFFFFF 40%, #FFFFFF 60%, #F5A9B8 60%,#F5A9B8 80%, #5BCEFA 80%, #5BCEFA 100%)',
	},
	border3: {
		borderImageSource:
			'linear-gradient(135deg, #5BCEFA 0%, #5BCEFA 20%, #F5A9B8 20%, #F5A9B8 40%, #FFFFFF 40%, #FFFFFF 60%, #F5A9B8 60%,#F5A9B8 80%, #5BCEFA 80%, #5BCEFA 100%)',
	},
	hover: {},
}))

export const CardDisplay = ({ children }: CardDisplayProps) => {
	const { classes, cx } = useStyles()
	const getBorderColor = (i: number) => {
		switch (i) {
			case 0:
				return cx(classes.gradientBorder, classes.border1)
			case 1:
				return cx(classes.gradientBorder, classes.border2)
			case 2:
				return cx(classes.gradientBorder, classes.border3)
		}
	}
	const storyGrid = useMemo(() => {
		const queue = Array.from(children)
		const output: ReactNode[][] = []

		while (queue.length) {
			output.push(queue.splice(0, 3))
		}
		return output
	}, [children])

	const mobileBorders = useMemo(() => {
		const classNames: (string | undefined)[] = []

		while (classNames.length < children.length) {
			classNames.push(...[0, 1, 2].map((n) => getBorderColor(n)))
		}
		return classNames
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [children])

	if (!children.length || !storyGrid.length) return <>Loading...</>

	return (
		<Container fluid mb='sm'>
			<MediaQuery smallerThan='md' styles={{ display: 'none' }}>
				<div>
					<StoryPreviewCarousel>
						{storyGrid.map((grid, i) => (
							<Center key={i}>
								<Grid grow maw='80vw'>
									{grid.map((item, i2) => (
										<Grid.Col key={`${i}.${i2}`} span={3} mx={8} className={getBorderColor(i2)}>
											<Center className={classes.hover}>{item}</Center>
										</Grid.Col>
									))}
								</Grid>
							</Center>
						))}
					</StoryPreviewCarousel>
				</div>
			</MediaQuery>
			<MediaQuery largerThan='md' styles={{ display: 'none' }}>
				<Grid style={{ justifyContent: 'center', gap: rem(10) }}>
					{children.map((child, i) => (
						<Grid.Col
							sm={5}
							key={i}
							className={mobileBorders.at(i)}
							// style={{ marginLeft: rem(10), marginRight: rem(10) }}
							mx='auto'
						>
							{child}
						</Grid.Col>
					))}
				</Grid>
			</MediaQuery>
		</Container>
	)
}
