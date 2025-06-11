import { Group, Title } from '@mantine/core'
import { type GetStaticPaths, type GetStaticProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { type RoutedQuery } from 'nextjs-routes'

import { artData, type ArtData, getArtData } from '~/data/artwork'
import { ArtItem } from '~/layouts/ArtItem'
import { getServerSideTranslations } from '~/server/i18n'

// --- START: Import selectLocalized helper and define LocalizedStringFields type ---
type LocalizedStringFields = {
	en: string | null | undefined
	es: string | null | undefined
	fr: string | null | undefined
}

const selectLocalized = (data: LocalizedStringFields, locale: 'en' | 'es' | 'fr' | undefined): string => {
	switch (locale) {
		case 'fr':
			return data.fr ?? data.en ?? ''
		case 'es':
			return data.es ?? data.en ?? ''
		case 'en':
		default:
			return data.en ?? ''
	}
}
// --- END: Import selectLocalized helper ---

interface ArtistDisplayProps {
	artwork: ArtData
}

const ArtistDisplay = ({ artwork }: ArtistDisplayProps) => {
	const router = useRouter<'/gallery/[slug]'>()
	// const isEnglish = router.locale === 'en' // No longer needed
	const { t } = useTranslation()

	// Get the current locale from the router
	const currentLocale = router.locale as 'en' | 'es' | 'fr' | undefined

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
				// Use selectLocalized for alt and description
				alt={selectLocalized(
					{ en: artwork.altEN, es: artwork.altES, fr: artwork.altFR ?? null },
					currentLocale
				)}
				description={selectLocalized(
					{ en: artwork.descriptionEN, es: artwork.descriptionES, fr: artwork.descriptionFR ?? null },
					currentLocale
				)}
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
