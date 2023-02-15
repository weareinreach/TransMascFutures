import { faker } from '@faker-js/faker'
import { z } from 'zod'

import { createTRPCRouter, adminProcedure } from '../trpc'

export const adminRouter = createTRPCRouter({
	approveStory: adminProcedure
		.input(
			z.object({
				id: z.string(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			try {
				await ctx.prisma.story.findFirstOrThrow({
					where: {
						id: input.id,
						published: false,
						publicSlug: undefined,
					},
				})

				const generateUniqueSlug = async (): Promise<string> => {
					// Replace faker uuid generation with a more secure package
					const slug = faker.datatype.uuid()
					const response = await ctx.prisma.story.findUnique({
						where: { publicSlug: slug },
					})
					return response ? generateUniqueSlug() : slug
				}
				const uniqueSlug = await generateUniqueSlug()
				const approvedStory = ctx.prisma.story.update({
					where: {
						id: input.id,
					},
					data: {
						published: true,
						publicSlug: uniqueSlug,
					},
				})
				return approvedStory
			} catch (error) {
				throw error
			}
		}),
})
