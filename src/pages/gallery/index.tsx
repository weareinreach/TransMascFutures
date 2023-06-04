import {
	AspectRatio,
	Box,
	Container,
	createStyles,
	type DefaultProps,
	Grid,
	Modal,
	Stack,
	Title,
	useMantineTheme,
} from '@mantine/core'
import { useHover, useMediaQuery } from '@mantine/hooks'
import { type GetStaticProps } from 'next'
import Head from 'next/head'
import NextImage, { type ImageProps as NextImageProps } from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { forwardRef, useMemo } from 'react'

import { ModalForm, StoryPreviewCarousel } from '~/components'
import { artData, getArtData } from '~/data/artwork'
import { ArtItem } from '~/layouts/ArtItem'
import { getServerSideTranslations } from '~/server/i18n'
import { fontIbmPlexSans } from '~/styles'
import Logo from '~public/assets/tmf-logo-rect-bw-cropped.png'

const useStyles = createStyles((theme) => ({
	fanOut: {
		'&[data-hovered=true]': {
			transform: 'translateY(attr(data-item px)) !important',
		},
	},
}))

const uesImageStyles = createStyles((theme) => ({
	root: {},
}))

interface ImageProps extends DefaultProps, NextImageProps {}
const Image = forwardRef<HTMLImageElement, ImageProps>(
	({ classNames, styles, unstyled, className, alt, src, ...props }, ref) => {
		const { classes, cx } = uesImageStyles(undefined, { name: 'NextImage', classNames, styles, unstyled })

		return (
			<Box
				component={NextImage}
				ref={ref}
				alt={alt}
				src={src}
				className={cx(classes.root, className)}
				{...props}
			/>
		)
	}
)
Image.displayName = 'NextImage'

const Gallery = () => {
	const router = useRouter()
	const theme = useMantineTheme()
	const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.xs})`)
	const { hovered, ref } = useHover()
	const isEnglish = router.locale === 'en'
	const { t } = useTranslation()

	const popupArt = useMemo(
		() =>
			router.query.artist && typeof router.query.artist === 'string'
				? getArtData(router.query.artist)
				: Array.isArray(router.query.artist) && router.query.artist.length
				? getArtData(router.query.artist.at(0))
				: undefined,
		[router.query.artist]
	)

	const slides = artData.map((art) => {
		if (!Array.isArray(art.src))
			return (
				<Stack align='center' key={art.artist} h='100%' justify='space-evenly'>
					<Link
						href={{ pathname: '/gallery', query: { artist: art.slug } }}
						as={`/gallery/${art.slug}`}
						scroll={false}
						style={{ textDecoration: 'none', margin: 'auto' }}
					>
						<AspectRatio ratio={art.src.width / art.src.height} w={`min(${art.src.width}px, 25vw)`}>
							<Image src={art.src} alt={isEnglish ? art.altEN : art.altES} fill />
						</AspectRatio>
					</Link>
					<Link
						href={{ pathname: '/gallery', query: { artist: art.slug } }}
						as={`/gallery/${art.slug}`}
						scroll={false}
						style={{ textDecoration: 'none' }}
					>
						<Title order={3} tt='uppercase'>
							{art.artist}
						</Title>
					</Link>
				</Stack>
			)

		return (
			<Stack align='center' key={art.artist} ref={ref} h='100%' justify='space-evenly'>
				<Link
					href={{ pathname: '/gallery', query: { artist: art.slug } }}
					as={`/gallery/${art.slug}`}
					scroll={false}
					style={{ textDecoration: 'none', margin: 'auto' }}
				>
					<Stack pos='relative'>
						{art.src.map((image, i, arr) => (
							<Image
								key={`${art.artist}-${i}`}
								src={image}
								alt={isEnglish ? art.altEN : art.altES}
								height={500}
								sx={(theme) => ({
									zIndex: 10 - i,
									position: i === 0 ? 'relative' : 'absolute',
									top: 0,
									transform: `translateX(${20 * i}px) translateY(${10 * i}px) rotate(-${
										(arr.length - i) * 2
									}deg)`,
									transition: 'transform .5s ease-in-out',
									'&[data-hovered=true]': {
										transform: `translateX(${30 * i}px) translateY(${15 * i}px) rotate(-${
											(arr.length - i) * 4
										}deg)`,
									},
								})}
								data-hovered={hovered}
								data-item={i}
								// className={classes.fanOut}
							/>
						))}
					</Stack>
				</Link>
				<Link
					href={{ pathname: '/gallery', query: { artist: art.slug } }}
					as={`/gallery/${art.slug}`}
					scroll={false}
					style={{ textDecoration: 'none', margin: 'auto', zIndex: 11, backgroundColor: 'inherit' }}
				>
					<Title order={3} tt='uppercase'>
						{art.artist}
					</Title>
				</Link>
			</Stack>
		)
	})

	return (
		<Container fluid>
			<Head>
				<title>{t('page-title.general-template', { page: '$t(nav.gallery)' })}</title>
			</Head>
			<Grid align='center' my='md'>
				<Grid.Col lg={5} md={4} px={{ lg: 40 }}>
					<AspectRatio ratio={723 / 174} my={40} mx='auto' maw='70vw'>
						<Image src={Logo} alt={t('logo-alt')} fill />
					</AspectRatio>
				</Grid.Col>
				<Grid.Col lg={4} md={4}>
					<Title
						fw={300}
						order={1}
						fz={30}
						align='center'
						tt='uppercase'
						lts={5}
						style={fontIbmPlexSans.style}
					>
						{t('page-title.gallery')}
					</Title>
				</Grid.Col>
				<Grid.Col lg={3} md={4}>
					<ModalForm />
				</Grid.Col>
			</Grid>
			<StoryPreviewCarousel slidesToScroll='auto' align='center' slideSize='33%' height='100%'>
				{slides}
			</StoryPreviewCarousel>
			<Modal
				opened={!!popupArt}
				// eslint-disable-next-line @typescript-eslint/no-misused-promises
				onClose={() => router.replace({ pathname: '/gallery' }, undefined, { shallow: true, scroll: false })}
				size='75vw'
				centered
				overlayProps={{ blur: 2 }}
				closeButtonProps={{ size: isMobile ? 'xl' : 'lg' }}
				radius='xl'
				fullScreen={isMobile}
				styles={{ content: { minHeight: '90vh' } }}
			>
				{popupArt && (
					<ArtItem
						name={popupArt.artist}
						image={popupArt.src}
						alt={isEnglish ? popupArt.altEN : popupArt.altES}
						description={isEnglish ? popupArt.descriptionEN : popupArt.descriptionES}
					/>
				)}
			</Modal>
		</Container>
	)
}
export const getStaticProps: GetStaticProps = async ({ locale }) => {
	return {
		props: {
			...(await getServerSideTranslations(locale)),
		},
		revalidate: 60 * 60 * 24, // 24 hours
	}
}

export default Gallery
