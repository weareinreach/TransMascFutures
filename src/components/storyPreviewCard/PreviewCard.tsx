import { Card, Image, Text, createStyles } from '@mantine/core'

type message = {
	title: string
	text: string
}


const useStyles = createStyles((theme) =>({
	card:{
		minWidth: 340,
		maxWidth: 480
	}
}))


export const PreviewCard = ({ text, title }: message) => {
	const { classes } = useStyles()

	return (
		<div className={classes.card}>
			<Card m="md">
				<Card.Section>
					<Image height={160} alt='Story image' withPlaceholder />
				</Card.Section>
				<Text fw={700} fz="lg" >
					{title}
				</Text>
				<Text lineClamp={5} fz="sm">{text}</Text>
			</Card>
		</div>
	)
}
