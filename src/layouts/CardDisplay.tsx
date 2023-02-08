import { MediaQuery, Flex, Container } from '@mantine/core'

import { StoryPreviewCarousel } from '../components/storyPreviewCarousel/StoryPreviewCarousel'

import type { ReactNode } from 'react'

type CardDisplayProps = {
	children: ReactNode[]
}

export const CardDisplay = ({ children }: CardDisplayProps) => {
	return (
		<Container fluid mb='sm'>
			<MediaQuery smallerThan='md' styles={{ display: 'none' }}>
				<div>
					<StoryPreviewCarousel>{children}</StoryPreviewCarousel>
				</div>
			</MediaQuery>
			<MediaQuery largerThan='md' styles={{ display: 'none' }}>
				<Flex direction='column' align='center'>
					{children}
				</Flex>
			</MediaQuery>
		</Container>
	)
}
