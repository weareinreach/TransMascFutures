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

import path from 'path';

import { type ListrJob } from '~db/dataMigrationRunner'
import { type JobDef, jobPostRunner, jobPreRunner } from '~db/jobPreRun'

/** don't change this value, but DO make the filename unique **/
const filename = path.basename(__filename, '.ts'); // Get the filename without the extension

/** Define the job metadata here. */
const storyId = 'cm38fiobr00014uvyzvrlr5nu' // Replace with actual ID if the story already exists in the story table
const storySubmissionId = 'cm38fiob100004uvyp2v1yqbl' // Replace with actual ID from the StorySubmission table
const description = `update story for ${storySubmissionId}` //optional, replace with actual description if this is something unique
const createdBy = 'Diana Garbarino' // Replace with actual user

// Translated value from the new_submission file in CrowdIn - response1
const response1ES = `Cuando me presentaron por primera vez la posibilidad de que las personas no siempre son cisgénero, estaba absolutamente confundide más que cualquier otra cosa. Las personas trans a mi alrededor describían cómo experimentaban el género, y yo lo meditaba durante mucho tiempo: ¿cómo podrían ser trans si describieron sentimientos exactamente como yo, y yo no era trans? ¿No es así como se sentía todo el mundo?

Estaba hablando de esto con mi primera terapeuta queer en ese momento, y ella me invitó a considerar: ¿cómo sabía qué a género pertenecía?

De repente, las cosas cambiaron para mí. Las personas trans ya no eran otras personas que vivían vidas separadas, completamente distintas de la mía; ¡yo mismo era una persona trans!

Al principio, esto fue aterrador, para ser honesto. Me habían dado toda una hoja de ruta a seguir para mi vida como persona asignada como mujer al nacer, y de repente me di cuenta de que muchas de esas cosas no eran garantías; de hecho, eran en realidad completamente opcionales.

Esto me siguió sucediendo a medida que me involucraba más en mi comunidad trans local. Todas las reglas de mi vida a las que me había aferrado durante tanto tiempo comenzaron a parecerme menos absolutas, menos restrictivas y más como algo que podía ELEGIR aceptar o dejar en función de lo que quisiera estructurar en mi vida.
`
// Translated value from the new_submission file in CrowdIn - response2
const response2ES = `Puede parecer que esto está completamente fuera del alcance de muchas personas, especialmente dependiendo de dónde te encuentres. Pero, ¿estar en comunidad con otras personas transmasculinas en persona, tener conversaciones uno a uno con personas que honestamente y verdaderamente te entiendan de una manera que la mayoría de la gente no podría? Eso afirma la vida. Eso salva vidas. No tenía idea de lo solo y roto que me sentía hasta que miré a alguien que estaba innegablemente completo y quería decirme esas mismas palabras sobre sí mismo, que estaba viviendo una vida tan similar a la mía y, sin embargo, se sentía tan notablemente solo.
Si la comunidad en persona no es viable o segura (por razones de discapacidad, razones de seguridad física, razones financieras, cualquier otra razón), encontrar apoyo virtual puede ser igual de valioso. Hay servidores de Discord, hay grupos de Facebook (si eres una persona mayor como yo y todavía usas Facebook, de todos modos). Te prometo que hay lugares donde tu presencia es deseada, incluso si aún no lo saben. Aunque tú tampoco lo sepas.

El armario puede ser más seguro, pero eso no evita que sea traicioneramente solitario al mismo tiempo. Encontrar una comunidad en línea puede ser como tener un pequeño trozo de Narnia al que escapar mientras nos sentamos entre las bolas de naftalina y el polvo que pasan sus días en el armario con nosotros. `


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
export const jobId = {
	title: `${new Date().toISOString().split('T')[0]}_${jobDef.storySubmissionId}`,
	task: async (_ctx, task) => {
		/**
		 * Do not edit this part
		 *
		 * This ensures that jobs are only run once
		 */
		console.log('Starting jobPreRunner...');
		if (await jobPreRunner(jobDef, task)) {
			return task.skip(`${jobDef.storySubmissionId} - Migration has already been run.`)
		}

		const { storyId, storySubmissionId, createdBy } = jobDef

		// Validate required fields
		if (!storySubmissionId || !createdBy) {
			throw new Error('Both storySubmissionId and createdBy are required.')
		}

		// Get the StorySubmission entry by ID
		console.log('Fetching StorySubmission for ID:', storySubmissionId);
		const prisma = new PrismaClient() // Fresh Prisma client instance
		let storySubmission = null;

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
	console.log('Updating story with the following data:');
	console.log(`Story ID: ${storyId}`);
	console.log(`Response1ES: ${response1ES}`);
	console.log(`Response2ES: ${response2ES}`);
	console.log(`Categories: ${JSON.stringify(categories)}`);
	const pronounIds = pronouns.map((pronoun) => pronoun.id);
console.log('Resolved Pronoun IDs:', pronounIds); // Log only IDs

	try {
		// Update the existing story
		await prisma.story.update({
			where: { id: storyId },
			data: {
				response1ES,
				response2ES,
			},
		});

		console.log(`Story with ID '${storyId}' updated successfully.`);
	} catch (error) {
		console.error('Error updating story:', error);
	}
} else {
	// Create a new story
	const newStoryId = createId();

	// Log before creating the new story
	console.log('Creating new story with the following data:');
	console.log(`New Story ID: ${newStoryId}`);
	console.log(`Name: ${responses.q4}`);
	console.log(`Response1EN: ${response1EN}`);
	console.log(`Response2EN: ${response2EN}`);
	console.log(`Categories: ${JSON.stringify(categories)}`);
		const pronounIds = pronouns.map((pronoun) => pronoun.id);
console.log('Resolved Pronoun IDs:', pronounIds); // Log only IDs

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
		});

		console.log(`New story created with ID '${newStoryId}'.`);
	} catch (error) {
		console.error('Error creating new story:', error);
	}
}


		/**
		 * DO NOT REMOVE BELOW
		 *
		 * This writes a record to the DB to register that this migration has run successfully.
		 */
		await jobPostRunner(jobDef, prisma)
		await prisma.$disconnect(); // Disconnect when you're truly done

	},
} satisfies ListrJob
