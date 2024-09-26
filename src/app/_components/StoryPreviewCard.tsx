import { AspectRatio, Card, CardSection, Stack, Text } from '@mantine/core'
import { Image } from '~/app/_components/Image'
import { type ReactNode } from 'react'
import classes from './StoryPreviewCard.module.css'
import { initTranslations } from '~/app/i18n'
import { getLocale } from '~/server/i18n'

export const StoryPreviewCard = async ({
	defaultText,
	storyAuthor,
	pronouns,
	imgSrc,
	imgAlt,
	id,
	promptResponse,
}: CardProps) => {
	const locale = getLocale()
	const { t } = await initTranslations(locale, ['stories', 'common'])
	const lineclamp = { lineClamp: typeof defaultText === 'string' ? 5 : undefined }

	const displayText = t(`stories:${id}.${promptResponse}`, { defaultValue: defaultText })
	const displayPronouns =
		pronouns
			?.map(({ pronouns, tag }) => t(`pronoun.${tag}`, { defaultValue: pronouns, ns: 'common' }))
			.join(', ') ?? null

	console.log(pronouns, displayPronouns)
	return (
		<Card m='md' mx='auto' h='90%' className={classes.card}>
			<CardSection>
				{imgSrc && imgAlt && (
					<AspectRatio ratio={480 / 355}>
						<Image width={480} height={355} alt={imgAlt} src={imgSrc} />
					</AspectRatio>
				)}
			</CardSection>
			<Stack gap={0}>
				<Text fw={700} fz='lg' tt='uppercase'>
					{storyAuthor}
				</Text>
				{displayPronouns && (
					<Text fw={500} fz='sm' className={classes.subheading} tt='lowercase'>
						({displayPronouns})
					</Text>
				)}
				<Text {...lineclamp} fz='sm'>
					{displayText.split('\n').map((paragraph) => paragraph)}
				</Text>
			</Stack>
		</Card>
	)
}

type Pronouns = { pronouns: string; tag: string }
type CardProps = {
	id: string
	storyAuthor: string
	pronouns?: Pronouns[]
	defaultText: string | ReactNode | ReactNode[]
	promptResponse: 'response1' | 'response2'
	imgAlt?: string
	imgSrc?: string
}
