import { AspectRatio, Card, Center, Container, Grid, Text, Title } from '@mantine/core'
import { type GetStaticProps, type NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Trans, useTranslation } from 'next-i18next'

import { Banner } from '~/components/Banner/Banner'
import { getServerSideTranslations } from '~/server/i18n'
import AppImage from '~public/assets/act/app.png'
import ParticipateImage from '~public/assets/act/participate.png'
import SuggestImage from '~public/assets/act/suggest.png'

export const Act: NextPage = () => {
	const { t } = useTranslation()

	const commonComponents = {
		Title: <Title order={3} tt='uppercase' ta='center' my={16} fz={18}></Title>,
		Text: <Text></Text>,
	}

	return (
		<Container fluid p={'xl'}>
			<Head>
				<title>{t('page-title.general-template', { page: '$t(nav.act)' })}</title>
			</Head>
			<Banner titleKey='nav.act' />
			<Grid p='md'>
				<Grid.Col md={4}>
					<Center>
						<Card maw={450}>
							<Card.Section>
								<Center>
									<AspectRatio ratio={ParticipateImage.width / ParticipateImage.height} w={400}>
										<Image src={ParticipateImage} alt='' fill />
									</AspectRatio>
								</Center>
							</Card.Section>
							<Trans
								i18nKey='act.card1'
								components={{
									...commonComponents,
									Link: <Link href={{ pathname: '/' }}>.</Link>,
								}}
							/>
						</Card>
					</Center>
				</Grid.Col>
				<Grid.Col md={4}>
					<Center>
						<Card maw={450}>
							<Card.Section>
								<Center>
									<AspectRatio ratio={SuggestImage.width / SuggestImage.height} w={242} h={400}>
										<Image src={SuggestImage} alt='' fill />
									</AspectRatio>
								</Center>
							</Card.Section>
							<Trans
								i18nKey='act.card2'
								components={{
									...commonComponents,
									Link: <a href='https://app.inreach.org/suggest'>.</a>,
								}}
							/>
						</Card>
					</Center>
				</Grid.Col>
				<Grid.Col md={4}>
					<Center>
						<Card maw={450}>
							<Card.Section>
								<Center>
									<AspectRatio ratio={AppImage.width / AppImage.height} w={200} h={400}>
										<Image src={AppImage} alt='' fill />
									</AspectRatio>
								</Center>
							</Card.Section>
							<Trans
								i18nKey='act.card3'
								components={{
									...commonComponents,
									Link: <a href='https://app.inreach.org'>.</a>,
								}}
							/>
						</Card>
					</Center>
				</Grid.Col>
			</Grid>
		</Container>
	)
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	return {
		props: {
			...(await getServerSideTranslations(locale)),
		},
		revalidate: 60 * 60 * 24, // 24 hours
	}
}

export default Act
