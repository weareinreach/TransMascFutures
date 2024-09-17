import { Anchor, Button, Group, MantineProvider, Text } from '@mantine/core'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { type AppType } from 'next/app'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

import { fontWorkSans, theme } from '~/styles'
import { api } from '~/trpc/react'

import VercelLogo from '../../public/powered-by-vercel.svg'

const MyApp: AppType = ({ Component, pageProps }) => {
	const router = useRouter()
	const { asPath, pathname, query, locale } = router
	const { t } = useTranslation()
	return (
		<>
			<Head>
				<title>{t('page-title.general')}</title>
				<meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width' />
				<link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
				<link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
				<link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
				<link rel='manifest' href='/site.webmanifest' />
			</Head>
			<MantineProvider withNormalizeCSS theme={{ ...theme, fontFamily: fontWorkSans.style.fontFamily }}>
				<Component {...pageProps} />
				<Group position='apart' w='100%' p={40}>
					<Button
						component='a'
						href='https://inreach.kindful.com/?campaign=1296613'
						target='_blank'
						rel='noreferrer'
						className={classes.homeButton}
					>
						{t('donate')}
					</Button>
					<Text className={classes.artistCredit} fw={500}>
						{t('artist-credit')}
					</Text>
					<Anchor
						variant='category'
						tt='uppercase'
						onClick={() =>
							router.replace({ pathname, query }, asPath, { locale: locale === 'en' ? 'es' : 'en' })
						}
					>
						{t('nav.switch-lang')}
					</Anchor>
				</Group>
				<Group position='right' w='100%' p={40} pt={0}>
					<a href='https://vercel.com/?utm_source=in-reach&utm_campaign=oss' target='_blank'>
						<Image src={VercelLogo} alt={t('vercel')} />
					</a>
				</Group>
			</MantineProvider>
			<Analytics />
			<SpeedInsights />
			<ReactQueryDevtools initialIsOpen={false} />
		</>
	)
}

export default MyApp
