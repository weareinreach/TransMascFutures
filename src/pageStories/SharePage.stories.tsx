import { Navbar } from '../components/Navbar/Navbar'
import SharePage from '../pages/share'

import type { Meta } from '@storybook/react'

export default {
	title: 'Pages/Share Page',
	component: SharePage,
	parameters: {
		layout: 'fullscreen',
	},
	tags: ['autodocs'],

	render: ({}) => {
		return (
			<>
				<Navbar />
				<SharePage image={'https://i.ibb.co/9nbvP1X/Screen-Shot-2023-02-15-at-11-36-49-PM.png'} />
			</>
		)
	},
} as Meta<typeof SharePage>

export const Default = {}
