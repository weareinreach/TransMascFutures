import {
	AspectRatio,
	Container,
	Divider,
	Flex,
	Grid,
	GridCol,
	Group,
	Stack,
	Text,
	Title,
} from '@mantine/core'

import { type Metadata } from 'next'
import Link from 'next/link'
import { initTranslations } from '~/app/i18n'
import { HydrateClient, api } from '~/trpc/server'
import classes from './page.module.css'

import { Banner } from '~/app/_components/Banner'
import { Image } from '~/app/_components/Image'
import { StatisticCard } from '~/app/_components/StatisticCard'
import { Trans } from '~/app/_components/Trans'

import { getPartnerImage, partnerImages } from '~/data/partners'

export const generateMetadata = async ({ params: { locale } }: PageProps): Promise<Metadata> => {
	const { t } = await initTranslations(locale, ['common'])
	return {
		title: t('page-title.general-template', { page: t('nav.about') }),
	}
}

const AboutPage = async ({ params: { locale } }: PageProps) => {
	const { t } = await initTranslations(locale, ['common'])
	const partners = await api.partner.getAll()

	return (
		<HydrateClient>
			<Banner titleKey='nav.about' t={t} />
			<Container>
				<Stack className={classes.statistics} align='center' justify='center' mx='auto'>
					<Group className={classes.statistics}>
						<StatisticCard title={t('about.stats.stat1-title')} text={t('about.stats.stat1-text')} />
						<StatisticCard title={t('about.stats.stat2-title')} text={t('about.stats.stat2-text')} />
						<StatisticCard title={t('about.stats.stat3-title')} text={t('about.stats.stat3-text')} />
					</Group>
					<Text
						fz={{ md: 'lg' }}
						className={classes.description}
						mx={{ lg: 0, base: 10, xs: 50 }}
						fs='oblique'
						fw={500}
					>
						<Trans
							i18nKey='about.campaign'
							components={{
								// @ts-expect-error props are passed in from json string
								Link: <Link />,
							}}
						/>
					</Text>
					<Text
						fz={{ md: 'lg' }}
						className={classes.description}
						mx={{ lg: 0, base: 10, xs: 50 }}
						fs='oblique'
						fw={600}
					>
						{t('about.trans-people')}
					</Text>
				</Stack>
			</Container>
			<Divider size={10} className={classes.divider} my={40} mx={{ lg: 80, base: 15, xs: 40 }} />
			<Flex direction='column' align='center' w='100%'>
				<Title order={2} mb={40}>
					{t('about.supporting-partners')}
				</Title>
				<Grid grow mx='auto' gutter={20} mb={40}>
					{Boolean(partners?.length) &&
						partners?.map(({ id, href, name, tag }) => {
							const image = getPartnerImage(tag)
							if (!image) {
								return null
							}
							return (
								<GridCol key={id} span={{ base: 6, md: 4 }} className={classes.partnerGrid}>
									<a href={href} target='_blank' rel='noopener noreferrer'>
										<AspectRatio ratio={image.width / image.height} className={classes.partnerImage}>
											<Image src={image} alt={name} fit='contain' />
										</AspectRatio>
									</a>
								</GridCol>
							)
						})}
				</Grid>

				<Title order={2} mb={40}>
					{t('about.supporting-funders')}
				</Title>
				<Grid grow mx='auto' gutter={20} w='100%'>
					<GridCol span={6} className={classes.featPartnerGrid}>
						<AspectRatio
							ratio={partnerImages.hollister.width / partnerImages.hollister.height}
							className={classes.partnerHollister}
						>
							<a href='https://www.hollisterco.com/shop/us/purpose' target='_blank' rel='noopener noreferrer'>
								<Image
									src={partnerImages.hollister}
									alt='The Hollister Confidence Fund'
									h='100%'
									fit='contain'
								/>
							</a>
						</AspectRatio>
					</GridCol>
					<GridCol span={6} className={classes.featPartnerGrid}>
						<AspectRatio
							ratio={partnerImages.lush.width / partnerImages.lush.height}
							className={classes.partnerHollister}
						>
							<a
								href='https://www.lush.com/us/en_us/a/how-lush-gives-back'
								target='_blank'
								rel='noopener noreferrer'
							>
								<Image src={partnerImages.lush} alt='LUSH Retail' h='100%' fit='contain' />
							</a>
						</AspectRatio>
					</GridCol>
				</Grid>
			</Flex>
		</HydrateClient>
	)
}

export default AboutPage

type PageProps = {
	params: {
		locale: string
	}
}
