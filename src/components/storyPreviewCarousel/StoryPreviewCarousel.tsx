import { Carousel, type CarouselProps } from "@mantine/carousel";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import AutoHeight from "embla-carousel-auto-height";
import { Children, forwardRef, type ReactNode } from "react";

import classes from "./StoryPreviewCarousel.module.css";

interface StoryPreviewCarouselProps extends CarouselProps {
	children: ReactNode[];
}

export const StoryPreviewCarousel = forwardRef<
	HTMLDivElement,
	StoryPreviewCarouselProps
>(({ children, ...props }, ref) => {
	const slides = Children.map(children, (child, i) => (
		<Carousel.Slide key={i}>{child}</Carousel.Slide>
	));
	const [size, strokeWidth, color] = [64, 3, "black"];
	return (
		<Carousel
			ref={ref}
			height="100%"
			slideSize="100%"
			slideGap="xs"
			loop
			align="center"
			slidesToScroll={1}
			nextControlIcon={
				<IconChevronRight size={size} strokeWidth={strokeWidth} color={color} />
			}
			previousControlIcon={
				<IconChevronLeft size={size} strokeWidth={strokeWidth} color={color} />
			}
			className={classes.carousel}
			// controlsOffset={16}
			inViewThreshold={1}
			plugins={[AutoHeight({ active: true })]}
			controlSize={size}
			classNames={classes}
			style={{ flex: 1 }}
			{...props}
		>
			{slides}
		</Carousel>
	);
});
StoryPreviewCarousel.displayName = "StoryPreviewCarousel";
