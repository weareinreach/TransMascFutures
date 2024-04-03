import {
	AspectRatio,
	Card,
	createStyles,
	rem,
	Stack,
	Text,
} from "@mantine/core";
import Image from "next/image";
import { type ReactNode } from "react";

type CardProps = {
	title: string;
	subtitle?: string;
	text: string | ReactNode | ReactNode[];
	imgAlt?: string;
	imgSrc?: string;
};

const useStyles = createStyles((theme) => ({
	card: {
		background: "transparent",
		maxWidth: rem(480),
		["& a"]: {
			textDecoration: "underline",
			color: "inherit",
		},
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	subheading: {
		color: theme.fn.lighten(theme.other.colors.black, 0.2),
	},
}));

export const PreviewCard = ({
	text,
	title,
	subtitle,
	imgSrc,
	imgAlt,
}: CardProps) => {
	const { classes } = useStyles();
	const lineclamp = { lineClamp: typeof text === "string" ? 5 : undefined };
	return (
		<Card m="md" mx="auto" h="90%" className={classes.card}>
			<Card.Section>
				{imgSrc && imgAlt && (
					<AspectRatio ratio={480 / 355}>
						<Image
							width={480}
							height={355}
							alt={imgAlt}
							src={imgSrc || "/assets/tmf-logo-sq-color.png"}
						/>
					</AspectRatio>
				)}
			</Card.Section>
			<Stack spacing={0}>
				<Text fw={700} fz="lg" tt="uppercase">
					{title}
				</Text>
				{subtitle && (
					<Text fw={500} fz="sm" className={classes.subheading} tt="lowercase">
						({subtitle})
					</Text>
				)}
				<Text {...lineclamp} fz="sm">
					{typeof text === "string"
						? text
								.split("\n")
								.map((paragraph, i) => <Text key={i}>{paragraph}</Text>)
						: text}
				</Text>
			</Stack>
		</Card>
	);
};
