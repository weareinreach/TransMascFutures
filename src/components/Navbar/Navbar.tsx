import { Header, Container, createStyles } from '@mantine/core'

import { HamburgerMenu } from './HamburgerMenu'
import { NavLinks } from './NavLinks'

const HEADER_HEIGHT = 75

const useStyles = createStyles((theme) => ({
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
		<Header height={HEADER_HEIGHT} sx={{ backgroundColor: '#BEBEBE' }}>
			<Container className={classes.navbar} fluid>
				<NavLinks />
			</Container>
			<HamburgerMenu />
		</Header>
	)
}
