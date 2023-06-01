import { type Meta } from '@storybook/react'
import React from 'react'

import { Navbar } from '../../components/Navbar/Navbar'
import { CategoryPage } from '../../pages/category/[category]'
import { Desktop as MainPageDesktop } from '../MainPage.stories'

export default {
	title: 'Pages/Category Page',
	component: CategoryPage,
	parameters: {
		layout: 'fullscreen',
	},
	args: {
		category: 'queer',
		stories: MainPageDesktop.args.stories,
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
