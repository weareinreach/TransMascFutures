import { type Embla, useAnimationOffsetEffect } from '@mantine/carousel'
import { AspectRatio, createStyles, Flex, Group, rem, Stack, Text, Title } from '@mantine/core'
import Image, { type StaticImageData } from 'next/image'
import { useState } from 'react'

import { StoryPreviewCarousel } from '~/components'

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
	indicator: {
		pointerEvents: 'all',
		width: rem(25),
		height: rem(5),
		borderRadius: theme.radius.xl,
		backgroundColor: theme.black,
		boxShadow: theme.shadows.sm,
		opacity: 0.6,
		transition: `opacity 150ms ${theme.transitionTimingFunction ?? 'ease-in'}`,

		'&[data-active]': {
			opacity: 1,
		},
	},
	indicators: {
		position: 'absolute',
		bottom: `calc(${theme.spacing.md} * -1)`,
		top: undefined,
		left: 0,
		right: 0,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		gap: rem(8),
		pointerEvents: 'none',
	},
	slide: {
		objectFit: 'scale-down',
	},
}))

export const ArtItem = ({ image, name, description, alt, isModal }: IndividualStoryProps) => {
	const { classes } = useStyles({ isModal })
	const [embla, setEmbla] = useState<Embla | null>(null)
	useAnimationOffsetEffect(embla, 200)

	return (
		<Flex className={classes.story} align='center' justify='space-evenly'>
			<Group className={classes.imageContainer} maw='50%'>
				{Array.isArray(image) ? (
					<StoryPreviewCarousel
						slidesToScroll='auto'
						align='center'
						w='100%'
						slideSize='100%'
						loop={false}
						classNames={{
							indicator: classes.indicator,
							indicators: classes.indicators,
						}}
						withIndicators
						getEmblaApi={setEmbla}
					>
						{image.map((src, i) => (
							<AspectRatio
								key={i}
								ratio={src.width / src.height}
								mx='auto'
								h={src.height}
								w={src.width}
								// style={{ objectFit: 'contain' }}
							>
								<Image
									key={i}
									src={src}
									alt={alt}
									style={{ objectFit: 'contain', maxWidth: '90%', margin: '0 auto' }}
								/>
							</AspectRatio>
						))}
					</StoryPreviewCarousel>
				) : (
					<AspectRatio ratio={image.width / image.height} w={image.width} mx='auto' maw='80%'>
						<Image src={image} alt={alt} fill />
					</AspectRatio>
				)}
			</Group>

			<Group className={classes.content}>
				<Stack spacing={4} pb={{ xs: 0, lg: 16 }}>
					<Title order={2} tt='uppercase' fw={700} fz={40}>
						{name}
					</Title>
				</Stack>

				<Flex direction='column' gap='1rem'>
					{description && (
						<div className='quote-wrapper'>
							<Text>{description}</Text>
						</div>
					)}
				</Flex>
			</Group>
		</Flex>
	)
}

export interface IndividualStoryProps {
	image: StaticImageData | StaticImageData[]
	name: string
	description?: string
	alt: string
	isModal?: boolean
}
