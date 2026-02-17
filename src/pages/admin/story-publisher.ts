import crowdin from '@crowdin/crowdin-api-client'

import { prisma } from '~/server/db'

// Configuration
const PROJECT_ID = 14 // TransMasc Project ID
const FILE_NAME = 'new-submissions.json'
const CROWDIN_TOKEN = process.env.CROWDIN_PERSONAL_TOKEN

if (!CROWDIN_TOKEN) {
	console.warn('Missing CROWDIN_PERSONAL_TOKEN env variable')
}

// Initialize Crowdin
// @ts-expect-error - library import quirk
const CrowdinApi = crowdin.default || crowdin

export class StoryPublisher {
	private _client: any = null

	private get client() {
		if (!this._client) {
			this._client = new CrowdinApi({ token: CROWDIN_TOKEN || '' })
		}
		return this._client
	}

	/**
	 * Fetches the story and its pending translations for review.
	 * Does NOT update the database.
	 */
	async getPreview(storyId: string) {
		const story = await prisma.story.findUnique({
			where: { id: storyId },
		})

		if (!story) throw new Error(`Story with ID ${storyId} not found`)

		// Fetch live translations from Crowdin
		const translations = await this.fetchTranslations()

		return {
			story,
			crowdin: {
				// Try both naming conventions just in case
				response1: translations[`${storyId}_response1`] || translations[`${storyId}.response1`] || '',
				response2: translations[`${storyId}_response2`] || translations[`${storyId}.response2`] || '',
			},
		}
	}

	/**
	 * Publishes a story by fetching translations from Crowdin and updating the DB.
	 */
	async publishStory(storyId: string) {
		// 1. Verify Story Exists
		const story = await prisma.story.findUnique({
			where: { id: storyId },
		})

		if (!story) {
			throw new Error(`Story with ID ${storyId} not found`)
		}

		// 2. Fetch Translations
		const translations = await this.fetchTranslations()

		// 3. Extract specific keys for this story
		// Logic assumes keys are stored as "{storyId}_response1"
		const response1ES = translations[`${storyId}_response1`] || translations[`${storyId}.response1`]
		const response2ES = translations[`${storyId}_response2`] || translations[`${storyId}.response2`]

		if (!response1ES && !response2ES) {
			console.warn(`No translations found for story ${storyId} in ${FILE_NAME}`)
		}

		// 4. Update Database
		const updatedStory = await prisma.story.update({
			where: { id: storyId },
			data: {
				published: true,
				textToxicity: 0, // 0 + true = Reviewed and Published
				response1ES: response1ES || null,
				response2ES: response2ES || null,
			},
		})

		return updatedStory
	}

	private async fetchTranslations(): Promise<Record<string, string>> {
		try {
			const files = await this.client.sourceFilesApi.listProjectFiles(PROJECT_ID)
			const targetFile = files.data.find((f: any) => f.data.name === FILE_NAME)

			if (!targetFile) throw new Error(`Crowdin file ${FILE_NAME} not found`)

			const downloadLink = await this.client.translationsApi.buildProjectFileTranslation(PROJECT_ID, targetFile.data.id, { targetLanguageId: 'es' })
			const response = await fetch(downloadLink.data.url)
			return (await response.json()) as Record<string, string>
		} catch (error) {
			console.error('Crowdin Fetch Error:', error)
			throw new Error('Failed to retrieve translations from Crowdin')
		}
	}
}

export const storyPublisher = new StoryPublisher()
