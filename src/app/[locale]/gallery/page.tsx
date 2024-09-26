import Link from 'next/link'
import type { Metadata } from 'next'
import { Image } from '~/app/_components/Image'
import { artData } from '~/data/artwork'

import { AspectRatio, Container, Grid, GridCol, Stack, Title, rem } from '@mantine/core'
import { StoryPreviewCarousel } from '~/app/_components/StoryPreviewCarousel'

import { PopupArt } from '~/app/_components/PopupArt'
import { GalleryBanner } from '~/app/_components/GalleryBanner'
import { initTranslations } from '~/app/i18n'
import classes from './page.module.css'

export const generateMetadata = async ({ params: { locale } }: PageProps): Promise<Metadata> => {
	const { t } = await initTranslations(locale, ['common'])
	return {
		title: t('page-title.general-template', { page: t('nav.gallery') }),
	}
}
const Page = async ({ params: { locale } }: PageProps) => {
	const { t } = await initTranslations(locale, ['common', 'art'])

	const slides = artData.map((art) => (
		<Stack align='center' key={art.artist} h='100%' justify='space-evenly' className={classes.slideStack}>
			<Link
				href={`/gallery?artist=${art.slug}`}
				scroll={false}
				style={{ textDecoration: 'none', margin: 'auto' }}
			>
				{Array.isArray(art.src) ? (
					<Stack pos='relative'>
						{art.src.map((image, i, arr) => {
							const altText = t(`art:${art.slug}-alt-text`)
							return (
								<AspectRatio
									key={`${art.artist}-${i}`}
									ratio={image.width / image.height}
									className={classes.slideGroup}
									style={{
										'--slide-img-width': `${image.width}px`,
										'--slide-index': i,
										'--slide-total': arr.length,
									}}
									mod={[{ 'slide-index': i }]}
								>
									<Image
										src={image}
										alt={altText}
										className={classes.slideFan}
										style={{
											'--slide-index': i,
											'--slide-total': arr.length,
											'--rotation-factor': (arr.length - i) * -1,
										}}
										fill
										fit='contain'
									/>
								</AspectRatio>
							)
						})}
					</Stack>
				) : (
					<AspectRatio
						ratio={art.src.width / art.src.height}
						className={classes.aspect}
						style={{ '--slide-img-width': rem(art.src.width) }}
						pos='relative'
					>
						<Image alt={t(`art:${art.slug}-alt-text`)} src={art.src} fill fit='contain' />
					</AspectRatio>
				)}
			</Link>
			<Link
				href={`/gallery?artist=${art.slug}`}
				// as={`/gallery/${art.slug}`}
				scroll={false}
				style={{ textDecoration: 'none', zIndex: 11, backgroundColor: 'inherit', margin: 'auto' }}
			>
				<Title order={3} tt='uppercase' py={40}>
					{art.artist}
				</Title>
			</Link>
		</Stack>
	))

	return (
		<Container fluid>
			<GalleryBanner pageTitle='page-title.gallery' />
			<StoryPreviewCarousel slidesToScroll='auto' slideSize='33%' visibleFrom='md'>
				{slides}
			</StoryPreviewCarousel>
			<Grid hiddenFrom='md'>
				{slides.map((slide, i) => (
					<GridCol key={i} span={{ sm: 4, xs: 6 }}>
						{slide}
					</GridCol>
				))}
			</Grid>
			<PopupArt />
		</Container>
	)
}

export default Page
type PageProps = {
	params: {
		locale: string
	}
}
