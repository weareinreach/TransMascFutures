/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
	AspectRatio,
	Center,
	Container,
	createStyles,
	Divider,
	em,
	Flex,
	Grid,
	Group,
	rem,
	Stack,
	Text,
	Title,
	useMantineTheme,
} from '@mantine/core'
import { type GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Trans, useTranslation } from 'next-i18next'

import { Banner } from '~/components/Banner/Banner'
import { StatisticCard } from '~/components/statisticCard/StatisticCard'
import { getPartnerImage, partnerImages } from '~/data/partners'
import { getServerSideTranslations } from '~/server/i18n'
import { api } from '~/utils/api'
import { trpcServerClient } from '~/utils/ssr'

const useStyles = createStyles((theme) => ({
	title: {
		fontWeight: 'bold',
		textTransform: 'uppercase',
	},
	image: {
		margin: '0 auto -25px',
		width: rem(500),

		[theme.fn.smallerThan('sm')]: {
			width: rem(300),
			height: 'auto',
		},
	},
	statistics: {
		// borderBottom: `${rem(10)} solid ${theme.other.colors.glaadGray}`,
		flexWrap: 'nowrap',
		[theme.fn.smallerThan('sm')]: {
			flexDirection: 'column',
			alignItems: 'center',
		},
	},
	description: {
		paddingTop: '1rem',
	},
	partners: {
		[theme.fn.smallerThan('sm')]: {
			flexDirection: 'column',
			alignItems: 'center',
		},
	},
	partnerImage: {
		width: rem(300),
		[theme.fn.smallerThan('md')]: {
			width: rem(200),
		},
		[theme.fn.smallerThan('xs')]: {
			width: rem(150),
		},
		[theme.fn.smallerThan(em(450))]: {
			width: rem(125),
		},
	},
	partnerGrid: {
		alignItems: 'center',
		justifyItems: 'center',
	},
	partnerHollister: {
		width: rem(600),
		[theme.fn.smallerThan('md')]: {
			width: rem(400),
		},
		[theme.fn.smallerThan('xs')]: {
			width: rem(200),
		},
	},
}))
const AboutPage = () => {
	const { t } = useTranslation()
	const { classes } = useStyles()
	const theme = useMantineTheme()
	const { data: partners } = api.partner.getAll.useQuery()
	return (
		<>
			<Head>
				<title>{t('page-title.general-template', { page: '$t(nav.about)' })}</title>
			</Head>
			<Banner titleKey='nav.about' />
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
								Link1: <a href='https://www.inreach.org' target='_blank' rel='noopener noreferrer'></a>,
								Link2: <a href='https://www.glaad.org' target='_blank' rel='noopener noreferrer'></a>,
								Link3: <a href='https://app.inreach.org' target='_blank' rel='noopener noreferrer'></a>,
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
			<Divider size={10} color={theme.other.colors.glaadGray} my={40} mx={{ lg: 80, base: 15, xs: 40 }} />
			<Flex direction='column' align='center' w='100%'>
				<Title order={2} mb={40}>
					{t('about.supporting-partners')}
				</Title>
				<Grid grow mx='auto' gutter={20}>
					{partners &&
						partners.map(({ id, href, name, order, tag }) => {
							const image = getPartnerImage(tag)
							if (!image) return null
							return (
								<Grid.Col
									key={id}
									span={6}
									md={4}
									// className={classes.partnerImage}
								>
									<Center inline w='100%' h='100%'>
										<a href={href} target='_blank' rel='noopener noreferrer'>
											<AspectRatio ratio={image.width / image.height} className={classes.partnerImage}>
												<Image src={image} alt={name} fill />
											</AspectRatio>
										</a>
									</Center>
								</Grid.Col>
							)
						})}
				</Grid>

				<Trans
					i18nKey='about.hollister'
					components={{
						Title: (
							<Text my={40} ta='center' mx={{ lg: 0, base: 10, xs: 50, [em(450)]: 60 }} fw={500} fz={20}>
								.
							</Text>
						),
						Link: (
							<a
								href='https://www.hollisterco.com/shop/us/purpose'
								target='_blank'
								rel='noopener noreferrer'
							></a>
						),
					}}
				/>
				<Center>
					<AspectRatio
						ratio={partnerImages.hollister.width / partnerImages.hollister.height}
						className={classes.partnerHollister}
					>
						<a href='https://www.hollisterco.com/shop/us/purpose' target='_blank' rel='noopener noreferrer'>
							<Image src={partnerImages.hollister} alt='The Hollister Confidence Fund' fill />
						</a>
					</AspectRatio>
				</Center>
			</Flex>
		</>
	)
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	const ssg = await trpcServerClient({ session: null })

	const [i18n] = await Promise.allSettled([getServerSideTranslations(locale), ssg.partner.getAll.prefetch()])

	return {
		props: {
			trpcState: ssg.dehydrate(),
			...(i18n.status === 'fulfilled' ? i18n.value : {}),
		},
		revalidate: 60 * 60 * 24 * 7, // 1 week
	}
}
export default AboutPage
