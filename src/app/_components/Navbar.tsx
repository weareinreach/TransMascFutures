'use client'
import { Burger, Container, Drawer, Text } from '@mantine/core'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { useCallback, useMemo } from 'react'

import { useDisclosure } from '@mantine/hooks'
import classes from './Navbar.module.css'

const NavLinks = ({ drawerHandler }: { drawerHandler?: ReturnType<typeof useDisclosure>[1] }) => {
	const { t } = useTranslation()
	const linksInfo = [
		{ key: 'nav.home', href: '/' as const },
		{ key: 'nav.gallery', href: '/gallery' as const },
		{ key: 'nav.act', href: '/act' as const },
		{ key: 'nav.about', href: '/about' as const },
		{ key: 'nav.share', href: '/share' as const },
		{ key: 'nav.find-resources', href: 'https://app.inreach.org' as const },
	] //satisfies Array<Readonly<LinkData>>

	const closeDrawer = useCallback(() => {
		if (!drawerHandler) {
			return void 0
		}

		drawerHandler.close()
	}, [drawerHandler])

	// useEffect(() => {
	// 	router.events.on('routeChangeComplete', () => setOpened && setOpened(false))

	// 	return router.events.off('routeChangeComplete', () => setOpened && setOpened(false))
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [router.asPath])

	const links = linksInfo.map(({ key, href }) => {
		if (href === 'https://app.inreach.org') {
			return (
				<a key={key} href={href} className={classes.navlink} onClick={closeDrawer}>
					{t(key).toLocaleUpperCase()}
				</a>
			)
		}

		return (
			<Link key={key} href={href} className={classes.navlink} onClick={closeDrawer}>
				{t(key).toLocaleUpperCase()}
			</Link>
		)
	})

	return <>{links}</>
}

// const HomeButton = () => (
// 	<Link href='/'>
// 		<Button leftIcon={<IconArrowBigLeftFilled />} color='gray.0' variant='outline'>
// 			{' Home'}
// 		</Button>
// 	</Link>
// )

// This type is only needed when trying to make a story for a page
// to check whether the button to go to the main page works
type pathProp = { path?: string }

const HamburgerMenu = ({ path }: pathProp) => {
	const [opened, handler] = useDisclosure(false)
	console.log('opened', opened)
	console.log('path', path)

	const drawerTitle = useMemo(() => <Text className={classes.drawerTitle}>{'InReach X GLAAD'}</Text>, [])

	return (
		<Container className={classes.burger} data-current-path={path}>
			<Drawer
				opened={opened}
				onClose={handler.close}
				title={drawerTitle}
				size='sm'
				padding='xl'
				classNames={{ content: classes.drawerContent, header: classes.drawerHeader }}
			>
				<NavLinks drawerHandler={handler} />
			</Drawer>
			{/* {path !== '/' ? <HomeButton /> : undefined} */}
			<Burger
				opened={opened}
				onClick={() => {
					console.log('click')
					handler.toggle()
				}}
				size='lg'
				color='#FEFEFF'
				aria-label='burgerButton'
				title='Open sidenav'
			/>
		</Container>
	)
}

export const Navbar = ({ path }: pathProp) => {
	const pathname = usePathname()
	return (
		<header className={classes.header}>
			<Container className={classes.navbar} fluid>
				<NavLinks />
			</Container>
			<HamburgerMenu path={path ?? pathname} />
		</header>
	)
}
