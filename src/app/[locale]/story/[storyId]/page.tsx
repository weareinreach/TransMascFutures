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

const StoryPage = async ({ params: { storyId } }: PageProps) => {
	const story = await api.story.getStoryById({ id: storyId })

	const randomImage = story.categories.at(Math.floor(Math.random() * story.categories.length))?.image
	const image = getCategoryImage(randomImage ?? '')

	const storyProps: IndividualStoryProps = {
		id: storyId,
		name: story.name,
		image,
		pronouns: story.pronouns,
		response1: story.response1,
		response2: story.response2,
	}

	return (
		<div style={{ padding: '40px' }}>
			<IndividualStory {...storyProps} />
		</div>
	)
}

type PageProps = {
	params: {
		locale: string
		storyId: string
	}
}

export default StoryPage