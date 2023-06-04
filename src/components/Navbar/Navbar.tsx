import { Burger, Button, Container, createStyles, Drawer, Header, rem, Text } from '@mantine/core'
import { IconArrowBigLeftFilled } from '@tabler/icons-react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { type Route } from 'nextjs-routes'
import { useState } from 'react'

const HEADER_HEIGHT = 75

export const useStyles = createStyles((theme) => ({
	glaadGray: {
		backgroundColor: theme.other.colors.glaadGray,
	},

	navbar: {
		display: 'flex',
		justifyContent: 'space-around',
		alignItems: 'center',
		height: '100%',

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
		fontStyle: 'italic',
		flexDirection: 'column',
		marginTop: theme.spacing.md,
		marginBottom: theme.spacing.md,
		textDecoration: 'none',

		['&:active, &:hover']: {
			textDecoration: 'underline',
		},
	},
}))

type LinkData = { key: string; href: Route }

const NavLinks = () => {
	const { classes } = useStyles()
	const { t } = useTranslation()

	const linksInfo = [
		{ key: 'nav.gallery', href: '/gallery' as const },
		{ key: 'nav.act', href: '/act' as const },
		{ key: 'nav.about', href: '/about' as const },
		{ key: 'nav.share', href: '/share' as const },
		{ key: 'nav.find-resources', href: 'https://app.inreach.org' as const },
	] //satisfies Array<Readonly<LinkData>>

	const links = linksInfo.map(({ key, href }) => {
		if (href === 'https://app.inreach.org') {
			return (
				<a key={key} href={href} className={classes.navlink}>
					{t(key).toLocaleUpperCase()}
				</a>
			)
		}

		return (
			<Link key={key} href={href} className={classes.navlink}>
				{t(key).toLocaleUpperCase()}
			</Link>
		)
	})

	return <>{links}</>
}

const HomeButton = () => (
	<Link href='/'>
		<Button leftIcon={<IconArrowBigLeftFilled />} color='gray.0' variant='outline'>
			{' Home'}
		</Button>
	</Link>
)

// This type is only needed when trying to make a story for a page
// to check whether the button to go to the main page works
type pathProp = { path?: string }

const HamburgerMenu = ({ path }: pathProp) => {
	const [opened, setOpened] = useState(false)
	const { classes } = useStyles()

	return (
		<Container className={classes.burger} sx={{ justifyContent: path === '/' ? 'end' : 'space-between' }}>
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
						backgroundColor: theme.other.colors.glaadGray,
					},
				})}
			>
				<NavLinks />
			</Drawer>
			{path !== '/' ? <HomeButton /> : undefined}
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
		<Header height={HEADER_HEIGHT} className={classes.glaadGray}>
			<Container className={classes.navbar} fluid>
				<NavLinks />
			</Container>
			<HamburgerMenu path={path || router.pathname} />
		</Header>
	)
}
