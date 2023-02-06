import { Card, Text, Title, createStyles } from '@mantine/core'

const useStyles = createStyles((theme) => ({
	card: {
		maxWidth: 320,
	},
	title: {
		marginBottom: '0px !important',
		[`@media (max-width: ${theme.breakpoints.md}px)`]: {
			fontSize: theme.fontSizes.md,
		},
	},
	text: {
		paddingLeft: theme.spacing.xl,
		paddingRight: theme.spacing.xl,
		fontSize: theme.fontSizes.xl,
	},
}))

type Props = {
	title: string
	text: string
}

export const StatisticCard = ({ title, text }: Props) => {
	const { classes } = useStyles()
	return (
		<Card className={classes.card}>
			<Card.Section>
				<Title order={1} weight={700} align='center' className={classes.title}>
					{title}
				</Title>
			</Card.Section>
			<Text ta='center' fw={500} className={classes.text}>
				{text}
			</Text>
		</Card>
	)
}
