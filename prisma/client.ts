/* eslint-disable turbo/no-undeclared-env-vars */
import { Pool } from '@neondatabase/serverless'
import { PrismaNeon } from '@prisma/adapter-neon'
import { PrismaClient } from '@prisma/client'

declare global {
	// eslint-disable-next-line no-var
	var prisma: PrismaClient | undefined
}
const connectionString = `${process.env.POSTGRES_PRISMA_URL}`
const pool = new Pool({ connectionString })
const adapter = new PrismaNeon(pool)
export const prisma =
	global.prisma ||
	new PrismaClient({
		adapter,
		log:
			process.env.NODE_ENV === 'development' && process.env.PRISMA_DEBUG
				? ['query', 'error', 'warn']
				: ['error'],
	})

if (process.env.NODE_ENV !== 'production') {
	global.prisma = prisma
}
