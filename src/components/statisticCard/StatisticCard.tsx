import { Card, createStyles, rem, Text, Title } from '@mantine/core'

const useStyles = createStyles((theme) => ({
	card: {
		maxWidth: rem(320),
	},
	title: {
		marginBottom: `${rem(0)} !important`,
		[theme.fn.smallerThan(theme.breakpoints.md)]: {
			fontSize: theme.fontSizes.md,
		},
	},
	text: {
		paddingLeft: theme.spacing.xl,
		paddingRight: theme.spacing.xl,
		fontSize: theme.fontSizes.xl,
	},
}))

export type cardProps = {
	title: string
	text: string
}

export const StatisticCard = ({ title, text }: cardProps) => {
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
