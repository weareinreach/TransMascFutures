import { Header, Container } from '@mantine/core'

import { HamburgerMenu } from './HamburgerMenu'
import { NavLinks } from './NavLinks'
import { useStyles } from './NavStyles'

const HEADER_HEIGHT = 75

export const Navbar = () => {
	const { classes } = useStyles()
	return (
		<Header height={HEADER_HEIGHT} className={classes.glaadGray}>
			<Container className={classes.navbar} fluid>
				<NavLinks />
			</Container>
			<HamburgerMenu />
		</Header>
	)
}
