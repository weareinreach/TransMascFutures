import { Image } from './Image'
import { type StaticImageData } from 'next/image'
import classes from './ImageFan.module.css'

export const ImageFan = ({ currentItem, image, alt, totalItems }: ImageFanProps) => {
	return (
		<Image
			src={image}
			alt={alt}
			className={classes.item}
			style={{
				'--image-fan-current': currentItem,
				'--image-fan-total': totalItems,
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
