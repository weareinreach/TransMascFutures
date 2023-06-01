import { AspectRatio, Center, Container, Flex, Grid, Loader, Stack, Title } from '@mantine/core'
import { type DefaultImage, type Story, type StoryCategory, type StoryToCategory } from '@prisma/client'
import { type NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '../components/Button/Button'
import { ModalForm } from '../components/ModalForm/ModalForm'
import { PreviewCard } from '../components/storyPreviewCard/PreviewCard'
import { CardDisplay } from '../layouts/CardDisplay'
import { api } from '../utils/api'

export const MainPage = ({ stories }: MainPageProps) => {
	const year = Number(new Date().getFullYear())
	const previewCards = stories.map((story, i) => {
		const { name, pronouns, birthYear, image, publicSlug, defaultImage, categories } = story
		const category = categories?.at(0)?.category
		const categoryName = category ? category.categoryEN : 'more'
		return (
			<Stack justify='space-between' align='stretch' sx={{ height: '100%' }} key={`${name}${i}`}>
				<Link
					href={`/story/${publicSlug || 'none'}`}
					style={{ textDecoration: 'none', marginBottom: 'auto' }}
				>
					<PreviewCard
						title={`${name}, ${pronouns}, ${year - birthYear}`}
						text={story.response1EN}
						imgAlt={image ? `${name} image` : (defaultImage?.altEN as string)}
						imgSrc={image ? image : (defaultImage?.src as string)}
					/>
				</Link>
				<Center>
					<Link href={`/category/${categoryName}`}>
						<Button>{`See ${categoryName} Stories`}</Button>
					</Link>
				</Center>
			</Stack>
		)
	})

	return (
		<Container fluid>
			<Grid justify='center' align='center'>
				<Grid.Col p={0} lg={3} md={12}></Grid.Col>
				<Grid.Col lg={6} md={12}>
					<AspectRatio ratio={800 / 300}>
						<Image src='/assets/tmf-logo-rect-bw.png' alt='transmasc logo' width={800} height={300} />
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

export type story = Story & {
	defaultImage?: DefaultImage | null
	categories?: (StoryToCategory & { category?: StoryCategory })[]
}

export type MainPageProps = {
	stories: story[]
}

const Home: NextPage = () => {
	const { data, status } = api.story.recentNine.useQuery()
	if (data === undefined) {
		return (
			<Center style={{ width: '100%', height: '100%' }}>
				{status === 'error' ? (
					<Flex direction={'column'} align='center'>
						<Title order={1} ta='center'>
							{'Ooops something went wrong :('}
						</Title>
						<Title order={2} ta='center'>
							{'Try refreshing the page'}
						</Title>
					</Flex>
				) : (
					<Loader variant='bars' size='xl' />
				)}
			</Center>
		)
	} else {
		return <MainPage stories={data} />
	}
}

export default Home
