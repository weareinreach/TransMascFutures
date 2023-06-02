import { type Prisma } from '@prisma/client'

export const categories: Prisma.StoryCategoryCreateManyInput[] = [
	{ id: 'clienra1i0000pexbs0j5xjhl', categoryEN: 'BIPOC', categoryES: 'BIPOC' },
	{ id: 'clienra1i0001pexbc72b9hyj', categoryEN: 'Disabled', categoryES: 'Con discapacidad' },
	{ id: 'clienra1i0002pexbm17yqg2d', categoryEN: 'Elder', categoryES: 'Persona mayor' },
	{ id: 'clienra1i0003pexbvo2gu720', categoryEN: 'Immigrant', categoryES: 'Inmigrante' },
	{
		id: 'clienra1i0004pexbkht4nc39',
		categoryEN: 'Transmasc/Nonbinary',
		categoryES: 'Transmasculino/Nonbinario',
	},
	{ id: 'clienra1i0005pexby9upd67c', categoryEN: 'Queer', categoryES: 'Queer' },
	{ id: 'clienra1i0006pexbks2nzu97', categoryEN: 'Trans man', categoryES: 'Hombre trans' },
]
