import { type Prisma } from '@prisma/client'

export const pronouns: Prisma.PronounsCreateManyInput[] = [
	{ id: 'clienra200007pexbweivoffq', pronouns: 'They/Them/Theirs', tag: 'they' },
	{ id: 'clienra200008pexbpobaxztr', pronouns: 'He/Him/His', pronounsES: 'Él', tag: 'he' },
	{
		id: 'clienra200009pexb5wyo4bkt',
		pronouns: 'Any pronouns',

		tag: 'any',
	},
	{ id: 'clienra20000apexb4zhmhq3d', pronouns: 'No pronouns', tag: 'none' },
]
