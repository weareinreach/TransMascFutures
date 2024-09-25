import type { IndividualStoryProps } from '~/app/_components/IndividualStory'
import { initTranslations } from '~/app/i18n'
import { api } from '~/trpc/server'
import { getCategoryImage } from '~/data/categoryImages'
import { IndividualStory } from '~/app/_components/IndividualStory'
import type { Metadata } from 'next'

export const generateMetadata = async ({ params: { locale } }: PageProps): Promise<Metadata> => {
	const { t } = await initTranslations(locale, ['common'])
	return {
		title: t('page-title.general-template', { page: t('nav.stories') }),
	}
}

const StoryPage = async ({ params: { locale, storyId } }: PageProps) => {
	const story = await api.story.getStoryById({ id: storyId })

	const randomImage = story.categories.at(Math.floor(Math.random() * story.categories.length))?.category
		?.image
	const image = getCategoryImage(randomImage ?? '')

	const storyProps: IndividualStoryProps = {
		name: story.name,
		image,
		pronouns: story.pronouns.map(({ pronoun }) => pronoun.pronouns),
		response1: story.response1,
		response2: story.response2,
	}

	return <IndividualStory {...storyProps} />
}

type PageProps = {
	params: {
		locale: string
		storyId: string
	}
}

export default StoryPage
