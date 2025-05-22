import { Blockquote, createStyles, Flex, Group, rem, Stack, Text, Title } from '@mantine/core'
import Image, { type StaticImageData } from 'next/image'
import { useTranslation } from 'next-i18next'
import { type ComponentPropsWithoutRef } from 'react'

const useStyles = createStyles((theme, { isModal }: { isModal?: boolean }) => ({
	story: {
		[theme.fn.smallerThan('sm')]: {
			flexDirection: 'column',
		},
	},
	content: {
		padding: isModal ? rem(0) : rem(20),
		[theme.fn.largerThan('sm')]: {
			padding: isModal ? `${rem(0)} ${rem(0)} ${rem(40)} ${rem(0)}` : rem(40),
			maxWidth: '66%',
		},
		[theme.fn.largerThan('lg')]: {
			maxWidth: '50%',
		},
	},
	label: {
		fontSize: rem(18),
		fontStyle: 'italic',
		paddingBottom: rem(8),
		fontWeight: 500,
	},
	text: {},
	imageContainer: {
		[theme.fn.largerThan('sm')]: {
			maxWidth: '33%',
		},
		[theme.fn.largerThan('lg')]: {
			maxWidth: '50%',
		},
	},
}))

const QuoteIcon = (props: ComponentPropsWithoutRef<'svg'> & { height?: number; width?: number }) => (
	<svg
		width={props.width ?? rem(20)}
		height={props.height ?? rem(20)}
		viewBox='0 0 409.294 409.294'
		fill='currentColor'
		xmlns='http://www.w3.org/2000/svg'
		{...props}
	>
		<path d='M0 204.647v175.412h175.412V204.647H58.471c0-64.48 52.461-116.941 116.941-116.941V29.235C78.684 29.235 0 107.919 0 204.647zM409.294 87.706V29.235c-96.728 0-175.412 78.684-175.412 175.412v175.412h175.412V204.647H292.353c0-64.48 52.461-116.941 116.941-116.941z' />
	</svg>
)
export const IndividualStory = ({
	image,
	name,
	pronouns,
	response1,
	response2,
	isModal,
}: IndividualStoryProps) => {
	const { t } = useTranslation()
	const { classes } = useStyles({ isModal })
	const cleanName = name.split(' ')[0] ?? ''
	const displayName = cleanName
		.replace(/^[-\w']*?([A-Za-z][-\w']*)/, '$1') // Safe way to extract meaningful leading word
		.replace(/([-\w']*[A-Za-z])[-\w']*?$/, '$1') // Safe way to keep meaningful trailing word

	return (
		<Flex className={classes.story} align='center' justify='space-evenly'>
			<Group className={classes.imageContainer}>
				<Image src={image} alt={'photo of individual'} height={350} width={Math.round(350 * 0.6923)} />
			</Group>

			<Group className={classes.content}>
				<Stack spacing={4} pb={{ xs: 0, lg: 16 }}>
					<Title order={1} tt='uppercase' fw={700}>
						{displayName}
					</Title>
					<Text fw={500} tt='lowercase'>{`(${pronouns.join(', ')})`}</Text>
				</Stack>

				<Flex direction='column' gap='1rem'>
					{response1 && (
						<div className='quote-wrapper'>
							<div className={classes.label}>{t('story.prompt1')}</div>
							<Blockquote
								fz={16}
								icon={<QuoteIcon height={16} width={16} />}
								styles={{ icon: { marginRight: rem(4) } }}
								p={0}
							>
								{response1}
							</Blockquote>
						</div>
					)}
					{response2 && (
						<div className='quote-wrapper'>
							<div className={classes.label}>{t('story.prompt2')}</div>
							<Blockquote
								fz={16}
								icon={<QuoteIcon height={16} width={16} />}
								styles={{ icon: { marginRight: rem(4) } }}
								p={0}
							>
								{response2}
							</Blockquote>
						</div>
					)}
				</Flex>
			</Group>
		</Flex>
	)
}

export interface IndividualStoryProps {
	image: string | StaticImageData
	name: string
	pronouns: string[]
	response1: string | null
	response2: string | null
	isModal?: boolean
}
