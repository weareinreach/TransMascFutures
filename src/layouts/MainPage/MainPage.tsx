import { Grid, Container, Flex, AspectRatio } from '@mantine/core'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '../../components/Button/Button'
import { ModalForm } from '../../components/ModalForm/ModalForm'
import { PreviewCard } from '../../components/storyPreviewCard/PreviewCard'
import { CardDisplay } from '../CardDisplay'
import transMasc from '/public/assets/TRANSMASCFUTURES (800 × 300 px)(2).png'

export const MainPage = ({ stories }: MainPageProps) => {
	const year = Number(new Date().getFullYear())
	const previewCards = stories.map((story, i) => {
		const { name, pronouns, birthYear, image, publicSlug } = story
		return (
			<Container key={`${name}${i}`}>
				<Flex direction='column' align='center'>
					{/* Ask what should be used for the link to the story */}
					<Link href={`/story/`} style={{ textDecoration: 'none' }}>
						<PreviewCard
							title={`${name}, ${pronouns}, ${year - birthYear}`}
							text={story.storyJoy}
							imgAlt={image ? `${name} image` : 'Inreach x Glaad'}
							imgSrc={image || story.defaultImage}
						/>
					</Link>
					<Link style={{ marginTop: 'auto' }} href={'/category/#'}>
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
						<Image src={transMasc} alt='transmasc logo' width={800} height={300} />
					</AspectRatio>
				</Grid.Col>
				<Grid.Col lg={3} md={12}>
					<Flex justify='center'>
						<ModalForm />
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
	image: string | null
	defaultImage?: string
	publicSlug: string | null
}

type MainPageProps = {
	stories: story[]
}
