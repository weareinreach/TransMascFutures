'use client'

import { Burger } from '@mantine/core'
import classes from './BurgerButton.module.css'
import { type ReactNode } from 'react'
import { useDisclosure } from '@mantine/hooks'
export const BurgerButton = ({ children }: { children: ReactNode }) => {
	const [opened, handler] = useDisclosure(false)

	return (
		<>
			<Burger
				classNames={{ root: classes.burgerRoot }}
				opened={opened}
				onClick={handler.toggle}
				className={classes.burgerItems}
			/>
			<div className={classes.burgerContainer} {...(opened && { 'data-opened': true })}>
				{children}
			</div>
		</>
	)
}
