import { type Meta } from '@storybook/react'

import { ModalForm } from './ModalForm'

export default {
	title: 'Components/ModalForm',
	component: ModalForm,
} as Meta<typeof ModalForm>

export const Default = {
	parameters: {
		viewport: {
			defaultViewport: 'responsive',
		},
	},
}

export const Mobile = {
	parameters: {
		viewport: {
			defaultViewport: 'iphonex',
		},
	},
}
