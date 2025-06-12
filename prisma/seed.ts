/* eslint-disable import/no-unused-modules */

import { PrismaClient } from '@prisma/client'

import fs from 'fs'
import path from 'path'

import { categories } from './seedData/categories'
import { partnerData } from './seedData/partners'
import { pronouns } from './seedData/pronouns'

const prisma = new PrismaClient()

async function main() {
	console.log('Starting seeding process...')

	// --- Update Categories ---
	for (const category of categories) {
		await prisma.storyCategory.upsert({
			where: { id: category.id },
			update: {
				categoryEN: category.categoryEN,
				categoryES: category.categoryES,
				categoryFR: category.categoryFR,
				image: category.image,
				order: category.order,
				imageAltEN: category.imageAltEN,
				imageAltES: category.imageAltES,
				imageAltFR: category.imageAltFR,
			},
			create: category,
		})
	}
	console.log(`Categories updated/created.`)

	// --- Update Pronouns ---
	for (const pronoun of pronouns) {
		await prisma.pronouns.upsert({
			where: { id: pronoun.id },
			update: {
				pronounsEN: pronoun.pronounsEN,
				pronounsES: pronoun.pronounsES,
				pronounsFR: pronoun.pronounsFR,
			},
			create: pronoun,
		})
	}
	console.log(`Pronoun records updated/created.`)

	// --- Partner data (can remain createMany if you just add new ones) ---
	const partnerResult = await prisma.partnerOrg.createMany({ data: partnerData, skipDuplicates: true })
	console.log(`Partner records created: ${partnerResult.count} (skipped existing)`)

	const output: Record<string, unknown> = {
		categories: await prisma.storyCategory.findMany(),
		pronouns: await prisma.pronouns.findMany(),
		partners: await prisma.partnerOrg.findMany(),
	}

	if (fs.existsSync(path.resolve(__dirname, './seedData/stories.ts'))) {
		const storiesModule = await import('./seedData/stories')
		// For simplicity, keeping createMany as is if stories are truly only created once or new
		const storiesResult = await prisma.story.createMany({ data: storiesModule.stories, skipDuplicates: true })
		console.log(`Stories created: ${storiesResult.count} (skipped existing)`)

		const linkCategories = await prisma.storyToCategory.createMany({
			data: storiesModule.links.categories,
			skipDuplicates: true,
		})
		const linkPronouns = await prisma.pronounsToStory.createMany({
			data: storiesModule.links.pronouns,
			skipDuplicates: true,
		})
		console.log(`Links -> categories: ${linkCategories.count}, pronouns: ${linkPronouns.count}`)
		output.storiesResult = await prisma.story.findMany({ select: { id: true, name: true } })
	}

	fs.writeFileSync(path.resolve(__dirname, 'seedresult.json'), JSON.stringify(output, null, 2))
	console.log('Seeding process complete. Check seedresult.json')
}

main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async (e) => {
		console.error('Seeding failed:', e)
		await prisma.$disconnect()
		process.exit(1)
	})
