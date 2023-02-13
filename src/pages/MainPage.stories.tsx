import { faker } from '@faker-js/faker'
import React from 'react'

import { MainPage } from './index'
import { Navbar } from '../components/Navbar/Navbar'

import type { story } from './index'
import type { Meta } from '@storybook/react'

const stories: story[] = []
for (let i = 0; i < 9; i++) {
	const storyContent = faker.lorem.sentences(6)
	stories.push({
		name: faker.name.firstName(),
		pronouns: 'Cat/Kitten',
		birthYear: faker.date.birthdate({ min: 2004, max: 2023, mode: 'year' }).getFullYear(),
		storyJoy:
			faker.datatype.number({ max: 10, min: 0 }) % 2 === 0
				? storyContent
				: storyContent.split(' ').join('\n'),
		image:
			faker.datatype.number(100) % 3 === 0
				? '/assets/tmf-logo-sw-color.png'
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

export const Default = {}
