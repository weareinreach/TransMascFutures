import { Anchor, Button, Group, MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { Notifications } from '@mantine/notifications'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Analytics } from '@vercel/analytics/react'
import { type AppType } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { type Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { appWithTranslation, useTranslation } from 'next-i18next'

import { Navbar } from '~/components/Navbar/Navbar'
import { fontWorkSans, styleCache, theme } from '~/styles'
import { api } from '~/utils/api'

import i18nConfig from '../../next-i18next.config'

const MyApp: AppType<{ session: Session | null }> = ({ Component, pageProps: { session, ...pageProps } }) => {
	const router = useRouter()
	const { asPath, pathname, query, locale } = router
	const { t } = useTranslation()
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
						<Group position='apart' w='100%' p={40}>
							<Button
								style={{ opacity: router.pathname === '/' ? 0 : 1 }}
								// eslint-disable-next-line @typescript-eslint/no-misused-promises
								onClick={() => router.push('/')}
							>
								{t('nav.home')}
							</Button>
							<Anchor
								variant='category'
								tt='uppercase'
								// eslint-disable-next-line @typescript-eslint/no-misused-promises
								onClick={() =>
									router.replace({ pathname, query }, asPath, { locale: locale === 'en' ? 'es' : 'en' })
								}
							>
								{t('nav.switch-lang')}
							</Anchor>
						</Group>
					</SessionProvider>
				</ModalsProvider>
				<Notifications />
			</MantineProvider>
			<Analytics />
			<ReactQueryDevtools initialIsOpen={false} />
		</>
	)
}

export default api.withTRPC(appWithTranslation(MyApp, i18nConfig))
