import { z } from 'zod'
export const SurveySchema = (ts?: (key: string) => string) =>
	z
		.object({
			q1: z
				.string()
				.array()
				.length(3, ts ? ts('errors.verify-all-3') : undefined),
			q2: z
				.string()
				.array()
				.length(3, ts ? ts('errors.consent-all-3') : undefined),
			q3: z.string().email().optional(),
			q4: z.string().min(1),
			q5: z
				.string()
				.array()
				.min(1, ts ? ts('errors.select-min-one') : undefined),
			q6: z.coerce
				.number()
				.min(21, ts ? ts('errors.min-21') : undefined)
				.or(
					z
						.string()
						.refine(
							(val) => !isNaN(parseInt(val)) && parseInt(val) >= 21,
							ts ? ts('errors.min-21') : undefined
						)
				)
				.optional(),
			q7: z
				.string()
				.array()
				.min(1, ts ? ts('errors.select-min-one') : undefined),
			q7other: z.string().optional(),
			q8: z.string().min(1),
			q9: z.string().min(1),
			q10: z.string().array().optional(),
			q10other: z.string().optional(),
			q11: z.string().array().optional(),
			q11other: z.string().optional(),
			q12: z.string().array().optional(),
			q12other: z.string().optional(),
			q13: z.string().optional(),
			q14: z.string().nullish(),
			q15: z.string().array().optional(),
		})
		.superRefine((val, ctx) => {
			if (val.q7.includes('other') && !val.q7other) {
				return ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: ts ? ts('errors.other-val') : undefined,
				})
			}
			if (val.q10?.includes('other') && !val.q10other) {
				return ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: ts ? ts('errors.other-val') : undefined,
				})
			}
			if (val.q11?.includes('other') && !val.q11other) {
				return ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: ts ? ts('errors.other-val') : undefined,
				})
			}
			if (val.q12?.includes('other') && !val.q12other) {
				return ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: ts ? ts('errors.other-val') : undefined,
				})
			}
		})

export type SurveyData = z.infer<ReturnType<typeof SurveySchema>>
