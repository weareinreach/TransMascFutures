/* eslint-disable @typescript-eslint/ban-ts-comment, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-return */
// @ts-nocheck
import { prisma } from '~db/client'
import { type ListrJob } from '~db/dataMigrationRunner'
import { type JobDef, jobPostRunner, jobPreRunner } from '~db/jobPreRun'

import storiesToCategories from './sTc.json'
import stories from './stories.json'
import storiesToPronouns from './sTp.json'

/** Define the job metadata here. */
const jobDef: JobDef = {
	jobId: '2023-06-20_add-stories',
	title: 'Add submitted stories',
	createdBy: 'Joe Karow',
	storyId: '',
	storySubmissionId: '',
	description: '',
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
export const job20230620 = {
	title: `${jobDef.jobId} - ${jobDef.title}`,
	task: async (_ctx, task) => {
		/**
		 * Do not edit this part
		 *
		 * This ensures that jobs are only run once
		 */
		if (await jobPreRunner(jobDef, task)) {
			return task.skip(`${jobDef.jobId} - Migration has already been run.`)
		}
		/**
		 * Start defining your data migration from here.
		 *
		 * To log output, use `task.output = 'Message to log'`
		 *
		 * This will be written to `stdout` and to a log file in `/prisma/migration-logs/`
		 */

		// Do stuff

		const storiesAdded = await prisma.story.createMany({ data: stories, skipDuplicates: true })
		const categoryLinks = await prisma.storyToCategory.createMany({
			data: storiesToCategories,
			skipDuplicates: true,
		})
		const pronounLinks = await prisma.pronounsToStory.createMany({
			data: storiesToPronouns,
			skipDuplicates: true,
		})

		task.output = `Stories created: ${storiesAdded.count}`
		task.output = `Categories linked: ${categoryLinks.count}`
		task.output = `Pronouns linked: ${pronounLinks.count}`

		/**
		 * DO NOT REMOVE BELOW
		 *
		 * This writes a record to the DB to register that this migration has run successfully.
		 */
		await jobPostRunner(jobDef, prisma)
	},
} satisfies ListrJob
