/* eslint-disable @typescript-eslint/no-misused-promises */
import {
	Anchor,
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
import { useForm } from '@mantine/form'
import { type GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { Trans, useTranslation } from 'next-i18next'
import { useState } from 'react'

import { getServerSideTranslations } from '~/server/i18n'

const Survey = () => {
	const { t } = useTranslation()
	const form = useForm()
	const [activeStep, setActiveStep] = useState(0)
	const nextStep = () => setActiveStep((current) => (current < 3 ? current + 1 : current))
	const prevStep = () => setActiveStep((current) => (current > 0 ? current - 1 : current))
	const router = useRouter()
	const isEnglish = router.locale === 'en'

	const ControlButtons = ({ noBack, noNext }: { noBack?: boolean; noNext?: boolean }) => (
		<Group noWrap w='100%' py={40} style={{ justifyContent: 'space-between' }}>
			<Button onClick={prevStep} style={noBack ? { opacity: 0 } : undefined}>
				{t('back')}
			</Button>
			<Button onClick={nextStep} style={noNext ? { opacity: 0 } : undefined}>
				{t('next')}
			</Button>
		</Group>
	)

	return (
		<>
			<Container fluid>
				<Stepper active={activeStep} onStepClick={setActiveStep}>
					<Stepper.Step label={t('survey-form.step1')}>
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
						<Trans
							i18nKey='survey-form.eligiblity'
							components={{
								Text: <Text fw={500}></Text>,
								List: <List>.</List>,
								ListItem: <List.Item>.</List.Item>,
							}}
						/>
						<Checkbox.Group {...form.getInputProps('q1')} label={t('survey-form.q1')} required>
							{Object.entries(t('survey-form.q1-opts', { returnObjects: true })).map(([key, value], i) => (
								<Checkbox value={key} label={value} key={i} />
							))}
						</Checkbox.Group>
						<Checkbox.Group {...form.getInputProps('q2')} label={t('survey-form.q2')} required>
							{Object.entries(t('survey-form.q2-opts', { returnObjects: true })).map(([key, value], i) => (
								<Checkbox value={key} label={value} key={i} />
							))}
						</Checkbox.Group>
						<TextInput label={t('survey-form.q3')} {...form.getInputProps('q3')} />
						<ControlButtons noBack />
					</Stepper.Step>
					<Stepper.Step label={t('survey-form.step2')}>
						<Trans i18nKey='survey-form.section2' />
						<TextInput label={t('survey-form.q4')} {...form.getInputProps('q4')} />
						<Checkbox.Group {...form.getInputProps('q5')} label={t('survey-form.q5')} required>
							{Object.entries(t('survey-form.q5-opts', { returnObjects: true })).map(([key, value], i) => (
								<Checkbox value={key} label={value} key={i} />
							))}
						</Checkbox.Group>
						<TextInput label={t('survey-form.q6')} {...form.getInputProps('q6')} />
						<Checkbox.Group {...form.getInputProps('q7')} label={t('survey-form.q7')} required>
							{Object.entries(t('survey-form.q7-opts', { returnObjects: true })).map(([key, value], i) => (
								<Checkbox value={key} label={value} key={i} />
							))}
						</Checkbox.Group>
						<Textarea label={t('survey-form.q8')} {...form.getInputProps('q8')} />
						<Textarea
							label={<Trans i18nKey='survey-form.q9' components={{ em: <em>.</em> }} />}
							{...form.getInputProps('q9')}
						/>
						<ControlButtons />
					</Stepper.Step>
					<Stepper.Step label={t('survey-form.step3')}>
						<Checkbox.Group {...form.getInputProps('q10')} label={t('survey-form.q10')} required>
							{Object.entries(t('survey-form.q10-opts', { returnObjects: true })).map(([key, value], i) => (
								<Checkbox value={key} label={value} key={i} />
							))}
						</Checkbox.Group>
						<Checkbox.Group {...form.getInputProps('q11')} label={t('survey-form.q11')} required>
							{Object.entries(t('survey-form.q11-opts', { returnObjects: true })).map(([key, value], i) => (
								<Checkbox value={key} label={value} key={i} />
							))}
						</Checkbox.Group>
						<Checkbox.Group {...form.getInputProps('q12')} label={t('survey-form.q12')} required>
							{Object.entries(t('survey-form.q12-opts', { returnObjects: true })).map(([key, value], i) => (
								<Checkbox value={key} label={value} key={i} />
							))}
						</Checkbox.Group>
						<Radio.Group {...form.getInputProps('q13')} label={t('survey-form.q13')} required>
							{Object.entries(t('survey-form.q13-opts', { returnObjects: true })).map(([key, value], i) => (
								<Radio value={key} label={value} key={i} />
							))}
						</Radio.Group>
						<Stack>
							<Select label={t('survey-form.q14')} {...form.getInputProps('q14')} data={[]} />
							<Checkbox label={t('survey-form.prefer-not-answer')} />
						</Stack>
						<Checkbox.Group {...form.getInputProps('q15')} label={t('survey-form.q15')} required>
							{Object.entries(t('survey-form.q15-opts', { returnObjects: true })).map(([key, value], i) => (
								<Checkbox value={key} label={value} key={i} />
							))}
						</Checkbox.Group>
						<ControlButtons />
					</Stepper.Step>
					<Stepper.Step label={t('survey-form.step4')}>
						<Trans i18nKey='survey-form.thank-you' />
						<ControlButtons noNext />
					</Stepper.Step>
				</Stepper>
			</Container>
		</>
	)
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	return {
		props: {
			...(await getServerSideTranslations(locale)),
		},
		revalidate: 60 * 60 * 24, // 24 hours
	}
}
export default Survey
