import { AspectRatio, Container, createStyles, Flex, rem, SimpleGrid, Text, Title } from '@mantine/core'
import { type GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'

import { Banner } from '~/components/Banner/Banner'
import { StatisticCard } from '~/components/statisticCard/StatisticCard'
import { getServerSideTranslations } from '~/server/i18n'

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
		borderBottom: `${rem(10)} solid ${theme.other.colors.glaadGray}`,

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
}))
const AboutPage = ({ partners }: AboutPageProps) => {
	const { t } = useTranslation()
	const { classes } = useStyles()
	return (
		<Container>
			<Head>
				<title>{t('page-title.general-template', { page: '$t(nav.about)' })}</title>
			</Head>
			<Banner titleKey='nav.about' />

			<Flex className={classes.statistics}>
				<StatisticCard title={t('about.stats.stat1-title')} text={t('about.stats.stat1-text')} />
				<StatisticCard title={t('about.stats.stat2-title')} text={t('about.stats.stat2-text')} />
				<StatisticCard title={t('about.stats.stat3-title')} text={t('about.stats.stat3-text')} />
			</Flex>
			<Text fz='lg' className={classes.description}>
				{t('about.campaign')}
			</Text>
			<Flex direction='column' align='center'>
				<Title order={2}>{t('about.supporting-partners')}</Title>
				<SimpleGrid cols={4} breakpoints={[{ maxWidth: 600, cols: 1 }]}>
					{partners &&
						partners.map((partner, index) => (
							<a href={partner.link} key={index}>
								<Image src={partner.logo} alt='partner logo' />
							</a>
						))}
				</SimpleGrid>
			</Flex>
		</Container>
	)
}

type AboutPageProps = {
	partners: { logo: string; link: string }[]
}
export const getStaticProps: GetStaticProps = async ({ locale }) => {
	return {
		props: {
			...(await getServerSideTranslations(locale)),
		},
		revalidate: 60 * 60 * 24, // 24 hours
	}
}
export default AboutPage
