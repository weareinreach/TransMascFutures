import { faker } from '@faker-js/faker'
import React from 'react'

import { Navbar } from '../components/Navbar/Navbar'
import { MainPage } from '../pages/index'

import type { story } from '../pages/index'
import type { Meta } from '@storybook/react'

const stories: story[] = []
for (let i = 0; i < 9; i++) {
	stories.push({
		name: faker.name.firstName(),
		pronouns: 'Cat/Kitten',
		birthYear: faker.date.birthdate({ min: 2004, max: 2023, mode: 'year' }).getFullYear(),
		storyJoy: faker.lorem.sentences(6),
		image:
			faker.datatype.number(100) % 3 === 0
				? '/public/assets/COLOR_TRANSMASCFUTURES (500x500).png'
				: 'http://placekitten.com/g/480/355',
		publicSlug: '#',
		defaultImage: null,
	})
}

export default {
	title: 'Pages/Main Page',
	component: MainPage,
	parameters: {
		layout: 'fullscreen',
	},
	args: {
		stories: stories,
	},
	render: ({ stories }) => {
		return (
			<>
				<Navbar />
				<MainPage stories={stories} />
			</>
		)
	},
} as Meta<typeof MainPage>

export const Desktop = {
	args: {
		stories: stories,
	},
}
export const Mobile = {
	parameters: {
		viewport: {
			defaultViewport: 'iphonex',
		},
	},
}
