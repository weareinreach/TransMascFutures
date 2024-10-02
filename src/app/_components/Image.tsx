import NextImage, { type ImageProps as NextImageProps } from 'next/image'
import { Image as MantineImage, type ImageProps as MantineImageProps } from '@mantine/core'

export const Image = (props: MantineImageProps & NextImageProps) => (
	<MantineImage {...props} component={NextImage} />
)
