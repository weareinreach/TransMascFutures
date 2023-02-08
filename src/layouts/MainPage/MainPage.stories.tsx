import { faker } from '@faker-js/faker'
import React from 'react'

import { MainPage } from './MainPage'
import { Navbar } from '../../components/Navbar/Navbar'

import type { story } from './MainPage'
import type { Meta } from '@storybook/react'

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
				image: faker.datatype.number(100) % 3 === 0 ? undefined : 'http://placekitten.com/g/480/355',
				defaultImageId: '/public/assets/COLOR_TRANSMASCFUTURES (500x500).png',
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
