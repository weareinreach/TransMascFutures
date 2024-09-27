'use client'

import { Text } from '@mantine/core'
import { useTranslation } from 'react-i18next'
import { usePathname } from 'next/navigation'
import classes from './ArtistCredit.module.css'

export const ArtistCredit = () => {
	const pathname = usePathname()
	const { t } = useTranslation('common')
	const isHome = ['/', '/fr', '/es'].includes(pathname)

	if (!isHome) {
		return null
	}

	return <Text className={classes.text}>{t('artist-credit')}</Text>
}
