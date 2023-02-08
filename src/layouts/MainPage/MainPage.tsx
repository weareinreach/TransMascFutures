import Image from 'next/image'
import Link from 'next/link'
import { Grid, Container, Flex, AspectRatio } from '@mantine/core'

import { PreviewCard } from '../../components/storyPreviewCard/PreviewCard'
import { Button } from '../../components/Button/Button'
import { CardDisplay } from '../CardDisplay'
import transMascLogo from '/public/assets/TRANSMASCFUTURES (800 × 300 px)(2).png'

export const MainPage = ({ stories }: MainPageProps) => {
	const year = Number(new Date().getFullYear())
	const previewCards = stories.map((story, i) => {
		const { name, pronouns, birthYear, image, publicSlug } = story

		return (
			<Container key={`${name}${i}`}>
				<Flex direction='column' align='center'>
					<Link href={`/story/${publicSlug}`} style={{ textDecoration: 'none' }}>
						<PreviewCard
							title={`${name}, ${pronouns}, ${year - birthYear}`}
							text={story.storyJoy}
							imgAlt={image ? `${name} image` : 'Inreach x Glaad'}
							imgSrc={image ? image : story.defaultImageId}
						/>
					</Link>
					<Link href={'/category/#'}>
						<Button>{'See CATEGORY Stories'}</Button>
					</Link>
				</Flex>
			</Container>
		)
	})

	return (
		<Container fluid>
			<Grid justify='center' align='center'>
				<Grid.Col p={0} lg={3} md={12}></Grid.Col>
				<Grid.Col lg={6} md={12}>
					<AspectRatio ratio={800 / 300}>
						<Image src={transMascLogo} alt='transmasc logo' width={800} height={300} />
					</AspectRatio>
				</Grid.Col>
				<Grid.Col lg={3} md={12}>
					<Flex justify='center'>
						<Button variant='secondary'>{'Click here to participate'}</Button>
					</Flex>
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
	publicSlug: string
}

type MainPageProps = {
	stories: story[]
}
