import { Image } from './Image'
import { type StaticImageData } from 'next/image'

export const ImageFan = ({ currentItem, image, alt, totalItems }: ImageFanProps) => {
	return (
		<Image
			src={image}
			alt={alt}
			style={{
				transform: `translateX(${20 * currentItem}px) translateY(${10 * currentItem}px) rotate(-${(totalItems - currentItem) * 2}deg)`,
				transition: 'transform .5s ease-in-out',
				'&:hover': {
					transform: `translateX(${30 * currentItem}px) translateY(${15 * currentItem}px) rotate(-${(totalItems - currentItem) * 4}deg)`,
				},
			}}
			mod={[{ item: currentItem }]}
		/>
	)
}

type ImageFanProps = {
	image: StaticImageData
	alt: string
	currentItem: number
	totalItems: number
}
