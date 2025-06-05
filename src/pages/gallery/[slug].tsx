import { Group, Title } from '@mantine/core'
import { type GetStaticPaths, type GetStaticProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { type RoutedQuery } from 'nextjs-routes'

import { artData, type ArtData, getArtData } from '~/data/artwork'
import { ArtItem } from '~/layouts/ArtItem'
import { getServerSideTranslations } from '~/server/i18n'

interface ArtistDisplayProps {
	artwork: ArtData
}

const ArtistDisplay = ({ artwork }: ArtistDisplayProps) => {
	const router = useRouter<'/gallery/[slug]'>()
	const isEnglish = router.locale === 'en'
	const { t } = useTranslation()

	if (!artwork) return router.replace({ pathname: '/gallery' })

	return (
		<>
			<Head>
				<title>{t('page-title.general-template', { page: '$t(nav.gallery)' })}</title>
			</Head>
			<Group w='100%'>
				<Title order={1} tt='uppercase' pl={40} py={20}>
					{t('nav.gallery')}
				</Title>
			</Group>
			<ArtItem
				name={artwork.artist}
				image={artwork.src}
				alt={isEnglish ? artwork.altEN : artwork.altES}
				description={isEnglish ? artwork.descriptionEN : artwork.descriptionES}
			/>
		</>
	)
}

export const getStaticProps: GetStaticProps<ArtistDisplayProps, RoutedQuery<'/gallery/[slug]'>> = async ({
	locale,
	params,
}) => {
	const artwork = getArtData(params?.slug)

	if (!artwork)
		return {
			notFound: true,
		}

	return {
		props: {
			artwork,
			...(await getServerSideTranslations(locale)),
		},
		// revalidate: 60 * 60 * 24 * 7, // 1 week
	}
}

export const getStaticPaths: GetStaticPaths = () => {
	const slugs = artData.map(({ slug }) => slug)

	return {
		paths: slugs.flatMap((slug) => [
			{ params: { slug }, locale: 'en' },
			{ params: { slug }, locale: 'es' },
			{ params: { slug }, locale: 'fr' },
		]),
		fallback: 'blocking',
	}
}

export default ArtistDisplay
