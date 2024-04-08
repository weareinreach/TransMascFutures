import { type StorybookConfig } from "@storybook/nextjs";
import { merge } from "merge-anything";

import { dirname, join } from "path";

const config: StorybookConfig = {
	stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
	staticDirs: [
		{
			from: "../public",
			to: "/",
		},
	],
	addons: [
		getAbsolutePath("@storybook/addon-a11y"),
		getAbsolutePath("@storybook/addon-links"),
		getAbsolutePath("@storybook/addon-essentials"),
		getAbsolutePath("@storybook/addon-interactions"),
	],
	framework: {
		name: "@storybook/nextjs",
		options: {},
	},
	docs: {
		autodocs: "tag",
	},
	typescript: {
		check: true,
		reactDocgen: "react-docgen-typescript", //'react-docgen-typescript',
		reactDocgenTypescriptOptions: {
			shouldExtractLiteralValuesFromEnum: true,
			shouldExtractValuesFromUnion: true,
			compilerOptions: {
				esModuleInterop: false,
			},
		},
	},
	webpackFinal: (config) => {
		const configAdditions: typeof config = {
			resolve: {
				alias: {
					// 'next-i18next': 'react-i18next',
				},
			},
		};
		const mergedConfig = merge(config, configAdditions);
		return mergedConfig;
	},
};

export default config;

function getAbsolutePath(value: string): string {
	return dirname(require.resolve(join(value, "package.json")));
}
