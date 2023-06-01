import { type Meta } from '@storybook/react'

import { Navbar } from '../components'
import AboutPage from '../pages/about'

const partners = [
	{ logo: '/assets/tmf-logo-rect-bw.png', link: '#' },
	{ logo: '/assets/tmf-logo-rect-bw.png', link: '#' },
	{ logo: '/assets/tmf-logo-rect-bw.png', link: '#' },
	{ logo: '/assets/tmf-logo-rect-bw.png', link: '#' },
	{ logo: '/assets/tmf-logo-rect-bw.png', link: '#' },
	{ logo: '/assets/tmf-logo-rect-bw.png', link: '#' },
	{ logo: '/assets/tmf-logo-rect-bw.png', link: '#' },
	{ logo: '/assets/tmf-logo-rect-bw.png', link: '#' },
]
export default {
	title: 'Pages/About Page',
	component: AboutPage,
	parameters: {
		layout: 'fullscreen',
		args: {
			partners: partners,
		},
	},
	render: ({ partners }) => {
		return (
			<>
				<Navbar />
				<AboutPage partners={partners} />
			</>
		)
	},
} as Meta<typeof AboutPage>

export const Desktop = { args: { partners: partners } }

export const Mobile = {
	parameters: {
		viewport: {
			defaultViewport: 'iphonex',
		},
	},
}
