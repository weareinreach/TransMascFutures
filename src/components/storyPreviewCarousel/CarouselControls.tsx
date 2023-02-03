import { IconChevronRight, IconChevronLeft } from '@tabler/icons'

type Props = {
	direction: string
}

export const CarouselControls = ({ direction }: Props) => {
	const [size, strokeWidth, color] = [48, 3, 'black']

	if (direction === 'right') return <IconChevronRight size={size} strokeWidth={strokeWidth} color={color} />

	return <IconChevronLeft size={size} strokeWidth={strokeWidth} color={color} />
}
