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

// A type for the JSON structure returned by Crowdin, which can be flat or nested.
type CrowdinTranslationFile = Record<string, string | Record<string, string>>

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

		// Helper to extract translation from nested or flat structure
		const getT = (data: CrowdinTranslationFile, field: string, source: string | null): string => {
			let value = ''
			// Try nested structure: { storyId: { field: "value" } }
			const nestedData = data[storyId]
			if (nestedData && typeof nestedData === 'object' && field in nestedData) {
				const val = nestedData[field]
				if (typeof val === 'string') value = val
			} else {
				// Try flat structure: { "storyId.field": "value" }
				const flatData = data[`${storyId}.${field}`]
				if (typeof flatData === 'string') value = flatData
			}

			// If the translation matches the source (English), treat it as missing/untranslated
			if (source && value === source) return ''
			return value
		}

		return {
			story,
			crowdin: {
				es: {
					response1: getT(translationsES, 'response1', story.response1EN),
					response2: getT(translationsES, 'response2', story.response2EN),
				},
				fr: {
					response1: getT(translationsFR, 'response1', story.response1EN),
					response2: getT(translationsFR, 'response2', story.response2EN),
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

		const getT = (data: CrowdinTranslationFile, field: string, source: string | null): string | null => {
			let value: string | null = null
			// Try nested structure: { storyId: { field: "value" } }
			const nestedData = data[storyId]
			if (nestedData && typeof nestedData === 'object' && field in nestedData) {
				const val = nestedData[field]
				if (typeof val === 'string') value = val
			} else {
				// Try flat structure: { "storyId.field": "value" }
				const flatData = data[`${storyId}.${field}`]
				if (typeof flatData === 'string') {
					value = flatData
				} else {
					// Try legacy flat structure: { "storyId_field": "value" }
					const legacyFlatData = data[`${storyId}_${field}`]
					if (typeof legacyFlatData === 'string') {
						value = legacyFlatData
					}
				}
			}

			if (source && value === source) return null
			return value
		}

		const response1ES = getT(translationsES, 'response1', story.response1EN)
		const response2ES = getT(translationsES, 'response2', story.response2EN)
		const response1FR = getT(translationsFR, 'response1', story.response1EN)
		const response2FR = getT(translationsFR, 'response2', story.response2EN)

		const updatedStory = await prisma.story.update({
			where: { id: storyId },
			data: {
				published: true,
				textToxicity: 0,
				response1ES: response1ES ?? null,
				response2ES: response2ES ?? null,
				response1FR: response1FR ?? null,
				response2FR: response2FR ?? null,
			},
			include: { categories: { include: { category: true } } },
		})

		return updatedStory
	}

	private async fetchTranslations(targetLanguageId = 'es'): Promise<CrowdinTranslationFile> {
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
			const data = await response.json()
			return data as CrowdinTranslationFile
		} catch (error) {
			console.error('Crowdin Fetch Error:', error)
			throw new Error('Failed to retrieve translations from Crowdin')
		}
	}
}

export const storyPublisher = new StoryPublisher()
