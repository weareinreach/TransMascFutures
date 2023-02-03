import { Header, Container, createStyles } from '@mantine/core'

import { HamburgerMenu } from './HamburgerMenu'
import { NavLinks } from './NavLinks'

const HEADER_HEIGHT = 75

const useStyles = createStyles((theme) => ({
	header: {
		backgroundColor: theme.other.colors.glaadGray,
	},

	navbar: {
		display: 'flex',
		justifyContent: 'space-around',
		alignItems: 'center',
		height: '100%',

		['& a']: {
			color: theme.colors.gray[0],
		},

		[`@media (max-width: ${theme.breakpoints.md}px)`]: {
			display: 'none',
		},
	},
}))

export const Navbar = () => {
	const { classes } = useStyles()
	return (
		<Header height={HEADER_HEIGHT} className={classes.header}>
			<Container className={classes.navbar} fluid>
				<NavLinks />
			</Container>
			<HamburgerMenu />
		</Header>
	)
}
