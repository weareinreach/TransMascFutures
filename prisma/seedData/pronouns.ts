import { type Prisma } from '@prisma/client'

export const pronouns: Prisma.PronounsCreateManyInput[] = [
	{ pronounsEN: 'They/Them/Theirs', pronounsES: 'Elle' },
	{ pronounsEN: 'He/Him/His', pronounsES: 'Él' },
	{ pronounsEN: 'Any pronouns', pronounsES: 'Cualquier pronombre' },
	{ pronounsEN: 'No pronouns', pronounsES: 'No pronombres' },
]
