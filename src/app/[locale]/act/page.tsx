import { AspectRatio, Card, CardSection, Center, Container, Grid, GridCol, Text, Title } from '@mantine/core'

import { initTranslations } from '~/app/i18n'
import { Trans } from '~/app/_components/Trans'

import { Image } from '~/app/_components/Image'
import Link from 'next/link'
import { Banner } from '~/app/_components/Banner'

import AppImage from '~public/assets/act/app.png'
import ParticipateImage from '~public/assets/act/participate.png'
import SuggestImage from '~public/assets/act/suggest.png'
import type { Metadata } from 'next'

export const generateMetadata = async ({ params: { locale } }: PageProps): Promise<Metadata> => {
	const { t } = await initTranslations(locale, ['common'])
	return {
		title: t('page-title.general-template', { page: t('nav.act') }),
	}
}

const Act = async ({ params: { locale } }: PageProps) => {
	const { t } = await initTranslations(locale, ['common'])
	const commonComponents = {
		Title: <Title order={3} tt='uppercase' ta='center' my={16} fz={18}></Title>,
		Text: <Text></Text>,
	}
	return (
		<Container fluid p={'xl'}>
			<Banner titleKey='nav.act' t={t} />
			<Grid p='md'>
				<GridCol span={{ md: 4 }}>
					<Center>
						<Card maw={450} h='100%'>
							<CardSection>
								<Center h={400}>
									<AspectRatio ratio={ParticipateImage.width / ParticipateImage.height} w={400}>
										<Link href={{ pathname: '/survey' }}>
											<Image src={ParticipateImage} alt='' h='100%' fit='contain' />
										</Link>
									</AspectRatio>
								</Center>
							</CardSection>
							<Trans
								i18nKey='act.card1'
								components={{
									...commonComponents,
									Link: <Link href={{ pathname: '/survey' }}>.</Link>,
								}}
							/>
						</Card>
					</Center>
				</GridCol>
				<GridCol span={{ md: 4 }}>
					<Center>
						<Card maw={450}>
							<CardSection>
								<Center h={400}>
									<AspectRatio ratio={SuggestImage.width / SuggestImage.height} w={300} h={400}>
										<a href='https://app.inreach.org/suggest'>
											<Image src={SuggestImage} alt='' h='100%' fit='contain' />
										</a>
									</AspectRatio>
								</Center>
							</CardSection>
							<Trans
								i18nKey='act.card2'
								components={{
									...commonComponents,
									Link: <a href='https://app.inreach.org/suggest'>.</a>,
								}}
							/>
						</Card>
					</Center>
				</GridCol>
				<GridCol span={{ md: 4 }}>
					<Center>
						<Card maw={450}>
							<CardSection>
								<Center h={400}>
									<AspectRatio ratio={AppImage.width / AppImage.height} w={200} h={400}>
										<a href='https://app.inreach.org'>
											<Image src={AppImage} alt='' h='100%' fit='contain' />
										</a>
									</AspectRatio>
								</Center>
							</CardSection>
							<Trans
								i18nKey='act.card3'
								components={{
									...commonComponents,
									Link: <a href='https://app.inreach.org'>.</a>,
								}}
							/>
						</Card>
					</Center>
				</GridCol>
			</Grid>
		</Container>
	)
}

export default Act
type PageProps = {
	params: {
		locale: string
	}
}
