import Crowdin from '@crowdin/crowdin-api-client'

export const crowdin = new Crowdin({
	token: process.env.CROWDIN_API!,
	organization: 'inreach',
})
