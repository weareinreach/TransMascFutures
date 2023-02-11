import { Center, Loader, Text } from '@mantine/core'
import { useRouter } from 'next/router'
import { z } from 'zod'

import { CategoryPage } from '../../layouts/CategoryPage/CategoryPage'
import { api } from '../../utils/api'

import type { story } from '../../layouts/MainPage/MainPage'
import type { NextPage } from 'next'

const categories = z.enum(['queer', 'bipoc', 'disabled'])
type categories = z.infer<typeof categories>

const Category: NextPage = () => {
	const router = useRouter()
	const query = router.query['category']
	const { data, isError, isLoading } = api.story.recentNine.useQuery({ category: query as categories })

	if (isLoading) {
		return (
			<Center style={{ width: '100%', height: '100%' }}>
				<Loader size='xl' variant='bars' />
			</Center>
		)
	} else if (isError) {
		// Consult Joe about how to handle users trying to go
		// to non-existant categories
		return <Text ta='center'>Something is wrong...</Text>
	}

	return (
		<>
			<CategoryPage stories={data as story[]} category={query as string} />
		</>
	)
}

export default Category
