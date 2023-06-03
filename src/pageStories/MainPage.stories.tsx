import { type Meta } from '@storybook/react'
import React from 'react'

import { Navbar } from '../components/Navbar/Navbar'
import { MainPage } from '../pages/index'

const imageInfo = {
	image: '',
	imageAltEN: '',
	imageAltES: '',
	tag: '',
} as const

export default {
	title: 'Pages/Main Page',
	component: MainPage,
	parameters: {
		layout: 'fullscreen',
	},
	args: {
		categories: [
			{ id: 'clienra1i0000pexbs0j5xjhl', categoryEN: 'BIPOC', categoryES: 'BIPOC', ...imageInfo },
			{
				id: 'clienra1i0001pexbc72b9hyj',
				categoryEN: 'Disabled',
				categoryES: 'Con discapacidad',
				...imageInfo,
			},
			{ id: 'clienra1i0002pexbm17yqg2d', categoryEN: 'Elder', categoryES: 'Persona mayor', ...imageInfo },
			{ id: 'clienra1i0003pexbvo2gu720', categoryEN: 'Immigrant', categoryES: 'Inmigrante', ...imageInfo },
			{
				id: 'clienra1i0004pexbkht4nc39',
				categoryEN: 'Transmasc/Nonbinary',
				categoryES: 'Transmasculino/Nonbinario',
				...imageInfo,
			},
			{ id: 'clienra1i0005pexby9upd67c', categoryEN: 'Queer', categoryES: 'Queer', ...imageInfo },
			{ id: 'clienra1i0006pexbks2nzu97', categoryEN: 'Trans man', categoryES: 'Hombre trans', ...imageInfo },
		],
	},
	render: ({ categories }) => {
		return (
			<>
				<Navbar />
				<MainPage categories={categories} />
			</>
		)
	},
} as Meta<typeof MainPage>

export const Desktop = {}
export const Mobile = {
	parameters: {
		viewport: {
			defaultViewport: 'iphonex',
		},
	},
}
