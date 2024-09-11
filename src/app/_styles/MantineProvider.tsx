'use client'
import { MantineProvider as Mantine } from '@mantine/core'
import { cssResolver, mantineTheme } from './theme'
export function MantineProvider({ children }: { children: React.ReactNode }) {
	return (
		<Mantine theme={mantineTheme} cssVariablesResolver={cssResolver}>
			{children}
		</Mantine>
	)
}
