import { AspectRatio, Button, Container, Grid, GridCol, Title } from '@mantine/core'
import { Image } from '~/app/_components/Image'
import Link from 'next/link'
import { initTranslations } from '~/app/i18n'
import { api } from '~/trpc/server'
import { notFound } from 'next/navigation'
import { StoryPreviewCard } from '~/app/_components/StoryPreviewCard'
import Logo from '~public/assets/tmf-logo-rect-bw-cropped.png'
import { type Metadata } from 'next'
import { fontIbmPlexSans } from '~/app/_styles/fonts'
import { getCategoryImage } from '~/data/categoryImages'
import { CardDisplay } from '~/app/_components/CardDisplay'
import { IndividualStory } from '~/app/_components/IndividualStory'

export const generateMetadata = async ({ params: { locale } }: PageProps): Promise<Metadata> => {
	const { t } = await initTranslations(locale, ['common'])
	return {
		title: t('page-title.general-template', { page: t('nav.stories') }),
	}
}
const CategoryPage = async ({ params: { locale, tag: tagParams } }: PageProps) => {
	const { t } = await initTranslations(locale, ['common', 'stories'])

	const [tag, storyId] = tagParams
	if (!tag) {
		return notFound()
	}

	const stories = await api.story.getByCategory({ tag })
	const singleStory = typeof storyId === 'string' ? await api.story.getStoryById({ id: storyId }) : null

	const modalShouldOpen = typeof storyId === 'string'

	const previewCards = stories.map(({ name, pronouns, response1, response2, id }) => {
		const pronounList = pronouns.map(({ pronoun }) => pronoun.pronouns)
		const storyText = response1 ?? response2
		return (
			<Link
				key={id}
				href={{ pathname: `/category/${tag}/${id}` }}
				// as={`/story/${id}`}
				scroll={false}
				style={{ textDecoration: 'none' }}
				prefetch={true}
			>
				<StoryPreviewCard title={name} subtitle={pronounList.join(', ')} text={storyText} />
			</Link>
		)
	})

	return (
		<Container fluid>
			<Grid align='center' my='md' grow>
				<GridCol span={{ sm: 6, md: 4, lg: 5 }} px={{ lg: 40 }}>
					<AspectRatio ratio={723 / 174} my={40} mx='auto' maw={750}>
						<Image src={Logo} alt={t('logo-alt')} />
					</AspectRatio>
				</GridCol>
				<GridCol span={{ sm: 6, md: 4, lg: 4 }}>
					<Title fw={100} order={1} fz={30} ta='center' tt='uppercase' style={fontIbmPlexSans.style} lts={5}>
						{t(`story-gallery.${tag}`)}
					</Title>
				</GridCol>
				<GridCol span={{ lg: 3, md: 4 }}>
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
			{Boolean(previewCards.length) && <CardDisplay>{previewCards}</CardDisplay>}

			{singleStory && (
				<IndividualStory
					id={singleStory.id}
					name={singleStory.name}
					image={getCategoryImage(tag)}
					pronouns={singleStory.pronouns.map(({ pronoun }) => pronoun.pronouns)}
					response1={singleStory.response1}
					response2={singleStory.response2}
					modalShouldOpen={modalShouldOpen}
					category={tag}
				/>
			)}
		</Container>
	)
}

export default CategoryPage

type PageProps = {
	params: {
		locale: string
		tag: string[]
	}
}
