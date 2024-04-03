import { AspectRatio, Flex, Title } from '@mantine/core'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'

import Logo from '~public/assets/tmf-logo-rect-bw-cropped.png'

export const Banner = ({ titleKey }: BannerProp) => {
	const { t } = useTranslation()
	return (
		<Flex w='100%' justify='space-apart' align='center'>
			<Title order={1} tt='uppercase' pl={40} py={20} mx='auto' fz={{ base: 20, xs: 24 }} lts={4}>
				{t(titleKey)}
			</Title>
			<AspectRatio ratio={723 / 174} my={40} mx='auto' maw={750} w='50%'>
				<Image src={Logo} alt={t('logo-alt')} fill />
			</AspectRatio>
		</Flex>
	)
}

type BannerProp = { titleKey: string }
