import { MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { Notifications } from '@mantine/notifications'
import { Analytics } from '@vercel/analytics/react'
import { type AppType } from 'next/app'
import Head from 'next/head'
import { type Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { appWithTranslation } from 'next-i18next'

import { Navbar } from '../components/Navbar/Navbar'
import { fontWorkSans, styleCache, theme } from '../styles'
import { api } from '../utils/api'

const MyApp: AppType<{ session: Session | null }> = ({ Component, pageProps: { session, ...pageProps } }) => {
	return (
		<>
			<Head>
				{/* eslint-disable-next-line i18next/no-literal-string */}
				<title>#TransmascFutures - InReach x GLAAD</title>
				<meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width' />
			</Head>
			<MantineProvider
				withGlobalStyles
				withNormalizeCSS
				theme={{ ...theme, fontFamily: fontWorkSans.style.fontFamily }}
				emotionCache={styleCache}
			>
				<ModalsProvider>
					<SessionProvider session={session}>
						<Navbar />
						<Component {...pageProps} />
					</SessionProvider>
				</ModalsProvider>
				<Notifications />
			</MantineProvider>
			<Analytics />
		</>
	)
}

export default api.withTRPC(appWithTranslation(MyApp))
