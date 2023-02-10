import { Loader, Center, Title, Flex } from '@mantine/core'

import { MainPage } from '../layouts/MainPage/MainPage'
import { api } from '../utils/api'

import type { NextPage } from 'next'

const Home: NextPage = () => {
	const { data, status } = api.story.recentNine.useQuery()
	if (data === undefined) {
		return (
			<Center style={{ width: '100%', height: '100%' }}>
				{status === 'error' ? (
					<Flex direction={'column'} align='center'>
						<Title order={1} ta='center'>
							{'Ooops something went wrong :('}
						</Title>
						<Title order={2} ta='center'>
							{'Try refreshing the page'}
						</Title>
					</Flex>
				) : (
					<Loader variant='bars' size='xl' />
				)}
			</Center>
		)
	} else {
		return <MainPage stories={data} />
	}
}

export default Home
