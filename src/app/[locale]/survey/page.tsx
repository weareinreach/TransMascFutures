'use client'
import {
	AspectRatio,
	Checkbox,
	Container,
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
import { Image } from '~/app/_components/Image'
// import { initTranslations } from '~/app/i18n'
import { useTranslation } from 'react-i18next'
import { Trans } from '~/app/_components/Trans'
import { Banner } from '~/app/_components/Banner'
import { SurveyControlButtons } from '~/app/_components/SurveyControlButtons'
import { stateOptions } from '~/data/states'
import ShareWide from '~public/assets/share-wide.jpg'
import { SurveySchema, type SurveyData } from '~/app/_schemas/survey'
import { useEffect, useMemo, useRef, useState, type MouseEventHandler, useCallback } from 'react'
// import type { Metadata } from 'next'
import { api } from '~/trpc/react'

// export const generateMetadata = async ({ params: { locale } }: PageProps): Promise<Metadata> => {
// 	const { t } = await initTranslations(locale, ['common'])
// 	return {
// 		title: t('page-title.general-template', { page: t('nav.share-your-story') }),
// 	}
// }

const formInitialValues = {
	q1: [],
	q2: [],
	q4: '',
	q5: [],
	q7: [],
	q8: '',
	q9: '',
}

const SurveyPage = (/*{ params: { locale } }: PageProps*/) => {
	const { t } = useTranslation(['common', 'states'])
	const form = useForm<SurveyData>({
		validate: zodResolver(SurveySchema(t)),
		validateInputOnBlur: true,
		initialValues: formInitialValues,
	})
	const [activeStep, setActiveStep] = useState(0)
	const scrollRef = useRef<HTMLDivElement>(null)
	const nextStep: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
		setActiveStep((current) => (current < 3 ? current + 1 : current))
		scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
	}, [])
	const prevStep: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
		setActiveStep((current) => (current >= 0 ? current - 1 : current))
		scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
	}, [])
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
			setActiveStep((current) => (current < 3 ? current + 1 : current))
			scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
		},
	})
	const [statePNA, setStatePNA] = useState(false)
	const stateSelectOptions = useMemo(
		() => stateOptions.map((value) => ({ value, label: t(value, { ns: 'states' }) })),
		[t]
	)
	const answerOptions = useMemo(() => {
		const q1items = t('survey-form.q1-opts', { returnObjects: true }) as Record<string, string>
		const q2items = t('survey-form.q2-opts', { returnObjects: true }) as Record<string, string>
		const q5items = t('survey-form.q5-opts', { returnObjects: true }) as Record<string, string>
		const q7items = t('survey-form.q7-opts', { returnObjects: true }) as Record<string, string>
		const q10items = t('survey-form.q10-opts', { returnObjects: true }) as Record<string, string>
		const q11items = t('survey-form.q11-opts', { returnObjects: true }) as Record<string, string>
		const q12items = t('survey-form.q12-opts', { returnObjects: true }) as Record<string, string>
		const q13items = t('survey-form.q13-opts', { returnObjects: true }) as Record<string, string>
		const q15items = t('survey-form.q15-opts', { returnObjects: true }) as Record<string, string>
		return {
			q1: Object.entries(q1items).map(([key, value]) => ({ value: key.substring(3), label: value })),
			q2: Object.entries(q2items).map(([key, value]) => ({ value: key.substring(3), label: value })),
			q5: Object.entries(q5items).map(([key, value]) => ({ value: key.substring(3), label: value })),
			q7: Object.entries(q7items).map(([key, value]) => ({ value: key.substring(3), label: value })),
			q10: Object.entries(q10items).map(([key, value]) => ({ value: key.substring(3), label: value })),
			q11: Object.entries(q11items).map(([key, value]) => ({ value: key.substring(3), label: value })),
			q12: Object.entries(q12items).map(([key, value]) => ({ value: key.substring(3), label: value })),
			q13: Object.entries(q13items).map(([key, value]) => ({ value: key.substring(3), label: value })),
			q15: Object.entries(q15items).map(([key, value]) => ({ value: key.substring(3), label: value })),
		}
	}, [t])

	return (
		<Container fluid>
			<Banner titleKey='nav.share-your-story' t={t} />
			<Stepper
				active={activeStep}
				onStepClick={setActiveStep}
				mx={40}
				ref={scrollRef}
				// breakpoint={800}
				allowNextStepsSelect={false}
			>
				<Stepper.Step label={t('survey-form.step1')}>
					<Stack>
						<Stack>
							<Text>{t('survey-form.intro')}</Text>
							{/* <Anchor
								onClick={() =>
									router.replace({ pathname: '/survey' }, undefined, {
										locale: isEnglish ? 'es' : 'en',
										scroll: false,
									})
								}
							>
								{t('survey-form.switch-lang')}
							</Anchor> */}
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
							{answerOptions.q1.map(({ label, value }) => (
								<Checkbox value={value} label={label} key={value} />
							))}
						</Checkbox.Group>
						{/*  I consent to having my submission shared by InReach via */}
						<Checkbox.Group {...form.getInputProps('q2')} label={t('survey-form.q2')} required>
							{answerOptions.q2.map(({ label, value }) => (
								<Checkbox value={value} label={label} key={value} />
							))}
						</Checkbox.Group>
						{/* Please provide your email address if you would like to stay updated on the status of the #TransmascFutures Campaign. */}
						<TextInput label={t('survey-form.q3')} {...form.getInputProps('q3')} type='email' />
					</Stack>
				</Stepper.Step>

				<Stepper.Step label={t('survey-form.step2')}>
					<Stack>
						<Stack gap={0}>
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
							{answerOptions.q5.map(({ label, value }) => (
								<Checkbox value={value} label={label} key={value} />
							))}
						</Checkbox.Group>
						{/* How old are you */}
						<TextInput label={t('survey-form.q6')} {...form.getInputProps('q6')} type='number' />
						{/* Select pronouns */}
						<Stack gap={0}>
							<Checkbox.Group {...form.getInputProps('q7')} label={t('survey-form.q7')} required>
								{answerOptions.q7.map(({ label, value }) => (
									<Checkbox value={value} label={label} key={value} />
								))}
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
						<Stack gap={0}>
							{/* Which gender-related terms best describe your personal identity? */}
							<Checkbox.Group
								{...form.getInputProps('q10')}
								label={<Trans i18nKey='survey-form.q10' components={{ em: <em>.</em> }} />}
							>
								{answerOptions.q10.map(({ label, value }) => (
									<Checkbox value={value} label={label} key={value} />
								))}
							</Checkbox.Group>
							{form.values?.q10?.includes('other') && (
								<TextInput {...form.getInputProps('q10other')} required />
							)}
						</Stack>
						{/*Select how you identify your race/ethnicity  */}
						<Stack gap={0}>
							<Checkbox.Group
								{...form.getInputProps('q11')}
								label={<Trans i18nKey='survey-form.q11' components={{ em: <em>.</em> }} />}
							>
								{answerOptions.q11.map(({ label, value }) => (
									<Checkbox value={value} label={label} key={value} />
								))}
							</Checkbox.Group>
							{form.values?.q11?.includes('other') && (
								<TextInput {...form.getInputProps('q11other')} required />
							)}
						</Stack>
						{/* Select how you identify your race/ethnicity. */}
						<Stack gap={0}>
							<Checkbox.Group
								{...form.getInputProps('q12')}
								label={<Trans i18nKey='survey-form.q12' components={{ em: <em>.</em> }} />}
							>
								{answerOptions.q12.map(({ label, value }) => (
									<Checkbox
										value={value}
										label={label}
										key={value}
										disabled={value !== 'no-answer' && form.values?.q12?.some((x) => x === 'no-answer')}
									/>
								))}
							</Checkbox.Group>
							{form.values?.q12?.includes('other') && (
								<TextInput {...form.getInputProps('q12other')} required />
							)}
						</Stack>
						{/* Select which U.S. region you live in. */}
						<Radio.Group {...form.getInputProps('q13')} label={t('survey-form.q13')}>
							{answerOptions.q13.map(({ value, label }) => (
								<Radio value={value} label={label} key={value} />
							))}
						</Radio.Group>
						{/* Select which U.S. state you live in. */}
						<Stack gap={0}>
							<Select
								label={t('survey-form.q14')}
								{...form.getInputProps('q14')}
								data={stateSelectOptions}
								maw={300}
								disabled={statePNA}
								searchable
								clearable
								selectFirstOptionOnChange
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
							{answerOptions.q15.map(({ value, label }) => (
								<Checkbox
									value={value}
									label={label}
									key={value}
									disabled={
										// eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
										(value !== 'no-answer' && form.values?.q15?.some((x) => x === 'no-answer')) ||
										(value !== 'none' && form.values?.q15?.some((x) => x === 'none'))
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
			<SurveyControlButtons
				activeStep={activeStep}
				form={form}
				nextStep={nextStep}
				okToProceed={okToProceed}
				prevStep={prevStep}
				submitStory={submitStory}
				t={t}
			/>
		</Container>
	)
}

export default SurveyPage
export type PageProps = {
	params: {
		locale: string
	}
}
