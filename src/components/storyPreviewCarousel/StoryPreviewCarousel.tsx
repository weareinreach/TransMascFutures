import { Carousel } from "@mantine/carousel"

import type { ReactNode } from "react"

type CarouselProps = {
	children: ReactNode[]
}


export const StoryPreviewCarousel = ({ children }: CarouselProps )=>{
	const slides = children.map((child, i) => <Carousel.Slide key={i}>{child}</Carousel.Slide> )

	return (
		<Carousel
			withIndicators
			slideSize="32%"
			slideGap="md"
			loop
			align="center"
			slidesToScroll={3}
	>
			{slides}
		</Carousel>
	)
}
