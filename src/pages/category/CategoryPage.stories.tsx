import React from 'react'

import { CategoryPage } from './[category]'
import { Navbar } from '../../components/Navbar/Navbar'
import mainPageCSF from '../MainPage.stories'

import type { Meta } from '@storybook/react'

export default {
	title: 'Pages/Category Page',
	component: CategoryPage,
	parameters: {
		layout: 'fullscreen',
	},
	args: {
		category: 'queer',
		stories: mainPageCSF.args?.stories,
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

export const DefaultPage = {}
