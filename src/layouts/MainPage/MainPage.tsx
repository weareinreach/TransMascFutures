import { Grid, Container, Flex, AspectRatio } from '@mantine/core'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '../../components/Button/Button'
import { ModalForm } from '../../components/ModalForm/ModalForm'
import { PreviewCard } from '../../components/storyPreviewCard/PreviewCard'
import { CardDisplay } from '../CardDisplay'

import type { DefaultImage } from '@prisma/client'

export const MainPage = ({ stories }: MainPageProps) => {
	const year = Number(new Date().getFullYear())
	const previewCards = stories.map((story, i) => {
		const { name, pronouns, birthYear, image, publicSlug, defaultImage } = story
		return (
			<Container key={`${name}${i}`}>
				<Flex direction='column' align='center'>
					<Link href={`/story/${publicSlug || 'none'}`} style={{ textDecoration: 'none' }}>
						<PreviewCard
							title={`${name}, ${pronouns}, ${year - birthYear}`}
							text={story.storyJoy}
							imgAlt={image ? `${name} image` : (defaultImage?.description as string)}
							imgSrc={image ? image : (defaultImage?.image as string)}
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
						<Image
							src='/assets/TRANSMASCFUTURES (800 × 300 px)(2).png'
							alt='transmasc logo'
							width={800}
							height={300}
						/>
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
	publicSlug: string | null
	defaultImage: DefaultImage | null
}

export type MainPageProps = {
	stories: story[]
}
