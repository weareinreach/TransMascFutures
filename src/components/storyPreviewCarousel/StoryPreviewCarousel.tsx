import { Carousel, type CarouselProps } from '@mantine/carousel'
import { createStyles, rem } from '@mantine/core'
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'
import AutoHeight from 'embla-carousel-auto-height'
import { forwardRef, type ReactNode } from 'react'

interface StoryPreviewCarouselProps extends CarouselProps {
	children: ReactNode[]
}
const useStyles = createStyles((theme) => ({
	viewport: {
		padding: `${rem(60)} ${rem(0)}`,
	},
}))
export const StoryPreviewCarousel = forwardRef<HTMLDivElement, StoryPreviewCarouselProps>(
	({ children, ...props }, ref) => {
		const { classes } = useStyles()
		const slides = children.map((child, i) => <Carousel.Slide key={i}>{child}</Carousel.Slide>)
		const [size, strokeWidth, color] = [64, 3, 'black']
		return (
			<Carousel
				ref={ref}
				height='100%'
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
				sx={{ flex: 1 }}
				{...props}
			>
				{slides}
			</Carousel>
		)
	}
)
StoryPreviewCarousel.displayName = 'StoryPreviewCarousel'
