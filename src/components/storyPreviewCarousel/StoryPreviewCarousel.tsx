import { Carousel } from '@mantine/carousel'
import { IconChevronRight, IconChevronLeft } from '@tabler/icons-react'
import AutoHeight from 'embla-carousel-auto-height'

import type { ReactNode } from 'react'

type CarouselProps = {
	children: ReactNode[]
}

export const StoryPreviewCarousel = ({ children }: CarouselProps) => {
	const slides = children.map((child, i) => <Carousel.Slide key={i}>{child}</Carousel.Slide>)
	const [size, strokeWidth, color] = [64, 3, 'black']
	return (
		<Carousel
			slideSize='32%'
			slideGap='xs'
			loop
			align='center'
			slidesToScroll={3}
			nextControlIcon={<IconChevronRight size={size} strokeWidth={strokeWidth} color={color} />}
			previousControlIcon={<IconChevronLeft size={size} strokeWidth={strokeWidth} color={color} />}
			styles={{
				control: {
					border: 'none',
					backgroundColor: 'transparent',
					boxShadow: 'none',
				},
			}}
			controlsOffset={-24}
			inViewThreshold={1}
			plugins={[AutoHeight({ active: true })]}
			controlSize={size}
		>
			{slides}
		</Carousel>
	)
}
