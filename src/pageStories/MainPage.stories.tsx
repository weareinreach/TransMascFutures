import { faker } from '@faker-js/faker'
import { type Meta } from '@storybook/react'
import React from 'react'

import { Navbar } from '../components/Navbar/Navbar'
import { MainPage } from '../pages/index'
import { type story } from '../pages/index'

const stories: story[] = []
for (let i = 0; i < 9; i++) {
	stories.push({
		id: i.toString(),
		name: faker.name.firstName(),
		pronouns: 'Cat/Kitten',
		birthYear: faker.datatype.number({ min: 2000, max: 2023 }),
		response1EN: faker.lorem.sentences(6),
		response2EN: faker.lorem.sentences(3),
		response1ES: null,
		response2ES: null,
		userId: null,
		image:
			faker.datatype.number(100) % 3 === 0
				? '/assets/tmf-logo-sw-color.png'
				: 'http://placekitten.com/g/480/355',
		publicSlug: '#',
		defaultImageId: 'null',
		defaultImage: null,
		createdAt: new Date(),
		updatedAt: new Date(),
		published: true,
		isInfluencer: false,
		categories: [],
		imageModeration: null,
		textToxicity: null,
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
