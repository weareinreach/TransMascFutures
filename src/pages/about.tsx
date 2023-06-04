import { AspectRatio, Container, createStyles, Flex, rem, SimpleGrid, Text, Title } from '@mantine/core'
import { type GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'

import { StatisticCard } from '~/components/statisticCard/StatisticCard'
import { getServerSideTranslations } from '~/server/i18n'
import Logo from '~public/assets/tmf-logo-rect-bw-cropped.png'

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
			<Title className={classes.title} order={2}>
				{t('nav.about')}
			</Title>
			<AspectRatio ratio={723 / 174} my={40} mx='auto' maw='70vw'>
				<Image src={Logo} alt={t('logo-alt')} fill />
			</AspectRatio>
			<Flex className={classes.statistics}>
				<StatisticCard title={'59%'} text={'of trans men and masculine youth have considered suicide.'} />
				<StatisticCard title={'1 in 5'} text={'transgender and nonbinary youth have attempted suicide.'} />
				<StatisticCard title={'36%'} text={'of the U.S. trans population identify as trans men.'} />
			</Flex>
			<Text fz='lg' className={classes.description}>
				This trans-led digital campaign by InReach in partnership with GLAAD&apos;s Transgender media team
				seeks to increase positive visibility of transmasculine people, while increasing access to safe,
				verified resources for the diverse transmasculine community.
			</Text>
			<Flex direction='column' align='center'>
				<Title order={1}>Supporting Partners</Title>
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
