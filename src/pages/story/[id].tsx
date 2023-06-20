import { type GetStaticPaths, type GetStaticProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { type RoutedQuery } from 'nextjs-routes'

import { getCategoryImage } from '~/data/categoryImages'
import { IndividualStory, type IndividualStoryProps } from '~/layouts/IndividualStory/IndividualStory'
import { prisma } from '~/server/db'
import { getServerSideTranslations } from '~/server/i18n'
import { api } from '~/utils/api'
import { trpcServerClient } from '~/utils/ssr'

const Story = () => {
	const router = useRouter<'/story/[id]'>()
	const { data, isLoading } = api.story.getStoryById.useQuery({ id: router.query.id ?? '' })
	const { t } = useTranslation()
	if (!data || isLoading) return <>Loading...</>

	const randomImage = data.categories.at(Math.floor(Math.random() * data.categories.length))?.category.image
	const image = getCategoryImage(randomImage ?? '')
	const isEnglish = router.locale === 'en'

	const storyProps: IndividualStoryProps = {
		name: data.name,
		image,
		pronouns: isEnglish
			? data.pronouns.map(({ pronoun }) => pronoun.pronounsEN)
			: data.pronouns.map(({ pronoun }) => pronoun.pronounsES),
		response1: isEnglish ? data.response1EN : data.response2EN,
		response2: isEnglish ? data.response2EN : data.response2ES,
	}

	return (
		<>
			<Head>
				<title>{t('page-title.general-template', { page: '$t(nav.stories)' })}</title>
			</Head>
			<IndividualStory {...storyProps} />
		</>
	)
}

export const getStaticProps: GetStaticProps<Record<string, unknown>, RoutedQuery<'/story/[id]'>> = async ({
	locale,
	params,
}) => {
	const ssg = await trpcServerClient({ session: null })
	if (!params?.id) return { notFound: true }

	const [i18n] = await Promise.allSettled([
		getServerSideTranslations(locale),
		ssg.story.getStoryById.prefetch({ id: params.id }),
	])

	return {
		props: {
			trpcState: ssg.dehydrate(),
			...(i18n.status === 'fulfilled' ? i18n.value : {}),
		},
		revalidate: 60 * 60 * 24, // 24 hours
	}
}
export const getStaticPaths: GetStaticPaths = async ({ locales = ['en', 'es'] }) => {
	const stories = await prisma.story.findMany({ select: { id: true }, where: { published: true } })

	return {
		paths: stories.flatMap(({ id }) => locales.map((locale) => ({ params: { id }, locale }))),
		fallback: 'blocking',
	}
}

export default Story
