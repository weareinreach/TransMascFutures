/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { PrismaClient } from '@prisma/client'
import { ListrTaskEventType } from 'listr2'
import { DateTime } from 'luxon'

import fs from 'fs'
import path from 'path'

import { type PassedTask } from './dataMigrationRunner'

// import { prisma } from '~db/client'
const prisma = new PrismaClient()

const getTimestamp = () => DateTime.now().toLocaleString(DateTime.TIME_24_WITH_SECONDS).replaceAll(':', '.')

const logFile = (file: string, output: string) => {
	const timestamp = DateTime.now().toFormat('yyyy-MM-dd HH:mm:ss')
	const outFile = path.resolve(__dirname, './migration-logs/', file)
	const formattedOutput = `[${timestamp}] ${output}\n`
	fs.writeFileSync(outFile, formattedOutput, { flag: 'a' })
}

export const createLogger = (task: PassedTask, jobId: string) => {
	console.log('create logger')
	const timestamp = getTimestamp()
	const logFilename = `${jobId}_${timestamp}.log`
	task.task.on(ListrTaskEventType.OUTPUT, (output: string) => logFile(logFilename, output))
}

// Database connection test function
const testDatabaseConnection = async () => {
	try {
		// Log the database connection string (excluding sensitive parts)
		const connectionString = process.env.POSTGRES_PRISMA_URL

		console.log('Testing database connection with connection string:', connectionString)

		await prisma.$queryRaw`SELECT 1`
		console.log('Database connection successful')
	} catch (err) {
		console.error('Error connecting to the database:', err)
		console.error('Error details:', JSON.stringify(err, null, 2)) // Detailed error log
		throw new Error('Database connection failed')
	}
}

export const jobPreRunner = async (jobDef: JobDef, task: PassedTask) => {
	try {
		await testDatabaseConnection()

		console.log('Checking if migration has already been run for jobId:', jobDef.jobId) // Log the jobId

		const exists = await prisma.dataMigration.findUnique({
			where: { jobId: String(jobDef.jobId) }, // Ensure jobId is a string
			select: { id: true },
		})

		if (exists?.id) {
			console.log('Migration already exists with id:', exists.id) // Log the id if found
			return true
		}

		createLogger(task, jobDef.jobId)
		console.log(jobDef.jobId)
		console.log('Migration not found. Proceeding with job.')
		return false
	} catch (err) {
		console.error('Error in jobPreRunner:', err) // Log any error during the execution
		throw new Error('Error occurred in jobPreRunner, migration skipped.')
	}
}

export const jobPostRunner = async (jobDef: JobDef, prisma: PrismaClient) => {
	try {
		// Construct the job ID correctly
		const { jobId, title, createdBy, description } = jobDef

		// Create the dataMigration entry with required fields
		await prisma.dataMigration.create({
			data: {
				jobId,
				title,
				description,
				createdBy,
			},
		})

		console.log(`Job '${jobId}' recorded successfully.`)
	} catch (err) {
		console.error('Error in jobPostRunner:', err)
		throw err
	}
}

export interface JobDef {
	jobId: string
	storyId?: string
	storySubmissionId: string
	title: string
	description?: string
	createdBy: string
}
