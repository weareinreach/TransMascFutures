/* eslint-disable @typescript-eslint/ban-ts-comment, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-return */
// @ts-nocheck
import { createId } from '@paralleldrive/cuid2'

import { prisma } from '~db/client'
import { type ListrJob } from '~db/dataMigrationRunner'
import { type JobDef, jobPostRunner, jobPreRunner } from '~db/jobPreRun'

/** Define the job metadata here. */
const jobDef: JobDef = {
	jobId: '2023-06-27_add-story',
	title: 'Add story',
	createdBy: 'Joe Karow',
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
export const job20230627 = {
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
		const updateTag = await prisma.storyCategory.update({
			where: { tag: 'transmasc-nonbinary' },
			data: { tag: 'transmasc' },
		})
		task.output = `Categories updated: ${updateTag.categoryEN}`

		const storyId = createId()

		const story = await prisma.story.create({
			data: {
				id: storyId,
				name: 'Tony Z',
				response1EN:
					'I first saw my future as a trans man when watching videos of a Greek composer named "Yianni" in the 1990s. I liked the way Yianni dressed and I wanted to be like him when I grew up. As the years went by, I also looked to the trans men I saw featured in OP Magazine as role models for my transition.',
				response2EN:
					'The old trans male magazine called "OP Magazine" along with  YouTube videos featuring trans men who chronicled their transitions.',
				response1ES:
					'Vi por primera vez mi futuro como hombre trans cuando vi vídeos de un compositor griego llamado «Yianni» en la década de 1990. Me gustaba la forma en que se vestía Yianni y quería ser como él cuando fuera grande. Con el paso de los años, también ví a los hombres trans que vi en la revista OP como modelos a seguir para mi transición.',
				response2ES:
					'La antigua revista para hombres trans llamada «OP Magazine» junto con videos de YouTube en los que aparecían hombres trans que narraban sus transiciones.',
				published: true,
				categories: {
					create: [
						{ category: { connect: { tag: 'bipoc' } } },
						{ category: { connect: { tag: 'transman' } } },
					],
				},
				pronouns: {
					create: {
						pronoun: { connect: { id: 'clienra200008pexbpobaxztr' } },
					},
				},
			},
		})

		task.output = `Story created: ${story.name}`

		/**
		 * DO NOT REMOVE BELOW
		 *
		 * This writes a record to the DB to register that this migration has run successfully.
		 */
		await jobPostRunner(jobDef)
	},
} satisfies ListrJob
