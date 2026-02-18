/* eslint-disable @typescript-eslint/ban-ts-comment, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-return */
// @ts-nocheck
import { prisma } from '~db/client'
import { type ListrJob } from '~db/dataMigrationRunner'
import { type JobDef, jobPostRunner, jobPreRunner } from '~db/jobPreRun'

/** Define the job metadata here. */
const jobDef: JobDef = {
	jobId: '2023-07-20_add-stories',
	title: 'Add stories',
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
export const job20230720 = {
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

		const stories = await prisma.story.createMany({
			data: [
				{
					id: 'cljf9m3w70001mi0dv57ttgnh',
					name: 'Ash',
					response1EN:
						'In 2015, I met someone who was in the process of transitioning. He had just started, and answered a lot of the questions I had. I had questioned my gender before that, and was already out as nonbinary, but once I met my friend, I asked "Wow I can do that too? I can be who I really am on the inside?" In 2017, I re-came out as a trans man, started transitioning, and feeling more comfortable in my body. This is when I could see my future as a trans man. This is when I realized "I don\'t have to live as the wrong gender anymore".',
					response2EN:
						'I have been privileged enough to live near and have access to gender affirming care. I have been on testosterone for some years now, and have had top surgery so far. I am also lucky as all of my documents are changed (name, gender). This helped me tremendously as it affirms my true gender as male. I look forward to continuing my transition and create even more trans joy in the future.',
					response1ES:
						'En 2015, conocí a alguien que estaba en proceso de transición. Acababa de empezar y respondió a muchas de las preguntas que tenía. Había cuestionado mi género antes de eso, y ya había declarado que era no binario, pero una vez que conocí a mi amigue, me pregunté: «Vaya, ¿yo también puedo hacer eso? ¿Puedo ser quien realmente soy por dentro?». En 2017, volví a declararme un hombre trans, empecé a hacer la transición y a sentirme más cómodo con mi cuerpo. Fue entonces cuando pude ver mi futuro como hombre trans. Fue entonces cuando me di cuenta de que «ya no tengo que vivir como el género equivocado».',
					response2ES:
						'He tenido el privilegio de vivir cerca y tener acceso a una atención que afirme mi género. He estado tomando testosterona durante algunos años y me he sometido a una cirugía de mastectomía. También tengo suerte porque todos mis documentos han sido cambiados (nombre, género). Esto me ayudó enormemente, ya que afirma mi verdadero género como hombre. Espero continuar mi transición y crear aún más alegría trans en el futuro.',
					published: true,
				},
				{
					id: 'cljlk17lp0001ia0dm9jc4azz',
					name: 'Riley',
					published: true,
					response1EN:
						'When I started joining online transmasc spaces, I started seeing these older transmascs/trans men in their forties, fifties, sixties — there was one man who had started T at 63, I think, and it brought tears to my eyes to know I could grow up to be the old man I dreamed of.',
					response2EN:
						'Social media, mostly, but having medical resources specifically for trans men have also helped immensely. I like participating in medical studies just for the sake of solidifying science and medical practice in regards to transmasc folks.',

					response1ES:
						'Cuando comencé a unirme a espacios transmasc en línea, comencé a ver a transmasc/hombres trans mayores de cuarenta, cincuenta y sesenta años; había un hombre que había comenzado T a los 63, creo, y se me llenaron los ojos de lágrimas al saber que podía crecer para ser el anciano con el que soñé.',
					response2ES:
						'Las redes sociales, en su mayoría, pero tener recursos médicos específicamente para hombres trans también ha sido de gran ayuda. Me gusta participar en estudios médicos solo por el bien de solidificar la ciencia y la práctica médica con respecto a la gente transmasc.',
				},
			],
		})
		const categories = await prisma.storyToCategory.createMany({
			data: [
				{ storyId: 'cljf9m3w70001mi0dv57ttgnh', categoryId: 'clienra1i0006pexbks2nzu97' },
				{ storyId: 'cljf9m3w70001mi0dv57ttgnh', categoryId: 'clienra1i0005pexby9upd67c' },
				{ storyId: 'cljlk17lp0001ia0dm9jc4azz', categoryId: 'clienra1i0006pexbks2nzu97' },
				{ storyId: 'cljlk17lp0001ia0dm9jc4azz', categoryId: 'clienra1i0005pexby9upd67c' },
				{ storyId: 'cljlk17lp0001ia0dm9jc4azz', categoryId: 'clienra1i0004pexbkht4nc39' },
				{ storyId: 'cljlk17lp0001ia0dm9jc4azz', categoryId: 'clienra1i0001pexbc72b9hyj' },
			],
		})
		const pronouns = await prisma.pronounsToStory.createMany({
			data: [
				{ storyId: 'cljf9m3w70001mi0dv57ttgnh', pronounId: 'clienra200008pexbpobaxztr' },
				{ storyId: 'cljf9m3w70001mi0dv57ttgnh', pronounId: 'clienra200007pexbweivoffq' },
				{ storyId: 'cljlk17lp0001ia0dm9jc4azz', pronounId: 'clienra200008pexbpobaxztr' },
				{ storyId: 'cljlk17lp0001ia0dm9jc4azz', pronounId: 'clienra200007pexbweivoffq' },
			],
		})

		task.output = `Stories added: ${stories.count} | Categories linked: ${categories.count} | Pronouns linked: ${pronouns.count}`

		/**
		 * DO NOT REMOVE BELOW
		 *
		 * This writes a record to the DB to register that this migration has run successfully.
		 */
		await jobPostRunner(jobDef)
	},
} satisfies ListrJob
