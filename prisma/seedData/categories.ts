import { type Prisma } from '@prisma/client'

export const categories: Prisma.StoryCategoryCreateManyInput[] = [
	{ categoryEN: 'BIPOC', categoryES: 'BIPOC' },
	{ categoryEN: 'Disabled', categoryES: 'Con discapacidad' },
	{ categoryEN: 'Elder', categoryES: 'Persona mayor' },
	{ categoryEN: 'Immigrant', categoryES: 'Inmigrante' },
	{ categoryEN: 'Transmasc/Nonbinary', categoryES: 'Transmasculino/Nonbinario' },
	{ categoryEN: 'Queer', categoryES: 'Queer' },
	{ categoryEN: 'Trans man', categoryES: 'Hombre trans' },
]
