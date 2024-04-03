import { Button, MediaQuery } from "@mantine/core";
import Link from "next/link";

export const BackHomeButton = () => (
	<MediaQuery query="(max-width: 1000px)" styles={{ display: "none" }}>
		<Link href="/">
			<Button>{"Back to Home"}</Button>
		</Link>
	</MediaQuery>
);
