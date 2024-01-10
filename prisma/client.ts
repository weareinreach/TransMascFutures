/* eslint-disable turbo/no-undeclared-env-vars */
import { Pool } from '@neondatabase/serverless'
import { PrismaNeon } from '@prisma/adapter-neon'
import { PrismaClient } from '@prisma/client/edge'

declare global {
	// eslint-disable-next-line no-var
	var prisma: PrismaClient | undefined
}
const createClient = () => {
	if (process.env.VERCEL_ENV) {
		const pool = new Pool({ connectionString: process.env.POSTGRES_PRISMA_URL })
		const adapter = new PrismaNeon(pool)
		return new PrismaClient({
			adapter,
			log:
				process.env.NODE_ENV === 'development' && process.env.PRISMA_DEBUG
					? ['query', 'error', 'warn']
					: ['error'],
		})
	} else {
		return new PrismaClient()
	}
}
export const prisma = global.prisma || createClient()
// new PrismaClient({
// 	log:
// 		process.env.NODE_ENV === 'development' && process.env.PRISMA_DEBUG
// 			? ['query', 'error', 'warn']
// 			: ['error'],
// })

if (process.env.NODE_ENV !== 'production') {
	global.prisma = prisma
}
