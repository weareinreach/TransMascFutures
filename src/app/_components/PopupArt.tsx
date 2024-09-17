'use client'

import { Modal, useMantineTheme } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { getArtData } from '~/data/artwork'
import { ArtItem } from '~/app/_components/ArtItem'

import classes from './PopupArt.module.css'

export const PopupArt = () => {
	const router = useRouter()
	const searchParams = useSearchParams()
	const artistFromUrl = searchParams.get('artist')
	const { t } = useTranslation(['common', 'art'])
	const theme = useMantineTheme()
	const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`)

	const popupArt = useMemo(() => {
		if (!artistFromUrl) {
			return null
		}
		return getArtData(artistFromUrl)
	}, [artistFromUrl])

	const handleClose = useCallback(() => router.replace('/gallery', { scroll: false }), [router])

	return (
		<Modal
			opened={!!popupArt}
			onClose={handleClose}
			size='75vw'
			centered
			overlayProps={{ blur: 2 }}
			closeButtonProps={{ size: isMobile ? 'xl' : 'lg' }}
			radius='xl'
			fullScreen={isMobile}
			classNames={{ content: classes.popupModalContent }}
		>
			{popupArt && (
				<ArtItem
					name={popupArt.artist}
					image={popupArt.src}
					alt={t(`art:${popupArt.slug}-alt-text`, { defaultValue: '' })}
					description={t(`art:${popupArt.slug}-description`, { defaultValue: '' })}
				/>
			)}
		</Modal>
	)
}
