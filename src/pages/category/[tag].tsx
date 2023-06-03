import { AspectRatio, Center, Container, Grid, Loader, MediaQuery, Text, Title } from '@mantine/core'
import { type GetStaticPaths, type GetStaticProps, type NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { type RoutedQuery } from 'nextjs-routes'

import { ModalForm } from '~/components/ModalForm/ModalForm'
import { PreviewCard } from '~/components/storyPreviewCard/PreviewCard'
import { CardDisplay } from '~/layouts/CardDisplay'
import { prisma } from '~/server/db'
import { getServerSideTranslations } from '~/server/i18n'
import { api, type RouterOutputs } from '~/utils/api'
import { trpcServerClient } from '~/utils/ssr'

import Logo from '../../../public/assets/tmf-logo-rect-bw-cropped.png'

export const CategoryPage = ({ stories, category }: CategoryPageProps) => {
	// const year = Number(new Date().getFullYear())
	const router = useRouter()
	const { t } = useTranslation()

	const previewCards = stories.map(
		({ name, pronouns, response1EN, response1ES, response2EN, response2ES, id }, i) => {
			const pronounList = pronouns.map(({ pronoun }) =>
				router.locale === 'es' ? pronoun.pronounsES : pronoun.pronounsEN
			)
			const storyText = router.locale === 'es' ? response1ES ?? response2ES : response1EN ?? response2EN
			return (
				<Container key={id}>
					<Link href={{ pathname: '/story/[id]', query: { id } }} style={{ textDecoration: 'none' }}>
						<PreviewCard title={name} subtitle={pronounList.join(', ')} text={storyText} />
					</Link>
				</Container>
			)
		}
	)

	return (
		<Container fluid>
			<Grid align='center' my='md'>
				<Grid.Col lg={5} md={4} px={{ lg: 40 }}>
					<AspectRatio ratio={723 / 174} my={40} mx='auto' maw='70vw'>
						<Image src={Logo} alt='transmasc logo' fill />
					</AspectRatio>
				</Grid.Col>
				<Grid.Col lg={4} md={4}>
					<Title fw={100} order={1} fz={30} align='center' tt='uppercase'>
						{t(`story-gallery.${category}`)}
					</Title>
				</Grid.Col>
				<Grid.Col lg={3} md={4}>
					<ModalForm />
				</Grid.Col>
			</Grid>
			{Boolean(previewCards.length) && <CardDisplay>{previewCards}</CardDisplay>}
		</Container>
	)
}

type CategoryPageProps = {
	stories: RouterOutputs['story']['getByCategory']
	category: string
}

const Category: NextPage = () => {
	const router = useRouter<'/category/[tag]'>()
	const query = router.query.tag ?? ''
	const { data, isError, isLoading } = api.story.getByCategory.useQuery({ tag: query })

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
			<CategoryPage stories={data} category={query} />
		</>
	)
}

export const getStaticProps: GetStaticProps<
	Record<string, unknown>,
	RoutedQuery<'/category/[tag]'>
> = async ({ locale, params }) => {
	const ssg = await trpcServerClient({ session: null })
	if (!params?.tag) return { notFound: true }

	const [i18n] = await Promise.allSettled([
		getServerSideTranslations(locale),
		ssg.story.getByCategory.prefetch({ tag: params?.tag }),
	])

	return {
		props: {
			trpcState: ssg.dehydrate(),
			...(i18n.status === 'fulfilled' ? i18n.value : {}),
		},
		revalidate: 60 * 60 * 60 * 24, // 24 hours
	}
}
export const getStaticPaths: GetStaticPaths = async ({ locales = ['en', 'es'] }) => {
	const categories = await prisma.storyCategory.findMany({ select: { tag: true } })

	return {
		paths: categories.flatMap(({ tag }) => locales.map((locale) => ({ params: { tag }, locale }))),
		fallback: 'blocking',
	}
}

export default Category
