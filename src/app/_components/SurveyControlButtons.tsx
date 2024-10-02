'use client'
import { Group, Button } from '@mantine/core'
import { type TFunction } from 'i18next'
import { type UseFormReturnType } from '@mantine/form'
import { type SurveyData } from '~/app/_schemas/survey'
import { type api } from '~/trpc/react'
import type { MouseEventHandler } from 'react'

export const SurveyControlButtons = ({
	activeStep,
	prevStep,
	nextStep,
	t,
	submitStory,
	okToProceed,
	form,
}: SurveyControlButtonsProps) => {
	const isFirst = activeStep === 0
	const isLast = activeStep === 3

	return (
		<Group wrap='nowrap' w='100%' py={40} style={{ justifyContent: 'space-between' }} maw={800} mx='auto'>
			<Button onClick={prevStep} style={isFirst || isLast ? { opacity: 0 } : undefined} variant='secondary'>
				{t('back')}
			</Button>
			<Button
				onClick={(e) => {
					if (activeStep === 2) {
						submitStory.mutate(form.values)
					} else {
						nextStep(e)
					}
				}}
				style={isLast ? { opacity: 0 } : undefined}
				variant='secondary'
				disabled={!okToProceed}
				loading={submitStory.isPending}
			>
				{activeStep === 2 ? t('submit') : t('next')}
			</Button>
		</Group>
	)
}

type SurveyControlButtonsProps = {
	activeStep: number
	prevStep: MouseEventHandler<HTMLButtonElement>
	nextStep: MouseEventHandler<HTMLButtonElement>
	t: TFunction
	submitStory: ReturnType<(typeof api)['story']['submit']['useMutation']>
	okToProceed: boolean
	form: UseFormReturnType<SurveyData>
}
