import { Anchor, Center, Container, createStyles, Flex, Grid, Loader, rem, Stack, Title } from '@mantine/core'
import { type GetStaticProps, type NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Trans } from 'next-i18next'

import { categoryImages, isValidCategoryImage } from '~/data/categoryImages'
import { getServerSideTranslations } from '~/server/i18n'
import { trpcServerClient } from '~/utils/ssr'

// import { Button } from '../components/Button/Button'
import { ModalForm } from '../components/ModalForm/ModalForm'
// import { PreviewCard } from '../components/storyPreviewCard/PreviewCard'
// import { CardDisplay } from '../layouts/CardDisplay'
import { api, type RouterOutputs } from '../utils/api'

const useStyles = createStyles((theme) => {
	console.log(theme.shadows.lg)
	return {
		categoryCard: {},
		categoryImage: {
			filter: `drop-shadow(${rem(-2)} ${rem(8)} ${rem(8)} ${theme.other.colors.midGray})`,
			...theme.fn.hover({
				filter: `drop-shadow(${rem(-2)} ${rem(8)} ${rem(8)} ${theme.fn.lighten(theme.other.colors.blue, 0)})`,
			}),
		},
	}
})

export const MainPage = ({ categories }: MainPageProps) => {
	const router = useRouter()
	const { classes } = useStyles()
	const previewCards = categories.map(
		({ categoryEN, categoryES, id, image, imageAltEN, imageAltES, tag }, i) => {
			// aspect ratio 0.55

			const imageSrc = isValidCategoryImage(image)
				? categoryImages[image]
				: `https://placehold.co/300x${Math.round(300 * 0.55)}`
			const altText = router.locale === 'es' ? (imageAltES ? imageAltES : '') : imageAltEN ? imageAltEN : ''
			const categoryName = router.locale === 'es' ? categoryES : categoryEN
			return (
				<Stack justify='space-between' align='center' w={250} key={id} className={classes.categoryCard}>
					<Anchor
						variant='category'
						component={Link}
						href={{ pathname: '/category/[tag]', query: { tag } }}
						style={{ textDecoration: 'none', marginBottom: 'auto' }}
					>
						<Image
							src={imageSrc}
							alt={altText}
							height={300}
							width={Math.round(300 * 0.55)}
							className={classes.categoryImage}
						/>
					</Anchor>
					<Center>
						<Anchor
							variant='category'
							component={Link}
							href={{ pathname: '/category/[tag]', query: { tag } }}
						>
							<Trans i18nKey='see-x-stories' values={{ category: categoryName }} shouldUnescape={true} />
						</Anchor>
					</Center>
				</Stack>
			)
		}
	)
	const row1 = previewCards.splice(0, 4)
	const row2 = previewCards

	return (
		<Container fluid>
			<Grid justify='center' align='center'>
				<Grid.Col p={0} lg={3} md={12}></Grid.Col>
				<Grid.Col lg={6} md={12}>
					<Center>
						<Image src='/assets/tmf-logo-rect-bw.png' alt='transmasc logo' width={400} height={150} />
					</Center>
				</Grid.Col>
				<Grid.Col lg={3} md={12}>
					<Flex justify='center'>
						<ModalForm />
					</Flex>
				</Grid.Col>
			</Grid>
			<Flex justify='space-between' w='100%'>
				{row1}
			</Flex>
			<Flex justify='space-evenly' w='100%'>
				{row2}
			</Flex>
		</Container>
	)
}

export type MainPageProps = {
	categories: RouterOutputs['story']['getCategories']
}

const Home: NextPage = () => {
	const { data, status } = api.story.getCategories.useQuery()
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

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	const ssg = await trpcServerClient({ session: null })

	const [i18n] = await Promise.allSettled([
		getServerSideTranslations(locale),
		ssg.story.getCategories.prefetch(),
	])

	return {
		props: {
			trpcState: ssg.dehydrate(),
			...(i18n.status === 'fulfilled' ? i18n.value : {}),
		},
		revalidate: 60 * 60 * 60 * 24, // 24 hours
	}
}
