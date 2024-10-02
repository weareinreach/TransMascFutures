import {
	AspectRatio,
	Button,
	Center,
	Container,
	Grid,
	GridCol,
	List,
	ListItem,
	Stack,
	Text,
} from '@mantine/core'
import { Image } from '~/app/_components/Image'
import { Banner } from '~/app/_components/Banner'
import ShareImage from '~public/assets/share.jpg'

import { initTranslations } from '~/app/i18n'
import classes from './page.module.css'
import type { Metadata } from 'next'

export const generateMetadata = async ({ params: { locale } }: PageProps): Promise<Metadata> => {
	const { t } = await initTranslations(locale, ['common'])
	return {
		title: t('page-title.general-template', { page: t('nav.share') }),
	}
}

const Share = async ({ params: { locale } }: PageProps) => {
	const { t } = await initTranslations(locale, ['common'])

	return (
		<Container fluid>
			<Banner titleKey='nav.share' t={t} />
			<Grid>
				<GridCol span={{ sm: 6 }}>
					{/* <Stack justify='center' align='center'>
						<h2 className={classes.header}>{t('nav.share')}</h2> */}
					<Center>
						<AspectRatio ratio={3 / 4} w={`min(calc(${ShareImage.height}px * .75), calc(70vh *.75))`}>
							<Image
								src={ShareImage}
								style={{ marginBottom: '50px' }}
								alt='individual representing transmasc futures'
								h='100%'
								fit='contain'
							/>
						</AspectRatio>
					</Center>
					{/* </Stack> */}
				</GridCol>
				<GridCol span={{ sm: 6 }} h='100%' my='auto'>
					<Stack className={classes.content} align='center'>
						<Stack gap={8}>
							<Text className={classes.shareTitle}>{t('share.title')}</Text>
							<Text className={classes.shareSubtitle}>{t('share.subtitle')}</Text>
						</Stack>
						<List py={20} icon='🏳️‍⚧️' classNames={{ item: classes.listItem }}>
							<ListItem>{t('share.list1')}</ListItem>
							<ListItem>{t('share.list2')}</ListItem>
						</List>
					</Stack>
					<Stack w='100%' align='center' gap={20}>
						<Button component='a' href='/assets/media-kit.zip' target='_blank' rel='noopener noreferrer'>
							{t('share.download-button')}
						</Button>
						<Button
							component='a'
							href='https://glaad.org/inreach-and-glaad-launch-the-transmascfutures-campaign'
							target='_blank'
							rel='noopener noreferrer'
							variant='secondary'
							classNames={{ label: classes.pressReleaseBtn }}
						>
							{t('share.press-release')}
						</Button>
					</Stack>
				</GridCol>
			</Grid>
		</Container>
	)
}

export default Share
type PageProps = {
	params: {
		locale: string
	}
}
