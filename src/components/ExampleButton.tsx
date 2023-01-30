import { Button } from '@mantine/core'

import type { ButtonProps } from '@mantine/core'
import type { ReactNode } from 'react'

/**
 * Whatever notes you type in this comment block will also show up in Storybook on the Docs page.
 *
 * It will also show a popup in VS Code when you hover over the component name.
 */
export const ExampleButton = ({ children, variant, size }: Props) => {
	return (
		<Button variant={variant} size={size}>
			{children}
		</Button>
	)
}

type Props = {
	children: ReactNode
	variant?: ButtonProps['variant']
	size?: ButtonProps['size']
}
