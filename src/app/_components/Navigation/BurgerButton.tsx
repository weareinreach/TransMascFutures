'use client'

import { Burger, useMantineTheme, Drawer, Stack } from '@mantine/core'
import classes from './BurgerButton.module.css'
import { type ReactNode } from 'react'
import { useDisclosure, useMediaQuery } from '@mantine/hooks'
export const BurgerButton = ({ children }: { children: ReactNode }) => {
	const [opened, handler] = useDisclosure(false)
	const theme = useMantineTheme()
	const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`, false)
	return (
		<>
			<Burger
				classNames={{ root: classes.burgerRoot }}
				opened={opened}
				onClick={handler.toggle}
				className={classes.burgerItems}
			/>
			{isMobile ? (
				<Drawer
					opened={opened}
					onClose={handler.close}
					classNames={{
						content: classes.drawerContent,
						header: classes.drawerHeader,
						close: classes.drawerClose,
						title: classes.drawerTitle,
						body: classes.drawerBody,
					}}
					closeButtonProps={{ size: 32 }}
					title='InReach X GLAAD'
				>
					<Stack className={classes.drawerStack}>{children}</Stack>
				</Drawer>
			) : (
				children
			)}
		</>
	)
}
