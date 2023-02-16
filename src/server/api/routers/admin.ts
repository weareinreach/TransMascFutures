import { z } from 'zod'

import { categories } from './stories'
import { nanoUrl } from '../../nanoIdUrl'
import { createTRPCRouter, adminProcedure } from '../trpc'

export const adminRouter = createTRPCRouter({
	approveStory: adminProcedure.input(z.object({ id: z.string() })).mutation(async ({ ctx, input }) => {
		try {
			const approvedStory = ctx.prisma.story.update({
				where: {
					id: input.id,
				},
				data: {
					published: true,
				},
				select: {
					id: true,
					published: true,
				},
			})
			return approvedStory
		} catch (error) {
			throw error
		}
	}),
	disapproveStory: adminProcedure.input(z.object({ id: z.string() })).mutation(async ({ ctx, input }) => {
		try {
			const story = ctx.prisma.story.update({
				where: {
					id: input.id,
				},
				data: {
					published: false,
				},
				select: {
					id: true,
					published: true,
				},
			})
			return story
		} catch (error) {
			throw error
		}
	}),
	generatePublicUrl: adminProcedure.input(z.object({ id: z.string() })).mutation(({ ctx, input }) => {
		const slug = nanoUrl()

		const publicStory = ctx.prisma.story.update({
			where: {
				id: input.id,
			},
			data: {
				publicSlug: slug,
			},
			select: {
				id: true,
				publicSlug: true,
			},
		})
		return publicStory
	}),
	unsharePublicUrl: adminProcedure.input(z.object({ id: z.string() })).mutation(({ ctx, input }) => {
		const story = ctx.prisma.story.update({
			where: {
				id: input.id,
			},
			data: {
				publicSlug: null,
			},
			select: {
				id: true,
				publicSlug: true,
			},
		})
		return story
	}),
})
