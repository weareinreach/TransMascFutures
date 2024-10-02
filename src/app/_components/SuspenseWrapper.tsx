import { Loader } from '@mantine/core'
import { Suspense, type ReactNode } from 'react'

export const SuspenseWrapper = ({ children }: { children: ReactNode }) => (
	<Suspense fallback={<Loader />}>{children}</Suspense>
)
