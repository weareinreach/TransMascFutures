import { AspectRatio, Container, Grid, Title } from '@mantine/core'
import { type NextPage } from 'next'
import Image from 'next/image'

import { BackHomeButton } from '../components/BackHomeButton/BackHomeButton'
import { PreviewCard } from '../components/storyPreviewCard/PreviewCard'

const cardTitles = [
	'Participate in this campaign.',
	'Contribute to transmasculine access.',
	'Access affirming reousrces, 24/7.',
]

export const Act: NextPage = () => {
	return (
		<Container fluid p={'xl'}>
			<Grid px='xl'>
				<Grid.Col pl='xl' lg={3} md={12}>
					<Title fw={900} order={1} size='30px !important' tt='capitalize'>
						{'Act'}
					</Title>
				</Grid.Col>
				<Grid.Col span='auto'>
					<AspectRatio ratio={800 / 300}>
						<Image src='/assets/tmf-logo-rect-bw.png' alt='transmasc logo' width={800} height={300} />
					</AspectRatio>
				</Grid.Col>
				<Grid.Col lg={3} md={12}></Grid.Col>
			</Grid>
			<Grid p='md'>
				<Grid.Col lg={4} md={12}>
					<PreviewCard
						title={cardTitles[0] as string}
						text={
							<>
								<p>
									{
										"We're accepting submissions of transmaculine individuals to tell their story through (date). See how "
									}
									<a href='#'>{'here'}</a>
									{'.'}
								</p>
								<p>
									{'Looking to share on social media, but now sure how? Check out our '}
									<a href='#'>{'social media toolkit'}</a>
									{'.'}
								</p>
							</>
						}
						imgAlt={cardTitles[0] as string}
						imgSrc='/assets/tmf-logo-sw-color.png'
					/>
				</Grid.Col>
				<Grid.Col lg={4} md={12}>
					<PreviewCard
						title={cardTitles[1] as string}
						text={
							<>
								<p>
									{
										'InReach is always looking for new resource suggestions on our free App. Know a place that is affirming and safe for transmasculine individuals?'
									}
								</p>
								<p>
									{'You can suggest a resource to be listed on the free Inreach App '}
									<a href={'#'}>{'here'}</a>
									{'.'}
								</p>
							</>
						}
						imgAlt={cardTitles[1] as string}
						imgSrc={'/assets/tmf-logo-sw-color.png'}
					/>
				</Grid.Col>
				<Grid.Col lg={4} md={12}>
					<PreviewCard
						title={cardTitles[2] as string}
						text={
							<>
								<p>
									{
										'Use the free InReach App to access safe independently verified legal, medical, mental health and social services near you.'
									}
								</p>
								<p>
									{'Click '}
									<a href='#'>{'here '}</a>
									{
										"and our transmasculine community 'sort by' filter will automatically apply to your search!"
									}
								</p>
							</>
						}
						imgAlt={cardTitles[1] as string}
						imgSrc={'/assets/tmf-logo-sw-color.png'}
					/>
				</Grid.Col>

				<Grid.Col pl='xl'>
					<BackHomeButton />
				</Grid.Col>
			</Grid>
		</Container>
	)
}

export default Act
