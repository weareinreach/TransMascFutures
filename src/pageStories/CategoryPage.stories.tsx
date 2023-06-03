import { type Meta } from '@storybook/react'
import React from 'react'

import { Navbar } from '~/components/Navbar/Navbar'
import { CategoryPage } from '~/pages/category/[tag]/[[...storyId]]'

export default {
	title: 'Pages/Category Page',
	component: CategoryPage,
	parameters: {
		layout: 'fullscreen',
	},
	args: {
		category: 'queer',
	},
	render: ({ category, stories }) => {
		return (
			<>
				<Navbar path='notHome' />
				<CategoryPage stories={stories} category={category} />
			</>
		)
	},
} as Meta<typeof CategoryPage>

export const Desktop = {}

export const Mobile = {
	parameters: {
		viewport: {
			defaultViewport: 'iphonex',
		},
	},
}
