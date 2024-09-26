import { Container } from '@mantine/core'
import Link from 'next/link'
import { initTranslations } from '~/app/i18n'
import { api } from '~/trpc/server'
import { notFound } from 'next/navigation'
import { StoryPreviewCard } from '~/app/_components/StoryPreviewCard'
import { type Metadata } from 'next'
import { getCategoryImage } from '~/data/categoryImages'
import { CardDisplay } from '~/app/_components/CardDisplay'
import { IndividualStory } from '~/app/_components/IndividualStory'
import { GalleryBanner, type StoryCategories } from '~/app/_components/GalleryBanner'

export const generateMetadata = async ({ params: { locale } }: PageProps): Promise<Metadata> => {
	const { t } = await initTranslations(locale, ['common'])
	return {
		title: t('page-title.general-template', { page: t('nav.stories') }),
	}
}
const CategoryPage = async ({ params: { tag: tagParams } }: PageProps) => {
	const [tag, storyId] = tagParams
	if (!tag) {
		return notFound()
	}

	const stories = await api.story.getByCategory({ tag })
	const singleStory = typeof storyId === 'string' ? await api.story.getStoryById({ id: storyId }) : null

	const modalShouldOpen = typeof storyId === 'string'

	const previewCards = stories.map(({ name, pronouns, response1, response2, id }) => {
		const storyText = response1 ?? response2
		const promptResponse = response1 ? 'response1' : 'response2'
		return (
			<Link
				key={id}
				href={{ pathname: `/category/${tag}/${id}` }}
				// as={`/story/${id}`}
				scroll={false}
				style={{ textDecoration: 'none' }}
				prefetch={true}
			>
				<StoryPreviewCard
					storyAuthor={name}
					pronouns={pronouns}
					defaultText={storyText}
					id={id}
					promptResponse={promptResponse}
				/>
			</Link>
		)
	})

	return (
		<Container fluid>
			<GalleryBanner pageTitle={`story-gallery.${tag as StoryCategories}`} />
			{Boolean(previewCards.length) && <CardDisplay>{previewCards}</CardDisplay>}

			{singleStory && (
				<IndividualStory
					id={singleStory.id}
					name={singleStory.name}
					image={getCategoryImage(tag)}
					pronouns={singleStory.pronouns}
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
