import {
	Anchor,
	AspectRatio,
	Button,
	Center,
	Container,
	createStyles,
	Flex,
	Grid,
	Group,
	Loader,
	rem,
	Stack,
	Title,
} from '@mantine/core'
import { type GetStaticProps, type NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Trans, useTranslation } from 'react-i18next'

import { categoryImages, isValidCategoryImage } from '~/data/categoryImages'
import { getServerSideTranslations } from '~/server/i18n'
import { api as trpcServerClient } from '~/trpc/server'
import Logo from '~public/assets/tmf-logo-rect-bw.png'

import { api, type RouterOutputs } from '../trpc/react'

const useStyles = createStyles((theme) => {
	return {
		cardGroup: {
			[theme.fn.smallerThan(rem(850))]: {
				flexDirection: 'column',
				margin: '0 auto',
			},
		},
		categoryImage: {
			filter: `drop-shadow(${rem(-2)} ${rem(8)} ${rem(8)} ${theme.other.colors.midGray})`,
			...theme.fn.hover({
				filter: `drop-shadow(${rem(-2)} ${rem(8)} ${rem(8)} ${theme.fn.lighten(theme.other.colors.blue, 0)})`,
			}),
		},
		header: {
			justifyContent: 'center',
		},
	}
})

export const MainPage = ({ categories }: MainPageProps) => {
	const { classes } = useStyles()
	const { t } = useTranslation()
	const previewCards = categories.map(({ category, id, image, imageAlt, tag }) => {
		// aspect ratio 0.55

		const imageSrc = isValidCategoryImage(image)
			? categoryImages[image]
			: `https://placehold.co/300x${Math.round(300 * 0.55)}`
		const altText = imageAlt ?? ''
		const categoryName = category
		return (
			<Stack justify='space-between' align='center' w={250} key={id} mx='auto'>
				<Anchor
					variant='category'
					component={Link}
					href={{ pathname: '/category/[tag]/[[...storyId]]', query: { tag } }}
					style={{ textDecoration: 'none', marginBottom: 'auto' }}
				>
					<Image
						src={imageSrc}
						alt={altText}
						height={300}
						width={Math.round(300 * 0.6923)}
						className={classes.categoryImage}
					/>
				</Anchor>
				<Center>
					<Anchor
						variant='category'
						component={Link}
						href={{ pathname: '/category/[tag]/[[...storyId]]', query: { tag } }}
						style={{ textAlign: 'center' }}
					>
						<Trans i18nKey='see-x-stories' values={{ category: categoryName }} shouldUnescape={true} />
					</Anchor>
				</Center>
			</Stack>
		)
	})

	return (
		<Container fluid>
			<Group w='100%' spacing={0} className={classes.header} align='center'>
				<Stack spacing={0} mt={20} mb={{ base: 20, md: 40 }} mx={{ base: 'auto', md: 0 }}>
					<AspectRatio ratio={723 / 174} mx='auto' maw={750} w='75%'>
						<Image src={Logo} alt={t('logo-alt')} fill />
					</AspectRatio>
					<Title order={3} ta='center' py={0} fw={500} lts={2} fs='oblique'>
						{t('main-page.tagline1')}
					</Title>
					<Title order={3} ta='center' pb={0} pt={8} fw={500} lts={2} fs='oblique'>
						{t('main-page.tagline2')}
					</Title>
				</Stack>
				<Stack mx={80} mb={20}>
					<Button component={Link} href={{ pathname: '/survey' }} tt='uppercase' variant='secondary'>
						{t('participate')}
					</Button>
				</Stack>
			</Group>

			<Grid grow mx='auto'>
				{previewCards.map((card, i) => (
					<Grid.Col key={i} lg={3} md={4} xs={6} mx='auto'>
						{card}
					</Grid.Col>
				))}
			</Grid>
		</Container>
	)
}

export type MainPageProps = {
	categories: RouterOutputs['story']['getCategories']
}

const Home: NextPage = () => {
	const router = useRouter()
	const { data, status } = api.story.getCategories.useQuery({ locale: router.locale })
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
		return <MainPage categories={data} />
	}
}

export default Home

export const getStaticProps: GetStaticProps = async ({ locale: ssrLocale }) => {
	const locale = (['en', 'es'].includes(ssrLocale ?? '') ? ssrLocale : 'en') as 'en' | 'es'
	const ssg = trpcServerClient

	const [i18n] = await Promise.allSettled([
		getServerSideTranslations(locale),
		ssg.story.getCategories.prefetch({ locale }),
	])

	return {
		props: {
			trpcState: ssg.dehydrate(),
			...(i18n.status === 'fulfilled' ? i18n.value : {}),
		},
		revalidate: 60 * 60 * 24 * 7, // 1 week
	}
}
