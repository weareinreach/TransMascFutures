import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const categories = ['queer', 'bipoc', 'disabled']

async function main() {
	const defaultImage = await prisma.defaultImage.create({
		data: {
			description: 'default',
			image: '/assets/tmf-logo-sw-color.png',
		},
	})

	while ((await prisma.story.findMany()).length < 20) {
		const categoryName = categories[Math.floor(Math.random() * categories.length)]
		const category = await prisma.storyCategory.findFirst({ where: { category: categoryName } })
		const hasDefaultImage = faker.datatype.number(100) % 3
		const connectDefaultImage = { defaultImage: {} }
		if (hasDefaultImage % 2 === 0) connectDefaultImage.defaultImage = { connect: { id: defaultImage.id } }

		if (typeof categoryName === 'string') {
			await prisma.story.create({
				data: {
					name: faker.name.firstName(),
					pronouns: 'Cat/Kitten',
					birthYear: faker.datatype.number({ min: 1, max: 20 }),
					storyJoy: faker.lorem.sentences(6),
					keyJoy: '',
					storyAccess: faker.lorem.sentences(3),
					keyAccess: '',
					image: hasDefaultImage === 0 ? undefined : 'http://placekitten.com/g/480/355',
					defaultImage: connectDefaultImage.defaultImage,
					published: true,
					categories: {
						create: {
							category: {
								connectOrCreate: {
									where: {
										id: (category && category.id) || 'test',
									},
									create: {
										category: categoryName,
										categoryKey: categoryName,
									},
								},
							},
						},
					},
				},
			})
		}
	}
}

main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async (e) => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})
