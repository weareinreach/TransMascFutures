import { Loader, Center, Title, Flex, Grid, Container, AspectRatio, Stack } from '@mantine/core'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '../components/Button/Button'
import { ModalForm } from '../components/ModalForm/ModalForm'
import { PreviewCard } from '../components/storyPreviewCard/PreviewCard'
import { CardDisplay } from '../layouts/CardDisplay'
import { api } from '../utils/api'

import type { DefaultImage } from '@prisma/client'
import type { NextPage } from 'next'

export const MainPage = ({ stories }: MainPageProps) => {
	const year = Number(new Date().getFullYear())
	const previewCards = stories.map((story, i) => {
		const { name, pronouns, birthYear, image, publicSlug, defaultImage } = story
		return (
			<Stack justify='space-between' align='stretch' sx={{ height: '100%' }} key={`${name}${i}`}>
				<Link
					href={`/story/${publicSlug || 'none'}`}
					style={{ textDecoration: 'none', marginBottom: 'auto' }}
				>
					<PreviewCard
						title={`${name}, ${pronouns}, ${year - birthYear}`}
						text={story.storyJoy}
						imgAlt={image ? `${name} image` : (defaultImage?.description as string)}
						imgSrc={image ? image : (defaultImage?.image as string)}
					/>
				</Link>
				<Center>
					<Link href={'/category/#'}>
						<Button>{'See CATEGORY Stories'}</Button>
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
