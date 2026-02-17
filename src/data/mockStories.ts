import { type Story as PrismaStory, type StoryCategory, type StoryToCategory } from '@prisma/client'

type Story = PrismaStory & {
	categories: (StoryToCategory & { category: StoryCategory })[]
}

export const mockStories = [
	{
		id: 'mock-pending',
		name: 'Pending Story (New)',
		response1EN: 'This is a fresh submission waiting for review.',
		response2EN: 'It has not been touched yet (published: false, toxicity: null).',
		response1ES: null,
		response2ES: null,
		response1FR: null,
		response2FR: null,
		published: false,
		textToxicity: null,
		createdAt: new Date(),
		categories: [
			{
				categoryId: 'c1',
				category: { tag: 'transmasc' },
			},
			{
				categoryId: 'c2',
				category: { tag: 'bipoc' },
			},
		],
	},
	{
		id: 'mock-published-legacy',
		name: 'Published Story (Legacy)',
		response1EN: 'This story was published before we started tracking toxicity.',
		response2EN: 'It is live on the site (published: true, toxicity: null).',
		response1ES: 'Historia publicada...',
		response2ES: '...',
		response1FR: null,
		response2FR: null,
		published: true,
		textToxicity: null,
		createdAt: new Date(),
		categories: [
			{
				categoryId: 'c3',
				category: { tag: 'elder' },
			},
		],
	},
	{
		id: 'mock-published-new',
		name: 'Published Story (New)',
		response1EN: 'This story was reviewed and published with the new system.',
		response2EN: 'It is live on the site (published: true, toxicity: 0).',
		response1ES: 'Historia nueva...',
		response2ES: '...',
		response1FR: null,
		response2FR: null,
		published: true,
		textToxicity: 0,
		createdAt: new Date(),
		categories: [
			{
				categoryId: 'c4',
				category: { tag: 'queer' },
			},
			{
				categoryId: 'c5',
				category: { tag: 'disabled' },
			},
		],
	},
	{
		id: 'mock-rejected',
		name: 'Rejected Story',
		response1EN: 'This story was rejected due to spam or toxicity.',
		response2EN: 'It is hidden (published: false, toxicity: 1.0).',
		response1ES: null,
		response2ES: null,
		response1FR: null,
		response2FR: null,
		published: false,
		textToxicity: 1.0,
		createdAt: new Date(),
		categories: [],
	},
	{
		id: 'mock-unpublished',
		name: 'Unpublished Story',
		response1EN: 'This story was published but then taken down (unpublished).',
		response2EN: 'It is not live, but not rejected (published: false, toxicity: 0).',
		response1ES: 'Historia despublicada...',
		response2ES: '...',
		response1FR: null,
		response2FR: null,
		published: false,
		textToxicity: 0,
		createdAt: new Date(),
		categories: [
			{
				categoryId: 'c6',
				category: { tag: 'immigrant' },
			},
		],
	},
] as unknown as Story[]
