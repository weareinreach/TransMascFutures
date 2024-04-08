import { Card, Text, Title } from "@mantine/core";

import classes from "./StatisticCard.module.css";

export type cardProps = {
	title: string;
	text: string;
};

export const StatisticCard = ({ title, text }: cardProps) => {
	return (
		<Card className={classes.card}>
			<Card.Section>
				<Title order={1} fw={700} ta="center" className={classes.title}>
					{title}
				</Title>
			</Card.Section>
			<Text ta="center" fw={500} className={classes.text}>
				{text}
			</Text>
		</Card>
	);
};
