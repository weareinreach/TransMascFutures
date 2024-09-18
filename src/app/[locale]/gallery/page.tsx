import { Image } from '~/app/_components/Image'
import Link from 'next/link'
import { artData } from '~/data/artwork'

import Logo from '~public/assets/tmf-logo-rect-bw-cropped.png'
import { IBM_Plex_Sans } from 'next/font/google'

import { AspectRatio, Button, Container, Grid, GridCol, Stack, Title, rem } from '@mantine/core'
import Head from 'next/head'
import { StoryPreviewCarousel } from '~/app/_components/StoryPreviewCarousel'

import { PopupArt } from '~/app/_components/PopupArt'
import classes from './page.module.css'
import { initTranslations } from '~/app/i18n'

const fontIbmPlexSans = IBM_Plex_Sans({ subsets: ['latin'], weight: ['300', '400'], display: 'swap' })
const Page = async ({ params: { locale } }: { params: { locale: string } }) => {
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
										src={image.src}
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
				as={`/gallery/${art.slug}`}
				scroll={false}
				style={{ textDecoration: 'none', zIndex: 11, backgroundColor: 'inherit', margin: 'auto' }}
			>
				<Title order={3} tt='uppercase' py={40}>
					{art.artist}
				</Title>
			</Link>
		</Stack>
	))

	const logoAltText = t('logo-alt')

	return (
		<Container fluid>
			<Head>
				<title>{t('page-title.general-template', { page: '$t(nav.gallery)' })}</title>
			</Head>
			<Grid align='center' my='md' grow>
				<GridCol span={{ sm: 6, lg: 5, md: 4 }} px={{ lg: 40 }}>
					<AspectRatio ratio={723 / 174} my={40} mx='auto' maw={750}>
						<Image src={Logo} alt={logoAltText} fit='contain' />
					</AspectRatio>
				</GridCol>
				<GridCol span={{ sm: 6, md: 4 }}>
					<Title fw={300} order={1} fz={30} ta='center' tt='uppercase' lts={5} style={fontIbmPlexSans.style}>
						{t('page-title.gallery')}
					</Title>
				</GridCol>
				<GridCol span={{ base: 6, lg: 3, md: 4 }}>
					<Button
						component={Link}
						href={{ pathname: '/survey' }}
						tt='uppercase'
						variant='secondary'
						display='block'
						mx='auto'
					>
						{t('participate')}
					</Button>
				</GridCol>
			</Grid>
			{/* {showCarousel ? ( */}
			<StoryPreviewCarousel slidesToScroll='auto' slideSize='33%' visibleFrom='md'>
				{slides}
			</StoryPreviewCarousel>
			{/* ) : ( */}
			<Grid hiddenFrom='md'>
				{slides.map((slide, i) => (
					<GridCol key={i} span={{ sm: 4, xs: 6 }}>
						{slide}
					</GridCol>
				))}
			</Grid>
			{/* )} */}
			<PopupArt />
		</Container>
	)
}

export default Page
