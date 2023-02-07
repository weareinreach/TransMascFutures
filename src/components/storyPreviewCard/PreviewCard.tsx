import { Card, Text, createStyles, AspectRatio } from '@mantine/core'
import Image from 'next/image'

type CardProps = {
	title: string
	text: string
	imgAlt: string
	imgSrc: string
}

const useStyles = createStyles(() => ({
	card: {
		minWidth: 340,
		maxWidth: 480,
	},
}))

export const PreviewCard = ({ text, title, imgSrc, imgAlt }: CardProps) => {
	const { classes } = useStyles()

	return (
		<div className={classes.card}>
			<Card m='md'>
				<Card.Section>
					<AspectRatio ratio={480 / 355}>
						<Image width={480} height={355} alt={imgAlt} src={imgSrc} />
					</AspectRatio>
				</Card.Section>
				<Text fw={700} fz='lg'>
					{title}
				</Text>
				<Text lineClamp={5} fz='sm'>
					{text}
				</Text>
			</Card>
		</div>
	)
}
