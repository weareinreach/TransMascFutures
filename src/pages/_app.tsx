import { MantineProvider, TypographyStylesProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { NotificationsProvider } from '@mantine/notifications'
import Head from 'next/head'
import { SessionProvider } from 'next-auth/react'
import { appWithTranslation } from 'next-i18next'

import { styleCache, theme, fontWorkSans } from '../styles'
import { api } from '../utils/api'

import type { AppType } from 'next/app'
import type { Session } from 'next-auth'

const MyApp: AppType<{ session: Session | null }> = ({ Component, pageProps: { session, ...pageProps } }) => {
	return (
		<>
			<Head>
				<title>Page title</title>
				<meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width' />
			</Head>
			<MantineProvider
				withGlobalStyles
				withNormalizeCSS
				theme={{ ...theme, fontFamily: fontWorkSans.style.fontFamily }}
				emotionCache={styleCache}
			>
				<TypographyStylesProvider>
					<NotificationsProvider>
						<ModalsProvider>
							<SessionProvider session={session}>
								<Component {...pageProps} />
							</SessionProvider>
						</ModalsProvider>
					</NotificationsProvider>
				</TypographyStylesProvider>
			</MantineProvider>
		</>
	)
}

export default api.withTRPC(appWithTranslation(MyApp))
