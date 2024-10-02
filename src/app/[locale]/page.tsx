import {
	Group,
	Button,
	Stack,
	Anchor,
	Center,
	Container,
	Grid,
	Title,
	GridCol,
	AspectRatio,
} from '@mantine/core'
import { Image } from '~/app/_components/Image'
import classes from './page.module.css'
import { initTranslations, namespaces } from '~/app/i18n'
import { categoryImages, isValidCategoryImage } from '~/data/categoryImages'
import { api, HydrateClient } from '~/trpc/server'
import Link from 'next/link'
import { Trans } from '~/app/_components/Trans'
import Logo from '~public/assets/tmf-logo-rect-bw-cropped.png'
export default async function HomePage({ params: { locale } }: { params: { locale: string } }) {
	const { t } = await initTranslations(locale, namespaces)
	const categories = await api.story.getCategories()
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
					href={`/category/${tag}`}
					//{ pathname: '/category/[tag]/[[...storyId]]', query: { tag } } }
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
						href={`/category/${tag}`}
						// href={{ pathname: '/category/[tag]/[[...storyId]]', query: { tag } }}
						style={{ textAlign: 'center' }}
					>
						<Trans i18nKey='see-x-stories' values={{ category: categoryName }} shouldUnescape={true} />
					</Anchor>
				</Center>
			</Stack>
		)
	})
	return (
		<HydrateClient>
			<Container fluid>
				<Group w='100%' gap={0} className={classes.header} align='center'>
					<Stack className={classes.headerStack}>
						<AspectRatio className={classes.headerLogo}>
							<Image src={Logo} alt={t('logo-alt')} fit='contain' />
						</AspectRatio>
						<Title order={3} ta='center' py={0} fw={500} lts={2} fs='oblique'>
							{t('main-page.tagline1')}
						</Title>
						<Title order={3} ta='center' pb={0} pt={8} fw={500} lts={2} fs='oblique'>
							{t('main-page.tagline2')}
						</Title>
					</Stack>
					<Stack mx={80} mb={20}>
						<Button component={Link} href='/survey' tt='uppercase' variant='secondary'>
							{t('participate')}
						</Button>
					</Stack>
				</Group>

				<Grid grow mx='auto'>
					{previewCards.map((card, i) => (
						<GridCol key={i} span={{ base: 12, lg: 3, md: 4, xs: 6 }} mx='auto'>
							{card}
						</GridCol>
					))}
				</Grid>
			</Container>
		</HydrateClient>
	)
}
