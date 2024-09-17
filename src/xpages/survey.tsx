'use client'
import {
	Anchor,
	AspectRatio,
	Button,
	Checkbox,
	Container,
	Group,
	List,
	Radio,
	Select,
	Stack,
	Stepper,
	Text,
	Textarea,
	TextInput,
} from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { type GetStaticProps } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Trans, useTranslation } from 'react-i18next'
import { useEffect, useMemo, useRef, useState } from 'react'
import { z } from 'zod'

import { Banner } from '~/components'
import { stateOptions } from '~/data/states'
import { getServerSideTranslations } from '~/server/i18n'
import { api } from '~/trpc/react'
import ShareWide from '~public/assets/share-wide.jpg'

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

const Survey = () => {
	const { t } = useTranslation()

	const ts = (key: string) => t(key) satisfies string
	const form = useForm<FormData>({
		validate: zodResolver(SurveySchema(ts)),
		validateInputOnBlur: true,
		initialValues: {
			q1: [],
			q2: [],
			q4: '',
			q5: [],
			q7: [],
			q8: '',
			q9: '',
		},
	})

	const [activeStep, setActiveStep] = useState(0)
	const scrollRef = useRef<HTMLDivElement>(null)
	const nextStep = () => {
		setActiveStep((current) => (current < 3 ? current + 1 : current))
		scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
	}
	const prevStep = () => {
		setActiveStep((current) => (current >= 0 ? current - 1 : current))
		scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
	}
	const router = useRouter()
	const isEnglish = router.locale === 'en'

	const okToProceed = useMemo(() => {
		if (activeStep === 0) {
			return ['q1', 'q2', 'q3'].every((q) => form.isValid(q))
		}
		if (activeStep === 1) {
			return ['q4', 'q5', 'q6', 'q7', 'q7other', 'q8', 'q9'].every((q) => form.isValid(q))
		}

		return true
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [form.values, activeStep])

	useEffect(() => {
		if (form.values?.q12?.includes('no-answer')) {
			if (form.values.q12.length !== 1) {
				form.setFieldValue('q12', ['no-answer'])
				form.setFieldValue('q12other', undefined)
			}
		}
		if (form.values?.q15?.includes('no-answer')) {
			if (form.values.q15.length !== 1) {
				form.setFieldValue('q15', ['no-answer'])
			}
		}
		if (form.values?.q15?.includes('none')) {
			if (form.values.q15.length !== 1) {
				form.setFieldValue('q15', ['none'])
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [form.values.q12, form.values.q15])

	const submitStory = api.story.submit.useMutation({
		onSuccess: () => {
			nextStep()
		},
	})

	const ControlButtons = () => {
		const isFirst = activeStep === 0
		const isLast = activeStep === 3

		return (
			<Group noWrap w='100%' py={40} style={{ justifyContent: 'space-between' }} maw={800} mx='auto'>
				<Button onClick={prevStep} style={isFirst || isLast ? { opacity: 0 } : undefined} variant='secondary'>
					{t('back')}
				</Button>
				<Button
					onClick={() => {
						if (activeStep === 2) {
							submitStory.mutate(form.values)
						} else {
							nextStep()
						}
					}}
					style={isLast ? { opacity: 0 } : undefined}
					variant='secondary'
					disabled={!okToProceed}
					loading={submitStory.isLoading}
				>
					{activeStep === 2 ? t('submit') : t('next')}
				</Button>
			</Group>
		)
	}

	const [statePNA, setStatePNA] = useState(false)

	const stateSelectOptions = useMemo(
		() =>
			stateOptions.map(({ value, labelEN, labelES }) => ({ value, label: isEnglish ? labelEN : labelES })),
		[isEnglish]
	)

	return (
		<>
			<Container fluid>
				<Banner titleKey='nav.share-your-story' />
				<Stepper
					active={activeStep}
					onStepClick={setActiveStep}
					mx={40}
					ref={scrollRef}
					breakpoint={800}
					allowNextStepsSelect={false}
				>
					<Stepper.Step label={t('survey-form.step1')}>
						<Stack>
							<Stack>
								<Text>{t('survey-form.intro')}</Text>
								<Anchor
									onClick={() =>
										router.replace({ pathname: '/survey' }, undefined, {
											locale: isEnglish ? 'es' : 'en',
											scroll: false,
										})
									}
								>
									{t('survey-form.switch-lang')}
								</Anchor>
							</Stack>
							<Trans
								i18nKey='survey-form.eligiblity'
								components={{
									Text: <Text fw={500}></Text>,
									List: <List>.</List>,
									ListItem: <List.Item>.</List.Item>,
								}}
							/>
							{/* You verify that the following is true (check all that apply): */}
							<Checkbox.Group {...form.getInputProps('q1')} label={t('survey-form.q1')} required>
								{Object.entries(t('survey-form.q1-opts', { returnObjects: true })).map(([key, value], i) => (
									<Checkbox value={key.substring(3)} label={value} key={i} />
								))}
							</Checkbox.Group>
							{/*  I consent to having my submission shared by InReach via */}
							<Checkbox.Group {...form.getInputProps('q2')} label={t('survey-form.q2')} required>
								{Object.entries(t('survey-form.q2-opts', { returnObjects: true })).map(([key, value], i) => (
									<Checkbox value={key.substring(3)} label={value} key={i} />
								))}
							</Checkbox.Group>
							{/* Please provide your email address if you would like to stay updated on the status of the #TransmascFutures Campaign. */}
							<TextInput label={t('survey-form.q3')} {...form.getInputProps('q3')} type='email' />
						</Stack>
					</Stepper.Step>

					<Stepper.Step label={t('survey-form.step2')}>
						<Stack>
							<Stack spacing={0}>
								<Trans i18nKey='survey-form.section2' />
							</Stack>
							{/* Please enter your name as you would like it to appear on the campaign website. */}
							<TextInput label={<Trans i18nKey='survey-form.q4' />} {...form.getInputProps('q4')} required />
							{/* I identify as: */}
							<Checkbox.Group
								{...form.getInputProps('q5')}
								label={<Trans i18nKey='survey-form.q5' components={{ em: <em>.</em> }} />}
								required
							>
								{Object.entries(t('survey-form.q5-opts', { returnObjects: true })).map(([key, value]) => (
									<Checkbox value={key.substring(3)} label={value} key={key} />
								))}
							</Checkbox.Group>
							{/* How old are you */}
							<TextInput label={t('survey-form.q6')} {...form.getInputProps('q6')} type='number' />
							{/* Select pronouns */}
							<Stack spacing={0}>
								<Checkbox.Group {...form.getInputProps('q7')} label={t('survey-form.q7')} required>
									{Object.entries(t('survey-form.q7-opts', { returnObjects: true })).map(
										([key, value], i) => (
											<Checkbox value={key.substring(3)} label={value} key={i} />
										)
									)}
								</Checkbox.Group>
								{form.values?.q7?.includes('other') && (
									<TextInput {...form.getInputProps('q7other')} required />
								)}
							</Stack>
							{/* Describe the first moment you could see your future as a trans man or transmasculine person. */}
							<Textarea label={t('survey-form.q8')} {...form.getInputProps('q8')} required />
							{/* What resources have helped you see your future as a trans man or transmasculine adult? */}
							<Textarea
								label={<Trans i18nKey='survey-form.q9' components={{ em: <em>.</em> }} />}
								{...form.getInputProps('q9')}
								required
							/>
						</Stack>
					</Stepper.Step>

					<Stepper.Step label={t('survey-form.step3')}>
						<Stack>
							<Stack spacing={0}>
								{/* Which gender-related terms best describe your personal identity? */}
								<Checkbox.Group
									{...form.getInputProps('q10')}
									label={<Trans i18nKey='survey-form.q10' components={{ em: <em>.</em> }} />}
								>
									{Object.entries(t('survey-form.q10-opts', { returnObjects: true })).map(
										([key, value], i) => (
											<Checkbox value={key.substring(3)} label={value} key={i} />
										)
									)}
								</Checkbox.Group>
								{form.values?.q10?.includes('other') && (
									<TextInput {...form.getInputProps('q10other')} required />
								)}
							</Stack>
							{/*Select how you identify your race/ethnicity  */}
							<Stack spacing={0}>
								<Checkbox.Group
									{...form.getInputProps('q11')}
									label={<Trans i18nKey='survey-form.q12' components={{ em: <em>.</em> }} />}
								>
									{Object.entries(t('survey-form.q11-opts', { returnObjects: true })).map(
										([key, value], i) => (
											<Checkbox value={key.substring(3)} label={value} key={i} />
										)
									)}
								</Checkbox.Group>
								{form.values?.q11?.includes('other') && (
									<TextInput {...form.getInputProps('q11other')} required />
								)}
							</Stack>
							{/* Select how you identify your race/ethnicity. */}
							<Stack spacing={0}>
								<Checkbox.Group
									{...form.getInputProps('q12')}
									label={<Trans i18nKey='survey-form.q12' components={{ em: <em>.</em> }} />}
								>
									{Object.entries(t('survey-form.q12-opts', { returnObjects: true })).map(
										([key, value], i) => (
											<Checkbox
												value={key.substring(3)}
												label={value}
												key={i}
												disabled={
													key.substring(3) !== 'no-answer' && form.values?.q12?.some((x) => x === 'no-answer')
												}
											/>
										)
									)}
								</Checkbox.Group>
								{form.values?.q12?.includes('other') && (
									<TextInput {...form.getInputProps('q12other')} required />
								)}
							</Stack>
							{/* Select which U.S. region you live in. */}
							<Radio.Group {...form.getInputProps('q13')} label={t('survey-form.q13')}>
								{Object.entries(t('survey-form.q13-opts', { returnObjects: true })).map(([key, value], i) => (
									<Radio value={key.substring(3)} label={value} key={i} />
								))}
							</Radio.Group>
							{/* Select which U.S. state you live in. */}
							<Stack spacing={0}>
								<Select
									label={t('survey-form.q14')}
									{...form.getInputProps('q14')}
									data={stateSelectOptions}
									maw={300}
									disabled={statePNA}
									searchable
									clearable
									hoverOnSearchChange
								/>
								<Checkbox
									label={t('survey-form.prefer-not-answer')}
									checked={statePNA}
									onChange={(e) => {
										setStatePNA(e.target.checked)
										if (e.target.checked && form.values?.q14) {
											form.setFieldValue('q14', undefined)
										}
									}}
								/>
							</Stack>
							{/* Do you identify as any of the following? */}
							<Checkbox.Group
								{...form.getInputProps('q15')}
								label={<Trans i18nKey='survey-form.q15' components={{ em: <em>.</em> }} />}
							>
								{Object.entries(t('survey-form.q15-opts', { returnObjects: true })).map(([key, value], i) => (
									<Checkbox
										value={key.substring(3)}
										label={value}
										key={i}
										disabled={
											(key.substring(3) !== 'no-answer' &&
												form.values?.q15?.some((x) => x === 'no-answer')) ||
											(key.substring(3) !== 'none' && form.values?.q15?.some((x) => x === 'none'))
										}
									/>
								))}
							</Checkbox.Group>
						</Stack>
					</Stepper.Step>

					<Stepper.Step label={t('survey-form.step4')}>
						<AspectRatio ratio={ShareWide.width / ShareWide.height} w='100%' mx='auto' mb={40}>
							<Image src={ShareWide} alt='Person holding a Trans flag overhead in a downtown area.' fill />
						</AspectRatio>
						<Trans i18nKey='survey-form.thank-you' />
					</Stepper.Step>
				</Stepper>
				<ControlButtons />
			</Container>
		</>
	)
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	return {
		props: {
			...(await getServerSideTranslations(locale)),
		},
		revalidate: 60 * 60 * 24 * 7, // 1 week
	}
}
export default Survey

interface FormData {
	q1: string[]
	q2: string[]
	q3?: string
	q4: string
	q5: string[]
	q6?: string
	q7: string[]
	q7other?: string
	q8: string
	q9: string
	q10?: string[]
	q10other?: string
	q11?: string[]
	q11other?: string
	q12?: string[]
	q12other?: string
	q13?: string
	q14?: string | null
	q15?: string[]
}
