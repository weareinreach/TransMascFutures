import { AspectRatio, Button, createStyles, Flex, List, rem, Stack } from '@mantine/core'
import { type GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'

import { getServerSideTranslations } from '~/server/i18n'
import Logo from '~public/assets/tmf-logo-rect-bw.png'

const useStyles = createStyles((theme) => ({
	header: {
		textTransform: 'uppercase',
	},

	flexWrapper: {
		padding: `${rem(0)} ${rem(15)}`,
		['& *']: {
			flex: 1,
		},
		[theme.fn.smallerThan('md')]: {
			flexDirection: 'column',
		},
	},
	content: {
		gap: rem(0),
		margin: rem(0),
		padding: `${rem(0)} ${rem(25)}`,
		textAlign: 'center',
	},
	downloadText: {
		margin: rem(0),
		textTransform: 'uppercase',
		fontSize: '1.5rem',
		fontWeight: 'bold',
	},
	listItem: {
		fontSize: '1.2rem',
		listStyleType: 'none',
	},
}))
const SharePage = ({ image }: Props) => {
	const { t } = useTranslation()
	const { classes } = useStyles()
	return (
		<Stack style={{ gap: 0, margin: '25px 50px' }}>
			<Head>
				<title>{t('page-title.general-template', { page: '$t(nav.share)' })}</title>
			</Head>
			<h2 className={classes.header}>Share</h2>
			<Flex className={classes.flexWrapper} direction='row' align='center'>
				<Stack>
					<Image
						src={image}
						style={{ marginBottom: '50px' }}
						alt='individual representing transmasc futures'
					/>
					<Link href='/'>
						<Button>Back to Home</Button>
					</Link>
				</Stack>
				<Stack className={classes.content} align='center'>
					<AspectRatio ratio={723 / 174} my={40} mx='auto' maw='70vw'>
						<Image src={Logo} alt={t('logo-alt')} fill />
					</AspectRatio>
					<p className={classes.downloadText} style={{ margin: 0 }}>
						Download our #transmascfutures social media toolkit.
					</p>
					<p style={{ fontSize: '1.4rem', fontStyle: 'italic', fontWeight: 'bold', margin: 0 }}>
						For your sharing convenience:
					</p>
					<List style={{ marginBottom: '25px' }}>
						<List.Item className={classes.listItem}>&gt; Three 1080 x1080 PNG Graphics</List.Item>
						<List.Item className={classes.listItem}>
							&gt; Word document with recommended sharing language
						</List.Item>
						<List.Item className={classes.listItem}>&gt; Press packet</List.Item>
					</List>
					<Button>Download ZIP File</Button>
				</Stack>
			</Flex>
		</Stack>
	)
}

type Props = {
	image: string
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
