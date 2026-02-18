import Crowdin from '@crowdin/crowdin-api-client'

import { prisma } from '~/server/db'

// Configuration
const PROJECT_ID = 14
const FILE_NAME = 'new-submissions.json'
const CROWDIN_TOKEN = process.env.CROWDIN_API
const ORGANIZATION_DOMAIN = 'inreach'

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
			this._client = new CrowdinConstructor({ token: CROWDIN_TOKEN, organization: ORGANIZATION_DOMAIN })
		}
		return this._client
	}

	async getPreview(storyId: string) {
		const story = await prisma.story.findUnique({
			where: { id: storyId },
		})

		if (!story) throw new Error(`Story with ID ${storyId} not found`)

		const [translationsES, translationsFR] = await Promise.all([
			this.fetchTranslations('es'),
			this.fetchTranslations('fr'),
		])

		return {
			story,
			crowdin: {
				es: {
					response1: translationsES[`${storyId}_response1`] || translationsES[`${storyId}.response1`] || '',
					response2: translationsES[`${storyId}_response2`] || translationsES[`${storyId}.response2`] || '',
				},
				fr: {
					response1: translationsFR[`${storyId}_response1`] || translationsFR[`${storyId}.response1`] || '',
					response2: translationsFR[`${storyId}_response2`] || translationsFR[`${storyId}.response2`] || '',
				},
			},
		}
	}

	async publishStory(storyId: string) {
		const story = await prisma.story.findUnique({
			where: { id: storyId },
		})

		if (!story) throw new Error(`Story with ID ${storyId} not found`)

		const [translationsES, translationsFR] = await Promise.all([
			this.fetchTranslations('es'),
			this.fetchTranslations('fr'),
		])

		const response1ES = translationsES[`${storyId}_response1`] || translationsES[`${storyId}.response1`]
		const response2ES = translationsES[`${storyId}_response2`] || translationsES[`${storyId}.response2`]
		const response1FR = translationsFR[`${storyId}_response1`] || translationsFR[`${storyId}.response1`]
		const response2FR = translationsFR[`${storyId}_response2`] || translationsFR[`${storyId}.response2`]

		const updatedStory = await prisma.story.update({
			where: { id: storyId },
			data: {
				published: true,
				textToxicity: 0,
				response1ES: response1ES || null,
				response2ES: response2ES || null,
				response1FR: response1FR || null,
				response2FR: response2FR || null,
			},
			include: { categories: { include: { category: true } } },
		})

		return updatedStory
	}

	private async fetchTranslations(targetLanguageId = 'es'): Promise<Record<string, string>> {
		try {
			/** Fix: 'SourceFiles' only refers to a type. We use the Response types directly from the client methods. */
			const files = await this.client.sourceFilesApi.listProjectFiles(PROJECT_ID)

			// We use 'as SourceFiles.File' if we need to narrow, but find() works on the raw data
			const targetFile = files.data.find((f) => f.data.name === FILE_NAME)

			if (!targetFile) throw new Error(`Crowdin file ${FILE_NAME} not found`)

			const downloadLink = await this.client.translationsApi.buildProjectFileTranslation(
				PROJECT_ID,
				targetFile.data.id,
				{ targetLanguageId }
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
