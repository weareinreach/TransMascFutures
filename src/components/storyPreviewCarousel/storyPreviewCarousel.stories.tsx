import { faker } from "@faker-js/faker";
import { type Meta } from "@storybook/react";
import React from "react";

import { StoryPreviewCarousel } from "./StoryPreviewCarousel";
import { PreviewCard } from "../storyPreviewCard/PreviewCard";

export default {
	title: "Components/Story Preview Carousel",
	component: StoryPreviewCarousel,
	subcomponents: { PreviewCard },
	parameters: {
		layout: "fullscreen",
	},
	render: () => {
		const PreviewCards = [];
		for (let i = 0; i < 9; i++) {
			PreviewCards.push(
				<PreviewCard
					title={`${faker.name.firstName()}, Cat/Kitten, ${faker.datatype.number({ min: 1, max: 20 })}`}
					text={faker.lorem.sentences(3)}
					imgSrc={`http://placekitten.com/g/480/355`}
					imgAlt="Cat"
				/>,
			);
		}

		return <StoryPreviewCarousel>{PreviewCards}</StoryPreviewCarousel>;
	},
} as Meta<typeof StoryPreviewCarousel>;

export const Default = {};
