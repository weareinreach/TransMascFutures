import React from 'react'

import { CategoryPage } from './CategoryPage'
import { Navbar } from '../../components/Navbar/Navbar'
import { Default } from '../MainPage/MainPage.stories'

import type { Meta } from '@storybook/react'

export default {
	title: 'Pages/Category Page',
	component: CategoryPage,
	parameters: {
		layout: 'fullscreen',
	},
	args: {
		category: 'queer',
		stories: Default,
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
