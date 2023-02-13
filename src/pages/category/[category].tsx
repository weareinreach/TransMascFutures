import { Center, Loader, Text, Title, Grid, Container, AspectRatio, MediaQuery } from '@mantine/core'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { z } from 'zod'

import { Button } from '../../components/Button/Button'
import { ModalForm } from '../../components/ModalForm/ModalForm'
import { PreviewCard } from '../../components/storyPreviewCard/PreviewCard'
import { CardDisplay } from '../../layouts/CardDisplay'
import { api } from '../../utils/api'

import type { story } from '../index'
import type { NextPage } from 'next'

export const CategoryPage = ({ stories, category }: CategoryPageProps) => {
	const year = Number(new Date().getFullYear())
	const previewCards = stories.map((story, i) => {
		const { name, pronouns, birthYear, image, publicSlug, defaultImage } = story
		return (
			<Container key={`${name}${i}`}>
				<Link href={`/story/${publicSlug || 'none'}`} style={{ textDecoration: 'none' }}>
					<PreviewCard
						title={`${name}, ${pronouns}, ${year - birthYear}`}
						text={story.storyJoy}
						imgAlt={image ? `${name} image` : (defaultImage?.description as string)}
						imgSrc={image ? image : (defaultImage?.image as string)}
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
						<Image src='/assets/tmf-logo-rect-bw.png' alt='transmasc logo' width={800} height={300} />
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
				<MediaQuery query='(max-width: 1000px)' styles={{ display: 'none' }}>
					<Link href='/'>
						<Button>{'Back to Home'}</Button>{' '}
					</Link>
				</MediaQuery>
			</Container>
		</Container>
	)
}

type CategoryPageProps = {
	stories: story[]
	category: string
}

const categories = z.enum(['queer', 'bipoc', 'disabled'])
type categories = z.infer<typeof categories>

const Category: NextPage = () => {
	const router = useRouter()
	const query = router.query['category']
	const { data, isError, isLoading } = api.story.recentNine.useQuery({ category: query as categories })

	if (isLoading) {
		return (
			<Center style={{ height: '80vh' }}>
				<Loader size='xl' variant='bars' />
			</Center>
		)
	} else if (isError) {
		// Consult Joe about how to handle users trying to go
		// to non-existant categories
		return <Text ta='center'>Something is wrong...</Text>
	}

	return (
		<>
			<CategoryPage stories={data as story[]} category={query as string} />
		</>
	)
}

export default Category
