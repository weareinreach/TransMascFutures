import { Grid, GridCol, AspectRatio, Button, Title } from '@mantine/core'
import { Image } from '~/app/_components/Image'
import Link from 'next/link'
import Logo from '~public/assets/tmf-logo-rect-bw-cropped.png'
import { fontIbmPlexSans } from '~/app/_styles/fonts'
import { initTranslations } from '~/app/i18n'
import { getLocale } from '~/server/i18n'

export const GalleryBanner = async ({ pageTitle }: GalleryBannerProps) => {
	const locale = getLocale()
	const { t } = await initTranslations(locale, ['common'])

	const logoAltText = t('logo-alt')
	const translatedTitle = t(pageTitle)
	return (
		<Grid align='center' my='md' grow>
			<GridCol span={{ sm: 6, lg: 5, md: 4 }} px={{ lg: 40 }}>
				<AspectRatio ratio={723 / 174} my={40} mx='auto' maw={750}>
					<Image src={Logo} alt={logoAltText} fit='contain' />
				</AspectRatio>
			</GridCol>
			<GridCol span={{ sm: 6, md: 4 }}>
				<Title fw={300} order={1} fz={30} ta='center' tt='uppercase' lts={5} style={fontIbmPlexSans.style}>
					{translatedTitle}
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
	)
}

export type StoryCategories =
	| 'bipoc'
	| 'disabled'
	| 'elder'
	| 'gallery-joy'
	| 'immigrant'
	| 'queer'
	| 'transman'
	| 'transmasc'
type GalleryBannerProps = {
	pageTitle: 'page-title.gallery' | `story-gallery.${StoryCategories}`
}
