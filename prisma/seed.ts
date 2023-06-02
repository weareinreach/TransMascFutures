/* eslint-disable import/no-unused-modules */

import { PrismaClient } from '@prisma/client'

import fs from 'fs'
import path from 'path'

import { categories } from './seedData/categories'
import { pronouns } from './seedData/pronouns'

const prisma = new PrismaClient()

async function main() {
	const categoryResult = await prisma.storyCategory.createMany({
		data: categories,
		skipDuplicates: true,
	})
	console.log(`Categories created: ${categoryResult.count}`)

	const pronounResult = await prisma.pronouns.createMany({
		data: pronouns,
		skipDuplicates: true,
	})
	console.log(`Pronoun records created: ${pronounResult.count}`)
	const output: Record<string, unknown> = {
		categories: await prisma.storyCategory.findMany(),
		pronouns: await prisma.pronouns.findMany(),
	}

	if (fs.existsSync(path.resolve(__dirname, './seedData/stories.ts'))) {
		const stories = await import('./seedData/stories')
		const storiesResult = await prisma.story.createMany({ data: stories.stories, skipDuplicates: true })
		console.log(`Stories created: ${storiesResult.count}`)
		const linkCategories = await prisma.storyToCategory.createMany({
			data: stories.links.categories,
			skipDuplicates: true,
		})
		const linkPronouns = await prisma.pronounsToStory.createMany({
			data: stories.links.pronouns,
			skipDuplicates: true,
		})
		console.log(`Links -> categories: ${linkCategories.count}, pronouns: ${linkPronouns.count}`)
		output.storiesResult = await prisma.story.findMany({ select: { id: true, name: true } })
	}

	fs.writeFileSync(path.resolve(__dirname, 'seedresult.json'), JSON.stringify(output))
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
