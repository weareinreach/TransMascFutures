'use client'
import { type Embla, useAnimationOffsetEffect } from '@mantine/carousel'
import { useMantineTheme, AspectRatio, Flex, Group, Stack, Text, Title } from '@mantine/core'
import classes from './ArtItem.module.css'
import { useMediaQuery } from '@mantine/hooks'
import { type StaticImageData } from 'next/image'
import { Image } from './Image'
import { useState } from 'react'
import { StoryPreviewCarousel } from '~/app/_components/StoryPreviewCarousel'
export const ArtItem = ({ image, name, description, alt, isModal }: IndividualStoryProps) => {
	const theme = useMantineTheme()
	const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`)
	const [embla, setEmbla] = useState<Embla | null>(null)
	useAnimationOffsetEffect(embla, 200)

	return (
		<Flex className={classes.story} align='center' justify='space-evenly'>
			<Group className={classes.imageContainer} maw={{ base: '90%', md: '60%', lg: '50%' }}>
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
						withControls={!isMobile}
					>
						{image.map((src) => (
							<AspectRatio
								key={src.src}
								ratio={src.width / src.height}
								mx='auto'
								className={classes.aspect}
								style={{
									'--artitem-width': src.width,
									'--artitem-height': src.height,
								}}
							>
								<Image src={src} alt={alt} h='100%' />
							</AspectRatio>
						))}
					</StoryPreviewCarousel>
				) : (
					<AspectRatio
						ratio={image.width / image.height}
						// mx='auto'
						className={classes.aspect}
						style={{
							'--artitem-width': image.width,
						}}
					>
						<Image src={image} alt={alt} h='100%' />
					</AspectRatio>
				)}
			</Group>

			<Group className={classes.content} mod={{ isModal }}>
				<Stack gap={4} pb={{ xs: 0, lg: 16 }}>
					<Title order={2} tt='uppercase' fw={700} fz={{ base: 24, lg: 40 }} pt={{ base: 20, lg: 0 }}>
						{name}
					</Title>
				</Stack>

				<Flex direction='column' gap='1rem'>
					{description ? (
						<div className='quote-wrapper'>
							<Text>{description}</Text>
						</div>
					) : alt ? (
						<div className='quote-wrapper'>
							<Text>{alt}</Text>
						</div>
					) : null}
				</Flex>
			</Group>
		</Flex>
	)
}
ArtItem.displayName = 'ArtItem'

export interface IndividualStoryProps {
	image: StaticImageData | StaticImageData[]
	name: string
	description?: string
	alt: string
	isModal?: boolean
}
