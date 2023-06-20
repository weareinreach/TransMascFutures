import { createId } from '@paralleldrive/cuid2'
import { type Prisma } from '@prisma/client'

import fs from 'fs'
import path from 'path'

import stories from './in.json'

const categoryMap = new Map([
	['bipoc', 'clienra1i0000pexbs0j5xjhl'],
	['immigrant', 'clienra1i0003pexbvo2gu720'],
	['queer', 'clienra1i0005pexby9upd67c'],
	['disabled', 'clienra1i0001pexbc72b9hyj'],
	['elder', 'clienra1i0002pexbm17yqg2d'],
	['transman', 'clienra1i0006pexbks2nzu97'],
	['transmasc', 'clienra1i0004pexbkht4nc39'],
])

const pronounMap = new Map([
	['they', 'clienra200007pexbweivoffq'],
	['he', 'clienra200008pexbpobaxztr'],
	['any', 'clienra200009pexb5wyo4bkt'],
	['none', 'clienra20000apexb4zhmhq3d'],
	['ze', 'clj4e08hd0000pen90lv874yq'],
])

const storyToCategory: Prisma.StoryToCategoryCreateManyInput[] = []
const storyToPronoun: Prisma.PronounsToStoryCreateManyInput[] = []

const storiesOut: Prisma.StoryCreateManyInput[] = stories.map(({ q4, q5, q7, q8, q9 }) => {
	const id = createId()
	q5.split(',').forEach((category) => {
		const categoryId = categoryMap.get(category)
		if (categoryId) storyToCategory.push({ categoryId, storyId: id })
	})
	q7.split(',').forEach((pronoun) => {
		const pronounId = pronounMap.get(pronoun)
		if (pronounId) storyToPronoun.push({ pronounId, storyId: id })
	})

	return {
		id,
		name: q4,
		response1EN: q8,
		response2EN: q9,
	}
})

fs.writeFileSync(path.resolve(__dirname, 'stories.json'), JSON.stringify(storiesOut))
fs.writeFileSync(path.resolve(__dirname, 'sTc.json'), JSON.stringify(storyToCategory))
fs.writeFileSync(path.resolve(__dirname, 'sTp.json'), JSON.stringify(storyToPronoun))
