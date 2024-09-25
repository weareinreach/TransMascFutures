import { type Prisma } from '@prisma/client'

export const categories: Prisma.StoryCategoryCreateManyInput[] = [
	{
		id: 'clienra1i0000pexbs0j5xjhl',
		category: 'BIPOC',

		image: 'bipoc',
		order: 1,
		tag: 'bipoc',
	},
	{
		id: 'clienra1i0001pexbc72b9hyj',
		category: 'Disabled',

		image: 'disabled',
		tag: 'disabled',
		order: 2,
	},
	{
		id: 'clienra1i0002pexbm17yqg2d',
		category: 'Elder',

		image: 'elder',
		tag: 'elder',
		order: 4,
	},
	{
		id: 'clienra1i0003pexbvo2gu720',
		category: 'Immigrant',

		image: 'immigrant',
		tag: 'immigrant',
		order: 3,
	},
	{
		id: 'clienra1i0004pexbkht4nc39',
		category: 'Transmasc/Nonbinary',

		image: 'transmasc',
		tag: 'transmasc-nonbinary',
		order: 7,
	},
	{
		id: 'clienra1i0005pexby9upd67c',
		category: 'Queer',

		image: 'queer',
		order: 5,
		tag: 'queer',
	},
	{
		id: 'clienra1i0006pexbks2nzu97',
		category: 'Trans man',

		image: 'transman',
		tag: 'transman',
		order: 6,
	},
]
