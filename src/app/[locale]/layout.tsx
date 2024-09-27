import '@mantine/core/styles.css'

import { type Metadata } from 'next'
import { notFound } from 'next/navigation'
import i18nConfig from '~/i18nConfig'

import { TRPCReactProvider } from '~/trpc/react'
import { Loader, Group, Button } from '@mantine/core'
import { MantineProvider } from '~/app/_providers/MantineProvider'
import { I18nProvider } from '~/app/_providers/I18nProvider'
import { initTranslations, namespaces } from '~/app/i18n'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Suspense } from 'react'
import { NavBar } from '~/app/_components/Navigation'
import { ArtistCredit } from '~/app/_components/ArtistCredit'
import { VercelLogo } from '~/app/_components/VercelLogo'
import { Breakpoint } from '~/app/_components/dev-tools/Breakpoint'
import classes from './layout.module.css'

export const generateStaticParams = async () => ['en', 'es', 'fr'].map((locale) => ({ locale }))
export async function generateMetadata({ params }: RootLayoutProps): Promise<Metadata> {
	const { t } = await initTranslations(params.locale, namespaces)
	return {
		title: t('page-title.general'),
		// title: 'page-title.general',
		// description: 'Generated by create-t3-app',
		icons: [
			{ rel: 'apple-touch-icon', sizes: '180x180', url: '/apple-touch-icon.png' },
			{ rel: 'icon', type: 'image/png', sizes: '32x32', url: '/favicon-32x32.png' },
			{ rel: 'icon', type: 'image/png', sizes: '16x16', url: '/favicon-16x16.png' },
		],
	}
}
export default async function RootLayout({ children, params: { locale } }: RootLayoutProps) {
	const { t, resources } = await initTranslations(locale, namespaces)

	if (!i18nConfig.locales.includes(locale)) {
		notFound()
	}

	return (
		<html lang={locale}>
			<head>{/* <ColorSchemeScript /> */}</head>
			<body>
				<MantineProvider>
					<I18nProvider namespaces={namespaces} locale={locale} resources={resources}>
						<TRPCReactProvider>
							<NavBar />
							<Suspense fallback={<Loader />}>{children}</Suspense>
							<Group className={classes.footer}>
								<Button
									component='a'
									href='https://inreach.kindful.com/?campaign=1296613'
									target='_blank'
									rel='noreferrer'
									className={classes.donateButton}
								>
									{t('donate')}
								</Button>
								<ArtistCredit />
								{/* <Group className={classes.vercel}> */}
								<a href='https://vercel.com/?utm_source=in-reach&utm_campaign=oss' target='_blank'>
									<VercelLogo />
								</a>
								{/* </Group> */}
							</Group>
							<ReactQueryDevtools buttonPosition='top-right' />
							<Breakpoint />
						</TRPCReactProvider>
					</I18nProvider>
				</MantineProvider>
			</body>
			<Analytics />
			<SpeedInsights />
		</html>
	)
}

type RootLayoutProps = {
	children: React.ReactNode
	params: {
		locale: string
	}
}
