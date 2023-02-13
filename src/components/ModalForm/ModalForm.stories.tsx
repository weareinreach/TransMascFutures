import { ModalForm } from './ModalForm'

import type { Meta } from '@storybook/react'

export default {
	title: 'Components/ModalForm',
	component: ModalForm,
} as Meta<typeof ModalForm>

export const Default = {}

export const Mobile = {
	parameters: {
		viewport: {
			defaultViewport: 'iphonex',
		},
	},
}
