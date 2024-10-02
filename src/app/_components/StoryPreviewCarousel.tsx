'use client'
import '@mantine/carousel/styles.css'
import { Carousel, type CarouselProps } from '@mantine/carousel'

import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'
import AutoHeight from 'embla-carousel-auto-height'
import { forwardRef, useMemo, type ReactNode, Children, useRef } from 'react'
import classes from './StoryPreviewCarousel.module.css'

interface StoryPreviewCarouselProps extends CarouselProps {
	children: ReactNode[]
}

export const StoryPreviewCarousel = forwardRef<HTMLDivElement, StoryPreviewCarouselProps>(
	({ children, ...props }, ref) => {
		const slides = Children.map(children, (child, i) => <Carousel.Slide key={i}>{child}</Carousel.Slide>)
		const [size, strokeWidth, color] = useMemo(() => [64, 3, 'black'], [])

		const nextIcon = useMemo(
			() => <IconChevronRight size={size} strokeWidth={strokeWidth} color={color} />,
			[color, size, strokeWidth]
		)
		const prevIcon = useMemo(
			() => <IconChevronLeft size={size} strokeWidth={strokeWidth} color={color} />,
			[color, size, strokeWidth]
		)
		// const autoHeightPlugin = useMemo(() => AutoHeight({ active: true }), [])
		const autoHeightPlugin = useRef(AutoHeight({ active: true }))

		return (
			<Carousel
				align='center'
				classNames={classes}
				controlSize={size}
				height='100%'
				inViewThreshold={1}
				loop
				nextControlIcon={nextIcon}
				plugins={[autoHeightPlugin.current]}
				previousControlIcon={prevIcon}
				ref={ref}
				slideGap='xs'
				slideSize='100%'
				slidesToScroll={1}
				style={{ flex: 1 }}
				{...props}
			>
				{slides}
			</Carousel>
		)
	}
)
StoryPreviewCarousel.displayName = 'StoryPreviewCarousel'
