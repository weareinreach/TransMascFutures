import { renderTrpcPanel } from '@joekarow/trpc-panel'
import { type NextApiRequest, type NextApiResponse } from 'next'

import { appRouter } from '../../server/api/root'

export default function handler(_: NextApiRequest, res: NextApiResponse) {
	// eslint-disable-next-line turbo/no-undeclared-env-vars
	if (process.env.NODE_ENV === 'development' && !process.env.VERCEL) {
		res.status(200).send(
			renderTrpcPanel(appRouter, {
				url: 'http://localhost:3000/api/trpc',
				transformer: 'superjson',
			})
		)
	}
}
