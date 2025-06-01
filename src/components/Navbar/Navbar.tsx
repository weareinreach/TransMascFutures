import { Burger, Button, Container, createStyles, Drawer, Header, rem, Text } from '@mantine/core'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { type Dispatch, type SetStateAction, useEffect, useState } from 'react'

const HEADER_HEIGHT = 75

export const useStyles = createStyles((theme) => ({
	softBlack: {
		backgroundColor: theme.other.colors.softBlack, // eslint-disable-line @typescript-eslint/no-unsafe-member-access
	},

	navbar: {
		display: 'flex',
		justifyContent: 'space-around',
		alignItems: 'center',
		height: '100%',
		paddingLeft: rem(64),
		paddingRight: rem(64),
		gap: rem(40),

		['& a']: {
			color: theme.colors.gray[0],
			flexDirection: 'row',
			textAlign: 'center',
			justifyContent: 'center',
			alignItems: 'center',
			fontSize: theme.fontSizes.lg,
		},

		[theme.fn.smallerThan('md')]: {
			display: 'none',
		},
	},

	burger: {
		display: 'flex',
		alignItems: 'center',
		height: '100%',
		paddingLeft: rem(64),
		paddingRight: rem(64),

		[theme.fn.smallerThan('md')]: {
			paddingLeft: rem(32),
			paddingRight: rem(32),
		},

		[theme.fn.smallerThan('sm')]: {
			paddingLeft: rem(20),
			paddingRight: rem(20),
		},

		[theme.fn.largerThan('md')]: {
			display: 'none',
		},
	},

	navlink: {
		color: theme.colors.gray[0],
		display: 'flex',
		width: '100%',
		height: '100%',
		fontWeight: 600,
		fontSize: rem(32),
		fontStyle: 'normal',
		flexDirection: 'column',
		marginTop: theme.spacing.md,
		marginBottom: theme.spacing.md,
		textDecoration: 'none',
		textAlign: 'left',

		['&:active, &:hover']: {
			textDecoration: 'underline',
		},
	},
	navbutton: {
		color: theme.colors.gray[0],
		border: 'solid 1px white',
	},
	navLinksGroup: {
		display: 'flex',
		gap: rem(40),
		alignItems: 'center',
	},

	navButtonsGroup: {
		display: 'flex',
		gap: rem(20),
		marginLeft: 'auto',
	},

	languageButton: {
		fontWeight: 600,
		backgroundColor: 'transparent',
		border: 'none',
		paddingLeft: rem(10),
		paddingRight: rem(10),
		'&:hover': {
			backgroundColor: theme.other.colors.darkGray, // eslint-disable-line @typescript-eslint/no-unsafe-member-access
		},
	},
	languageButtonAbsoluteContainer: {
		position: 'absolute',
		bottom: rem(theme.spacing.xl),
		left: rem(theme.spacing.xl),
		width: '90%',
		display: 'flex',
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
}))

const NavLinks = ({
	setOpened,
	onlyLinks = false,
	onlyButtons = false,
}: {
	setOpened?: Dispatch<SetStateAction<boolean>>
	onlyLinks?: boolean
	onlyButtons?: boolean
}) => {
	const { classes } = useStyles()
	const { t } = useTranslation()
	const router = useRouter()
	const { pathname, query, asPath, locale } = router

	const linksInfo = [
		{ key: 'nav.home', href: '/' as const },
		{ key: 'nav.gallery', href: '/gallery' as const },
		{ key: 'nav.act', href: '/act' as const },
		{ key: 'nav.about', href: '/about' as const },
		{ key: 'nav.share', href: '/share' as const },
		{ key: 'nav.find-resources', href: 'https://app.inreach.org' as const },
	]

	useEffect(() => {
		router.events.on('routeChangeComplete', () => setOpened && setOpened(false))
		return router.events.off('routeChangeComplete', () => setOpened && setOpened(false))
	}, [router.asPath, router.events, setOpened]) // FIX: Added router.events and setOpened to dependencies

	return (
		<>
			{linksInfo.map(({ key, href }) => {
				const isExternal = href === 'https://app.inreach.org'

				if (onlyLinks && isExternal) return null
				if (onlyButtons && !isExternal) return null
				if (onlyButtons && isExternal) {
					return (
						<React.Fragment key='lang-and-resources'>
							<Button
								variant='subtle'
								color='gray.0'
								radius='md'
								className={classes.languageButton}
								onClick={() => {
									void router.replace({ pathname, query }, asPath, {
										locale: locale === 'en' ? 'es' : 'en',
									})
								}}
							>
								{t('nav.switch-lang-short')}
							</Button>
							<Button
								component='a'
								href={href}
								target='_blank'
								rel='noopener noreferrer'
								className={classes.navbutton}
								color='gray.0'
								variant='outline'
								radius='md'
							>
								{t(key).toLocaleUpperCase()}
							</Button>
						</React.Fragment>
					)
				}

				if (isExternal) {
					return (
						<Button
							key={key}
							component='a'
							href={href}
							target='_blank'
							rel='noopener noreferrer'
							className={classes.navbutton}
							color='gray.0'
							variant='outline'
							radius='md'
						>
							{t(key).toLocaleUpperCase()}
						</Button>
					)
				}

				return (
					<Link key={key} href={href} className={classes.navlink}>
						{t(key)}
					</Link>
				)
			})}
		</>
	)
}

type pathProp = { path?: string }

const HamburgerMenu = ({ path }: pathProp) => {
	const [opened, setOpened] = useState(false)
	const { classes } = useStyles()
	const router = useRouter()
	const { asPath, pathname, query, locale } = router
	const { t } = useTranslation()

	return (
		<Container className={classes.burger}>
			<Drawer
				opened={opened}
				onClose={() => setOpened(false)}
				title={
					<Text fz='md' fw={900} color='gray.0'>
						{'InReach X GLAAD'}
					</Text>
				}
				size='sm'
				padding='xl'
				styles={(theme) => ({
					content: {
						backgroundColor: theme.other.colors.softBlack, // eslint-disable-line @typescript-eslint/no-unsafe-member-access
						display: 'flex',
						flexDirection: 'column',
						height: '100%',
						position: 'relative',
					},
					header: {
						backgroundColor: theme.other.colors.softBlack, // eslint-disable-line @typescript-eslint/no-unsafe-member-access
					},
				})}
			>
				<div style={{ flexGrow: 1, overflowY: 'auto' }}>
					<NavLinks setOpened={setOpened} onlyLinks />
					<Button
						component='a'
						href='https://app.inreach.org'
						target='_blank'
						rel='noopener noreferrer'
						className={classes.navbutton}
						color='gray.0'
						variant='outline'
						radius='md'
						mt='lg'
						sx={{ '& > span': { justifyContent: 'flex-start' } }}
					>
						{t('nav.find-resources').toLocaleUpperCase()}
					</Button>
				</div>

				<div className={classes.languageButtonAbsoluteContainer}>
					<Button
						variant='subtle'
						color='gray.0'
						radius='md'
						className={classes.languageButton}
						onClick={() => {
							void router.replace({ pathname, query }, asPath, {
								locale: locale === 'en' ? 'es' : 'en',
							})
						}}
						sx={{ '& > span': { justifyContent: 'flex-start' } }}
						pl='0'
					>
						{t('nav.switch-lang-short')}
					</Button>
				</div>
			</Drawer>
			<Burger
				opened={opened}
				onClick={() => setOpened((o) => !o)}
				size='lg'
				color='#FEFEFF'
				aria-label='burgerButton'
				title='Open sidenav'
			/>
		</Container>
	)
}

export const Navbar = ({ path }: pathProp) => {
	const { classes } = useStyles()
	const router = useRouter()
	return (
		<Header height={HEADER_HEIGHT} className={classes.softBlack}>
			<Container className={classes.navbar} fluid>
				<div className={classes.navLinksGroup}>
					<NavLinks onlyLinks />
				</div>
				<div className={classes.navButtonsGroup}>
					<NavLinks onlyButtons />
				</div>
			</Container>
			<HamburgerMenu path={path ?? router.pathname} />
		</Header>
	)
}
