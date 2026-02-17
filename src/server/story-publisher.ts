import Crowdin from '@crowdin/crowdin-api-client'

import { prisma } from '~/server/db'

// Configuration
const PROJECT_ID = 14
const FILE_NAME = 'new-submissions.json'
const CROWDIN_TOKEN = process.env.CROWDIN_API

/**
 * Fixes: Unsafe member access .default on an `any` value We cast the import to 'unknown' first to safely
 * check for .default
 */
const CrowdinConstructor =
	typeof Crowdin === 'function' ? Crowdin : (Crowdin as unknown as { default: typeof Crowdin }).default

export class StoryPublisher {
	// Use InstanceType to avoid 'any' and 'redundant-type-constituents'
	private _client: InstanceType<typeof Crowdin> | null = null

	private get client(): InstanceType<typeof Crowdin> {
		if (!this._client) {
			if (!CROWDIN_TOKEN) {
				throw new Error('CROWDIN_API environment variable is not defined')
			}
			this._client = new CrowdinConstructor({ token: CROWDIN_TOKEN })
		}
		return this._client
	}

	async getPreview(storyId: string) {
		const story = await prisma.story.findUnique({
			where: { id: storyId },
		})

		if (!story) throw new Error(`Story with ID ${storyId} not found`)

		const translations = await this.fetchTranslations()

		return {
			story,
			crowdin: {
				response1: translations[`${storyId}_response1`] || translations[`${storyId}.response1`] || '',
				response2: translations[`${storyId}_response2`] || translations[`${storyId}.response2`] || '',
			},
		}
	}

	async publishStory(storyId: string) {
		const story = await prisma.story.findUnique({
			where: { id: storyId },
		})

		if (!story) throw new Error(`Story with ID ${storyId} not found`)

		const translations = await this.fetchTranslations()

		const response1ES = translations[`${storyId}_response1`] || translations[`${storyId}.response1`]
		const response2ES = translations[`${storyId}_response2`] || translations[`${storyId}.response2`]

		const updatedStory = await prisma.story.update({
			where: { id: storyId },
			data: {
				published: true,
				textToxicity: 0,
				response1ES: response1ES || null,
				response2ES: response2ES || null,
			},
		})

		return updatedStory
	}

	private async fetchTranslations(): Promise<Record<string, string>> {
		try {
			/** Fix: 'SourceFiles' only refers to a type. We use the Response types directly from the client methods. */
			const files = await this.client.sourceFilesApi.listProjectFiles(PROJECT_ID)

			// We use 'as SourceFiles.File' if we need to narrow, but find() works on the raw data
			const targetFile = files.data.find((f) => f.data.name === FILE_NAME)

			if (!targetFile) throw new Error(`Crowdin file ${FILE_NAME} not found`)

			const downloadLink = await this.client.translationsApi.buildProjectFileTranslation(
				PROJECT_ID,
				targetFile.data.id,
				{ targetLanguageId: 'es' }
			)

			if (!downloadLink.data.url) {
				throw new Error('Translation build did not return a URL')
			}

			const response = await fetch(downloadLink.data.url)
			return (await response.json()) as Record<string, string>
		} catch (error) {
			console.error('Crowdin Fetch Error:', error)
			throw new Error('Failed to retrieve translations from Crowdin')
		}
	}
}

export const storyPublisher = new StoryPublisher()
