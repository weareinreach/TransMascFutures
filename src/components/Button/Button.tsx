import { Button as MantineButton } from '@mantine/core'

import type { ButtonProps } from '@mantine/core'
import type { ReactNode } from 'react'

export const Button = ({ children, color, variant, size }: Props) => {
	return (
		<MantineButton
			color={color}
			variant={variant}
			size={size}
			sx={[
				{
					borderRadius: 0,
					fontWeight: 'normal',
					height: 'auto',
					padding: '15px',
					textAlign: 'center',
					width: '175px',
				},
				{
					span: {
						whiteSpace: 'normal',
					},
				},
			]}
		>
			{children}
		</MantineButton>
	)
}

type Props = {
	children: ReactNode
	color: ButtonProps['color']
	variant?: ButtonProps['variant']
	size?: ButtonProps['size']
}
