'use client'
import { Blockquote, Flex, Group, rem, Stack, Text, Title, Modal } from '@mantine/core'
import Image, { type StaticImageData } from 'next/image'
import { useTranslation } from 'react-i18next'
import { type ComponentPropsWithoutRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import classes from './IndividualStory.module.css'
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
	modalShouldOpen,
	category,
}: IndividualStoryProps) => {
	const { t } = useTranslation()
	const router = useRouter()

	const redirectToCategoryPage = useCallback(() => {
		router.replace(`/category/${category}`, { scroll: false })
	}, [router, category])
	return (
		<Modal
			opened={modalShouldOpen}
			onClose={redirectToCategoryPage}
			size='75vw'
			centered
			overlayProps={{ blur: 2 }}
			// closeButtonProps={{ size: isMobile ? 'xl' : 'lg' }}
			radius='xl'
			// fullScreen={isMobile}
		>
			<Flex className={classes.story} align='center' justify='space-evenly'>
				<Group className={classes.imageContainer}>
					<Image src={image} alt={'photo of individual'} height={350} width={Math.round(350 * 0.6923)} />
				</Group>

				<Group className={classes.content} mod={{ isModal: true }}>
					<Stack gap={4} pb={{ xs: 0, lg: 16 }}>
						<Title order={1} tt='uppercase' fw={700}>
							{name}
						</Title>
						<Text fw={500} tt='lowercase'>{`(${pronouns.join(', ')})`}</Text>
					</Stack>

					<Flex direction='column' gap='1rem'>
						{response1 && (
							<div className='quote-wrapper'>
								<div className={classes.label}>{t('story.prompt1')}</div>
								<Blockquote
									icon={<QuoteIcon />}
									iconSize={16}
									styles={{ icon: { marginRight: rem(4) } }}
									className={classes.blockquote}
								>
									{response1}
								</Blockquote>
							</div>
						)}
						{response2 && (
							<div className='quote-wrapper'>
								<div className={classes.label}>{t('story.prompt2')}</div>
								<Blockquote
									icon={<QuoteIcon />}
									iconSize={16}
									styles={{ icon: { marginRight: rem(4) } }}
									className={classes.blockquote}
								>
									{response2}
								</Blockquote>
							</div>
						)}
					</Flex>
				</Group>
			</Flex>
		</Modal>
	)
}

export interface IndividualStoryProps {
	image: string | StaticImageData
	name: string
	pronouns: string[]
	response1: string | null
	response2: string | null
	modalShouldOpen: boolean
	category: string
}
