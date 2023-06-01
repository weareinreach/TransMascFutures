import { createStyles, Flex, Image, List, Stack, rem } from '@mantine/core'
import Link from 'next/link'

import { Button } from '../components/Button/Button'

const SharePage = ({ image }: Props) => {
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

	const { classes } = useStyles()
	return (
		<Stack style={{ gap: 0, margin: '25px 50px' }}>
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
					<Image src={'/assets/tmf-logo-rect-bw.png'} alt='transmasc logo' />
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
export default SharePage
