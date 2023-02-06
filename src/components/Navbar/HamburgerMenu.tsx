import { Burger, Drawer, Container, Text } from '@mantine/core'
import { useState } from 'react'

import { NavLinks } from './NavLinks'
import { useStyles } from './NavStyles'

export const HamburgerMenu = () => {
	const [opened, setOpened] = useState(false)
	const { classes } = useStyles()

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
					drawer: {
						backgroundColor: theme.other.colors.glaadGray,
					},
				})}
			>
				<NavLinks />
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
