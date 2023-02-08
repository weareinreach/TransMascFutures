import Image from 'next/image'
import { Grid, Container, createStyles } from '@mantine/core'

import { PreviewCard } from '../../components/storyPreviewCard/PreviewCard'
import { Button } from '../../components/Button/Button'
import { CardDisplay } from '../CardDisplay'
import transMascLogo from '/public/assets/TRANSMASCFUTURES (800 × 300 px)(2).png'

const useStyles = createStyles((theme) => ({
	center: {
		display: 'flex',
		justifyContent: 'center',
	},
	logo: {
		maxHeight: '200px !important',
	},
	grid: {
		maxWidth: '550px !important',
		[`@media (min-width: ${theme.breakpoints.md}px)`]: {
			height: 200,
		},
	},
}))

export const MainPage = ({ stories }: MainPageProps) => {
	const year = Number(new Date().getFullYear())
	const previewCards = stories.map((story, i) => {
		const { name, pronouns, birthYear, image } = story

		return (
			<PreviewCard
				key={`${name}${i}`}
				title={`${name}, ${pronouns}, ${year - birthYear}`}
				text={story.storyJoy}
				imgAlt={image ? `${name} image` : 'Inreach x Glaad'}
				imgSrc={image ? image : story.defaultImageId}
			/>
		)
	})

	const { classes, cx } = useStyles()

	return (
		<Container fluid>
			<Grid align='center' justify={'center'}>
				<Grid.Col lg={3} md={2} p={0}></Grid.Col>
				<Grid.Col lg={6} md={8} className={cx(classes.center, classes.grid)}>
					<Image src={transMascLogo} alt='transmasc logo' className={classes.logo} />
				</Grid.Col>
				<Grid.Col lg={3} md={2} className={classes.center}>
					<Button variant='secondary'>{'Click here to participate'}</Button>
				</Grid.Col>
			</Grid>
			<CardDisplay>{previewCards}</CardDisplay>
		</Container>
	)
}

export type story = {
	name: string
	pronouns: string
	birthYear: number
	storyJoy: string
	image?: string
	defaultImageId: string
}

type MainPageProps = {
	stories: story[]
}
