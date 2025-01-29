// To use this template,
// Copy the file and make the name of the new filet today's date plus the storysubmission id (i.e. 2023-06-27_cm2m6ae8l0000aik98z887ke6)
// Complete the values under the section for 'Define the job metadate here'
// for Production the data is in the 'vercel' db
// for local the data is in the 'postgres' db
// The *ES values wil be in the new-submission file on CrowdIn - search by the storyId
// test the migration locally by running 'pnpm run db:dataMigrate' from the command line
// (note, you must use local data, if it works, update the data to be that from production)
// save the file, push changes to github, then create a PR
// create a migration file for each story to be added or updated

import { createId } from '@paralleldrive/cuid2'
import { PrismaClient } from '@prisma/client'

import path from 'path'

import { type ListrJob } from '~db/dataMigrationRunner'
import { type JobDef, jobPostRunner, jobPreRunner } from '~db/jobPreRun'

/** Don't change this value, but DO make the filename unique * */
const filename = path.basename(__filename, '.ts') // Get the filename without the extension

/** Define the job metadata here. */
const storyId = 'cm2m6aeaa0001aik97j6vdsms' // Replace with actual ID if the story already exists in the story table
const storySubmissionId = 'cm2m6ae8l0000aik98z887ke6' // Replace with actual ID from the StorySubmission table
const description = `update story for ${storySubmissionId}` //optional, replace with actual description if this is something unique
const createdBy = 'Diana Garbarino' // Replace with actual user

// Translated value from the new_submission file in CrowdIn - response1
const response1ES =
	'Siempre hubo algo dentro de mí que no podía alcanzar o descifrar, lo cual tiene sentido si uno lo ve en retrospectiva porque una vez que llegué a reconocer las distintas formas de identidad fuera de mi hogar, se me abrió un mundo de oportunidades. Mi perspectiva cambió y me volví mucho más optimista y, mientras me empecé a sentir más cómode, sentí esa pasión innata de ser parte de una comunidad, de algo más grande que yo misme. Allí fue cuando supe que estaba destinade a vivir mi vida de manera auténtica como un hombre trans y encontrar gente como yo, a la que pueda apoyar y acompañar y ocupar el espacio que merezco.'

// Translated value from the new_submission file in CrowdIn - response2
const response2ES = 'Planned Parenthood, THEM, HRC, ACLU, etc.'

/** Nothing below this line needs to be touched. */
const jobDef: JobDef = {
	jobId: filename,
	storyId,
	storySubmissionId,
	title: `add story for ${storySubmissionId}`,
	description,
	createdBy,
}

/**
 * Job export - this variable MUST be UNIQUE
 *
 * Use the format `jobYYYYMMDD` and append a letter afterwards if there is already a job with this name.
 *
 * @example `job20230404`
 *
 * @example `job20230404b`
 */
export const job20250128a = {
	title: `${new Date().toISOString().split('T')[0]}_${jobDef.storySubmissionId}`,
	task: async (_ctx, task) => {
		/**
		 * Do not edit this part
		 *
		 * This ensures that jobs are only run once
		 */
		console.log('Starting jobPreRunner...')
		if (await jobPreRunner(jobDef, task)) {
			return task.skip(`${jobDef.storySubmissionId} - Migration has already been run.`)
		}

		const { storyId, storySubmissionId, createdBy } = jobDef

		// Validate required fields
		if (!storySubmissionId || !createdBy) {
			throw new Error('Both storySubmissionId and createdBy are required.')
		}

		// Get the StorySubmission entry by ID
		console.log('Fetching StorySubmission for ID:', storySubmissionId)
		const prisma = new PrismaClient() // Fresh Prisma client instance
		let storySubmission = null

		try {
			storySubmission = await prisma.storySubmission.findUnique({
				where: { id: storySubmissionId },
			})
		} catch (error) {
			console.error('Error fetching StorySubmission:', error)
			throw error
		} finally {
			await prisma.$disconnect() // Ensure disconnection after query
		}

		if (!storySubmission) {
			console.log('No StorySubmission found for ID:', storySubmissionId)
			throw new Error(`No StorySubmission found for ID '${storySubmissionId}'.`)
		}

		// Extract required fields from StorySubmission
		const { responses } = storySubmission
		const categories = Array.isArray(responses.q5) ? responses.q5 : []
		const pronounValues = Array.isArray(responses.q7) ? responses.q7 : []
		const response1EN = responses.q8
		const response2EN = responses.q9

		// Log the values
		console.log('responses:', responses)
		console.log('categories:', categories)
		console.log('pronounValues:', pronounValues)
		console.log('response1EN:', response1EN)
		console.log('response2EN:', response2EN)

		// Get Pronouns only if pronounValues is not empty
		let pronouns = []

		if (pronounValues.length > 0) {
			try {
				pronouns = await prisma.pronouns.findMany({
					where: { tag: { in: pronounValues } },
				})
				console.log('Found pronouns:', pronouns) // Log the pronouns after the query
			} catch (error) {
				console.error('Error fetching pronouns:', error)
			}
		} else {
			console.log('No pronouns to search for (pronounValues is empty).')
		}

		// If no pronouns were found, log a message
		if (pronouns.length === 0 && pronounValues.length > 0) {
			console.log(`No matching Pronouns found for values '${pronounValues.join(', ')}'.`)
			return
		}

		// If updating an existing story
		if (storyId) {
			// Log before updating the story
			console.log('Updating story with the following data:')
			console.log(`Story ID: ${storyId}`)
			console.log(`Response1ES: ${response1ES}`)
			console.log(`Response2ES: ${response2ES}`)
			console.log(`Categories: ${JSON.stringify(categories)}`)
			const pronounIds = pronouns.map((pronoun) => pronoun.id)
			console.log('Resolved Pronoun IDs:', pronounIds) // Log only IDs

			try {
				// Update the existing story
				await prisma.story.update({
					where: { id: storyId },
					data: {
						response1ES,
						response2ES,
						published: true,
					},
				})

				console.log(`Story with ID '${storyId}' updated successfully.`)
			} catch (error) {
				console.error('Error updating story:', error)
			}
		} else {
			// Create a new story
			const newStoryId = createId()

			// Log before creating the new story
			console.log('Creating new story with the following data:')
			console.log(`New Story ID: ${newStoryId}`)
			console.log(`Name: ${responses.q4}`)
			console.log(`Response1EN: ${response1EN}`)
			console.log(`Response2EN: ${response2EN}`)
			console.log(`Categories: ${JSON.stringify(categories)}`)
			const pronounIds = pronouns.map((pronoun) => pronoun.id)
			console.log('Resolved Pronoun IDs:', pronounIds) // Log only IDs

			try {
				await prisma.story.create({
					data: {
						id: newStoryId,
						name: responses.q4, // Use q4 for the story name
						response1EN,
						response2EN,
						published: true,
						categories: {
							create: categories.map((tag: string) => ({
								category: { connect: { tag } },
							})),
						},
						pronouns: {
							create: pronounIds.map((id) => ({
								pronoun: { connect: { id } },
							})),
						},
					},
				})

				console.log(`New story created with ID '${newStoryId}'.`)
			} catch (error) {
				console.error('Error creating new story:', error)
			}
		}

		/**
		 * DO NOT REMOVE BELOW
		 *
		 * This writes a record to the DB to register that this migration has run successfully.
		 */
		await jobPostRunner(jobDef, prisma)
		await prisma.$disconnect() // Disconnect when you're truly done
	},
} satisfies ListrJob
