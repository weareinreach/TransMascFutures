import { Burger, Drawer, Container, createStyles } from '@mantine/core'
import { useState } from 'react'

import { NavLinks } from './NavLinks'

const useStyles = createStyles((theme) => ({
	alignLeft: {
		display: 'flex',
		justifyContent: 'flex-end',
		alignItems: 'center',
		height: '100%',

		[`@media (min-width: ${theme.breakpoints.md}px)`]: {
			display: 'none',
		},
	},
}))

export const HamburgerMenu = () => {
	const [opened, setOpened] = useState(false)
	const { classes } = useStyles()

	return (
		<Container className={classes.alignLeft}>
			<Drawer opened={opened} onClose={() => setOpened(false)} title='InReach x GLAAD' size='sm'>
				<NavLinks />
			</Drawer>
			<Burger opened={opened} onClick={() => setOpened((o) => !o)} size='lg' color='#FEFEFF' id='burger' />
		</Container>
	)
}
