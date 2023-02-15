import { Card, Text, createStyles, AspectRatio } from '@mantine/core'
import Image from 'next/image'

import type { ReactNode } from 'react'

type CardProps = {
	title: string
	text: string | ReactNode | ReactNode[]
	imgAlt: string
	imgSrc?: string
}

const useStyles = createStyles(() => ({
	card: {
		maxWidth: 480,
		['& a']: {
			textDecoration: 'underline',
			color: 'inherit',
		},
	},
}))

export const PreviewCard = ({ text, title, imgSrc, imgAlt }: CardProps) => {
	const { classes } = useStyles()
	const lineclamp = { lineClamp: typeof text === 'string' ? 5 : undefined }
	return (
		<Card m='md' h='90%' className={classes.card}>
			<Card.Section>
				<AspectRatio ratio={480 / 355}>
					<Image width={480} height={355} alt={imgAlt} src={imgSrc || '/assets/tmf-logo-sq-color.png'} />
				</AspectRatio>
			</Card.Section>
			<Text fw={700} fz='lg' tt='uppercase'>
				{title}
			</Text>
			<Text {...lineclamp} fz='sm'>
				{typeof text === 'string'
					? text.split('\n').map((paragraph, i) => <Text key={i}>{paragraph}</Text>)
					: text}
			</Text>
		</Card>
	)
}
