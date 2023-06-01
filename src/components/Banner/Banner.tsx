import { AspectRatio, Container, Grid, Title } from '@mantine/core'
import Image from 'next/image'

export const Banner = ({ title }: BannerProp) => {
	return (
		<Container fluid p={'xl'}>
			<Grid px='xl'>
				<Grid.Col pl='xl' lg={3} md={12}>
					<Title fw={900} order={1} size='30px !important' tt='uppercase'>
						{title}
					</Title>
				</Grid.Col>
				<Grid.Col span='auto'>
					<AspectRatio ratio={800 / 300}>
						<Image src='/assets/tmf-logo-rect-bw.png' alt='transmasc logo' width={800} height={300} />
					</AspectRatio>
				</Grid.Col>
				<Grid.Col lg={3} md={12}></Grid.Col>
			</Grid>
		</Container>
	)
}

type BannerProp = { title: string }
