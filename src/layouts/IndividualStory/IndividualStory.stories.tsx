import { type Meta, type StoryObj } from "@storybook/react";

import { categoryImages } from "~/data/categoryImages";

import { IndividualStory } from "./IndividualStory";

const meta: Meta<typeof IndividualStory> = {
	title: "Layouts/Individual Story",
	component: IndividualStory,
	tags: ["autodocs"],
	args: {
		image: categoryImages.bipoc,
		name: "Name",
		pronouns: ["Pronouns"],
		response1:
			"Lomo snackwave taiyaki hashtag activated charcoal distillery humblebrag pickled master cleanse. Next level intelligentsia forage, bicycle rights hoodie sartorial edison bulb portland mixtape chillwave. Vexillologist jianbing vice shabby chic, marxism +1 cold-pressed godard portland mlkshk. VHS woke godard gastropub 3 wolf moon. Meh tattooed knausgaard man bun, kale chips tumblr poke photo booth sriracha pour-over poutine pork belly hoodie raclette.",
		response2:
			"Skateboard gochujang big mood seitan, lumbersexual pitchfork succulents church-key fit tonx retro. Tumblr selfies unicorn gorpcore crucifix celiac. Occupy bicycle rights grailed, pabst umami hexagon ethical blue bottle. Man braid DIY forage tumblr. Lo-fi vegan pork belly tbh tote bag leggings asymmetrical mukbang mustache cupping.",
	},
};

export default meta;
type Story = StoryObj<typeof IndividualStory>;

export const Default: Story = {};

export const Mobile: Story = {
	parameters: {
		viewport: {
			defaultViewport: "iphonex",
		},
	},
};
