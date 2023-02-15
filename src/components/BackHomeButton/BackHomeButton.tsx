import { MediaQuery } from '@mantine/core'
import Link from 'next/link'

import { Button } from '../Button/Button'

export const BackHomeButton = () => (
	<MediaQuery query='(max-width: 1000px)' styles={{ display: 'none' }}>
		<Link href='/'>
			<Button>{'Back to Home'}</Button>{' '}
		</Link>
	</MediaQuery>
)
