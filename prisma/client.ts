/* eslint-disable turbo/no-undeclared-env-vars */
import { neonConfig, Pool } from '@neondatabase/serverless'
import { PrismaNeon } from '@prisma/adapter-neon'
import { PrismaClient } from '@prisma/client'
import { WebSocket } from 'undici'

neonConfig.webSocketConstructor = WebSocket
neonConfig.poolQueryViaFetch = true
// if (!process.env.VERCEL_ENV) {
// neonConfig.wsProxy = (host) => {
// 	console.log('proxying to', host)
// 	// return `${host}:5433/v1`
// 	return host
// }
// neonConfig.fetchEndpoint = (host, port) => {
// 	console.log('proxying to', host, port)
// 	return `http://${host}:5433/v1`
// }
// neonConfig.useSecureWebSocket = false
// neonConfig.pipelineTLS = false
// neonConfig.pipelineConnect = false
// }

declare global {
	// eslint-disable-next-line no-var
	var prisma: PrismaClient | undefined
}
const createClient = () => {
	const pool = new Pool({ connectionString: process.env.POSTGRES_PRISMA_URL, log: console.info })
	const adapter = new PrismaNeon(pool)
	return new PrismaClient({
		adapter,
		log:
			process.env.NODE_ENV === 'development' && process.env.PRISMA_DEBUG
				? ['query', 'error', 'warn']
				: ['error'],
	})
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
