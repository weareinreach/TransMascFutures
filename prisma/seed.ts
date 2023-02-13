import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const categories = ['queer', 'bipoc', 'disabled']

async function main() {
	while ((await prisma.story.findMany()).length < 20) {
		const category = categories[Math.floor(Math.random() * categories.length)]
		if (typeof category === 'string') {
			await prisma.story.create({
				data: {
					name: faker.name.firstName(),
					pronouns: 'Cat/Kitten',
					birthYear: faker.datatype.number({ min: 1, max: 20 }),
					storyJoy: faker.lorem.sentences(6),
					keyJoy: category,
					storyAccess: faker.lorem.sentences(3),
					keyAccess: category,
					image: faker.datatype.number(100) % 3 === 0 ? undefined : 'http://placekitten.com/g/480/355',
					published: true,
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
