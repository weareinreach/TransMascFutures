import { Carousel } from '@mantine/carousel'
import { createStyles, rem } from '@mantine/core'
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'
import AutoHeight from 'embla-carousel-auto-height'
import { type ReactNode } from 'react'

type CarouselProps = {
	children: ReactNode[]
}
const useStyles = createStyles((theme) => ({
	viewport: {
		padding: `${rem(60)} ${rem(0)}`,
	},
}))
export const StoryPreviewCarousel = ({ children }: CarouselProps) => {
	const { classes } = useStyles()
	const slides = children.map((child, i) => <Carousel.Slide key={i}>{child}</Carousel.Slide>)
	const [size, strokeWidth, color] = [64, 3, 'black']
	return (
		<Carousel
			slideSize='100%'
			slideGap='xs'
			loop
			align='center'
			slidesToScroll={1}
			nextControlIcon={<IconChevronRight size={size} strokeWidth={strokeWidth} color={color} />}
			previousControlIcon={<IconChevronLeft size={size} strokeWidth={strokeWidth} color={color} />}
			styles={(theme) => ({
				control: {
					border: 'none',
					backgroundColor: 'transparent',
					boxShadow: 'none',
				},
			})}
			// controlsOffset={16}
			inViewThreshold={1}
			plugins={[AutoHeight({ active: true })]}
			controlSize={size}
			classNames={classes}
		>
			{slides}
		</Carousel>
	)
}
