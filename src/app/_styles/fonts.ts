import { Work_Sans, IBM_Plex_Sans } from 'next/font/google'

export const fontWorkSans = Work_Sans({
	subsets: ['latin'],
	weight: ['400', '500', '600'],
	display: 'swap',
	fallback: [
		'-apple-system',
		'BlinkMacSystemFont',
		'Segoe UI',
		'Roboto',
		'Helvetica',
		'Arial',
		'sans-serif',
		'Apple Color Emoji',
		'Segoe UI Emoji',
	],
})
export const fontIbmPlexSans = IBM_Plex_Sans({ subsets: ['latin'], weight: ['300', '400'], display: 'swap' })
