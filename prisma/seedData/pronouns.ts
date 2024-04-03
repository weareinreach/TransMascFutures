import { type Prisma } from "@prisma/client";

export const pronouns: Prisma.PronounsCreateManyInput[] = [
	{
		id: "clienra200007pexbweivoffq",
		pronounsEN: "They/Them/Theirs",
		pronounsES: "Elle",
		tag: "they",
	},
	{
		id: "clienra200008pexbpobaxztr",
		pronounsEN: "He/Him/His",
		pronounsES: "Él",
		tag: "he",
	},
	{
		id: "clienra200009pexb5wyo4bkt",
		pronounsEN: "Any pronouns",
		pronounsES: "Cualquier pronombre",
		tag: "any",
	},
	{
		id: "clienra20000apexb4zhmhq3d",
		pronounsEN: "No pronouns",
		pronounsES: "No pronombres",
		tag: "none",
	},
];
