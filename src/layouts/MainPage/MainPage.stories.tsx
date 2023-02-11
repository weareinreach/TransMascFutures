import { faker } from '@faker-js/faker'
import React from 'react'

import { MainPage } from './MainPage'
import { Navbar } from '../../components/Navbar/Navbar'

import type { story } from './MainPage'
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
	})
}

export default {
	title: 'Pages/Main Page',
	component: MainPage,
	parameters: {
		layout: 'fullscreen',
	},
	render: () => {
		const stories: story[] = []
		for (let i = 0; i < 9; i++) {
			stories.push({
				name: faker.name.firstName(),
				pronouns: 'Cat/Kitten',
				birthYear: faker.date.birthdate({ min: 2004, max: 2023, mode: 'year' }).getFullYear(),
				storyJoy: faker.lorem.sentences(6),
				image: faker.datatype.number(100) % 3 === 0 ? null : 'http://placekitten.com/g/480/355',
				publicSlug: '#',
			})
		}

		return (
			<>
				<Navbar />
				<MainPage stories={stories} />
			</>
		)
	},
} as Meta<typeof MainPage>

export const Default = {}
