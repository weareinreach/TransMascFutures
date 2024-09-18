import { Card, Text, Title, CardSection } from '@mantine/core'
import classes from './StatisticCard.module.css'

export type cardProps = {
	title: string
	text: string
}

export const StatisticCard = ({ title, text }: cardProps) => {
	return (
		<Card className={classes.card}>
			<CardSection>
				<Title order={1} className={classes.title}>
					{title}
				</Title>
			</CardSection>
			<Text className={classes.text}>{text}</Text>
		</Card>
	)
}
