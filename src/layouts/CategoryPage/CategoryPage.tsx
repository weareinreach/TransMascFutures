import { Title, Grid, Container, AspectRatio } from '@mantine/core'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '../../components/Button/Button'
import { ModalForm } from '../../components/ModalForm/ModalForm'
import { PreviewCard } from '../../components/storyPreviewCard/PreviewCard'
import { CardDisplay } from '../CardDisplay'

import type { story } from '../MainPage/MainPage'

export const CategoryPage = ({ stories, category }: CategoryPageProps) => {
	const year = Number(new Date().getFullYear())
	const previewCards = stories.map((story, i) => {
		const { name, pronouns, birthYear, image, publicSlug } = story
		return (
			<Container key={`${name}${i}`}>
				<Link href={`/story/${publicSlug}`} style={{ textDecoration: 'none' }}>
					<PreviewCard
						title={`${name}, ${pronouns}, ${year - birthYear}`}
						text={story.storyJoy}
						imgAlt={image ? `${name} image` : 'Inreach x Glaad'}
						imgSrc={image ? image : story.defaultImageId}
					/>
				</Link>
			</Container>
		)
	})

	return (
		<Container fluid>
			<Grid align='center' my='md'>
				<Grid.Col lg={5} md={6}>
					<AspectRatio ratio={800 / 300}>
						<Image
							src='/public/assets/TRANSMASCFUTURES (800 × 300 px)(2).png'
							alt='transmasc logo'
							width={800}
							height={300}
						/>
					</AspectRatio>
				</Grid.Col>
				<Grid.Col lg={4} md={6}>
					{/*
						Using sx instead of size prop because the latter
						gets overwritten by the base style for h1 because of css
						specificity
					*/}
					<Title fw={100} sx={{ fontSize: `30px !important` }} align='center' tt='uppercase'>
						{`Transmasc + ${category} + Proud`}
					</Title>
				</Grid.Col>
				<Grid.Col lg={3} md={12}>
					<ModalForm />
				</Grid.Col>
			</Grid>
			<CardDisplay>{previewCards}</CardDisplay>
			<Container ml='xl' mb='xl' display='fixed'>
				<Link href='/'>
					<Button>{'Back to Home'}</Button>{' '}
				</Link>
			</Container>
		</Container>
	)
}

type CategoryPageProps = {
	stories: story[]
	category: string
}
