import { faker } from '@faker-js/faker'
import { z } from 'zod'

import { categories } from './stories'
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
	editStory: adminProcedure
		.input(
			z
				.object({
					id: z.string(),
					storyJoy: z.string().trim().min(1).max(300).optional(),
					storyAccess: z.string().trim().min(1).max(300).optional(),
					keyJoy: categories.optional(),
					keyAccess: categories.optional(),
				})
				.strict()
		)
		.mutation(async ({ ctx, input }) => {
			const { id, ...updatedFields } = input

			const updatedStory = await ctx.prisma.story.update({
				where: { id },
				data: updatedFields,
			})

			return updatedStory
		}),
})
