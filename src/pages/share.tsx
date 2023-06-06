import {
	AspectRatio,
	Button,
	Center,
	Container,
	createStyles,
	em,
	Grid,
	List,
	rem,
	Stack,
	Text,
} from '@mantine/core'
import { type GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'

import { Banner } from '~/components'
import { getServerSideTranslations } from '~/server/i18n'
import ShareImage from '~public/assets/share.jpg'

const useStyles = createStyles((theme) => ({
	header: {
		textTransform: 'uppercase',
	},

	content: {
		textAlign: 'center',
		gap: rem(20),
		[theme.fn.largerThan('md')]: {
			gap: rem(60),
		},
	},
	listItem: {
		fontSize: rem(20),
		textAlign: 'start',
		[theme.fn.smallerThan('md')]: {
			fontSize: rem(16),
		},
		[theme.fn.smallerThan(em(820))]: {
			fontSize: rem(14),
		},
		[theme.fn.smallerThan('sm')]: {
			fontSize: rem(16),
		},
	},
}))
const SharePage = () => {
	const { t } = useTranslation()
	const { classes } = useStyles()
	return (
		<>
			<Head>
				<title>{t('page-title.general-template', { page: '$t(nav.share)' })}</title>
			</Head>
			{/* <Group style={{ gap: 0, margin: '25px 50px' }}> */}
			<Container fluid>
				<Banner titleKey='nav.share' />
				<Grid>
					<Grid.Col sm={6}>
						{/* <Stack justify='center' align='center'>
						<h2 className={classes.header}>{t('nav.share')}</h2> */}
						<Center>
							<AspectRatio ratio={3 / 4} w={`min(calc(${ShareImage.height}px * .75), calc(70vh *.75))`}>
								<Image
									src={ShareImage}
									style={{ marginBottom: '50px' }}
									alt='individual representing transmasc futures'
								/>
							</AspectRatio>
						</Center>
						{/* </Stack> */}
					</Grid.Col>
					<Grid.Col sm={6} h='100%' my='auto'>
						<Stack className={classes.content} align='center'>
							<Stack spacing={8}>
								<Text fz={{ base: rem(20), md: rem(24) }} tt='uppercase' fw={600}>
									{t('share.title')}
								</Text>
								<Text
									// style={{ fontSize: '1.4rem', fontStyle: 'italic', fontWeight: 'bold', margin: 0 }}
									fz={{ base: rem(18), md: rem(22) }}
									fs='italic'
									fw={600}
								>
									{t('share.subtitle')}
								</Text>
							</Stack>
							<List py={20} icon='🏳️‍⚧️' classNames={{ item: classes.listItem }}>
								<List.Item>{t('share.list1')}</List.Item>
								<List.Item>{t('share.list2')}</List.Item>
							</List>
							<Button component='a' href='/assets/media-kit.zip' target='_blank' rel='noopener noreferrer'>
								{t('share.download-button')}
							</Button>
						</Stack>
					</Grid.Col>
				</Grid>
			</Container>
		</>
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
export default SharePage
