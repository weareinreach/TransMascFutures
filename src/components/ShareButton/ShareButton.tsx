import { Button, createStyles, Menu, rem, useMantineTheme } from '@mantine/core'
import { useClipboard } from '@mantine/hooks'
import { showNotification } from '@mantine/notifications'
import { IconBrandFacebook, IconBrandX, IconLink, IconMail, IconShare } from '@tabler/icons-react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useCallback } from 'react'

const useStyles = createStyles((theme) => ({
	menuItem: {
		fontSize: theme.fontSizes.md,
		fontWeight: 500,
		color: theme.colors.gray[7],
		padding: `${rem(8)} ${rem(12)}`,
		'&:hover': {
			backgroundColor: theme.colors.gray[1],
		},
		display: 'flex',
		alignItems: 'center',
		gap: rem(8),
	},
}))

export const ShareButton = () => {
	const { classes } = useStyles()
	const theme = useMantineTheme()
	const { t } = useTranslation('common')
	const router = useRouter()
	const { asPath } = router
	const currentUrl = typeof window !== 'undefined' ? `${window.location.origin}${asPath}` : ''
	const pageTitle = t('share.seo')

	const clipboard = useClipboard({ timeout: 500 })

	const showCopiedNotification = useCallback(() => {
		showNotification({
			title: t('share.copy-link'),
			message: t('share.link-copied'),
			color: 'green',
			icon: <IconLink size={rem(18)} />,
		})
	}, [t])

	const handleShare = useCallback(
		async (platform: 'facebook' | 'x' | 'email' | 'link') => {
			switch (platform) {
				case 'facebook':
					window.open(
						`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
						'_blank',
						'noopener,noreferrer'
					)
					break
				case 'x':
					window.open(
						`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(pageTitle)}`,
						'_blank',
						'noopener,noreferrer'
					)
					break
				case 'email':
					window.location.href = `mailto:?subject=${encodeURIComponent(pageTitle)}&body=${encodeURIComponent(currentUrl)}`
					break
				case 'link':
					if (
						typeof navigator !== 'undefined' &&
						navigator.canShare instanceof Function &&
						navigator.canShare({ url: currentUrl })
					) {
						try {
							await navigator.share({ url: currentUrl, title: pageTitle })
						} catch (error) {
							if (error instanceof Error && error.name !== 'AbortError') {
								console.error('Web Share API failed, falling back to clipboard:', error)
								clipboard.copy(currentUrl)
								showCopiedNotification()
							}
						}
					} else {
						clipboard.copy(currentUrl)
						showCopiedNotification()
					}
					break
				default:
					break
			}
		},
		[currentUrl, pageTitle, clipboard, showCopiedNotification]
	)

	return (
		<Menu shadow='md' width={200} position='bottom-start'>
			<Menu.Target>
				<Button
					variant='shareWhite'
					leftIcon={<IconShare size={24} color={theme.other.colors.softBlack} />} // eslint-disable-line @typescript-eslint/no-unsafe-member-access
				>
					{t('nav.share')}
				</Button>
			</Menu.Target>

			<Menu.Dropdown>
				{/* Fix for @typescript-eslint/no-misused-promises */}
				<Menu.Item
					icon={<IconBrandFacebook size={rem(18)} />}
					onClick={() => void handleShare('facebook')}
					className={classes.menuItem}
				>
					{t('share.facebook')}
				</Menu.Item>
				<Menu.Item
					icon={<IconBrandX size={rem(18)} />}
					onClick={() => void handleShare('x')}
					className={classes.menuItem}
				>
					{t('share.twitter')}
				</Menu.Item>
				<Menu.Item
					icon={<IconMail size={rem(18)} />}
					onClick={() => void handleShare('email')}
					className={classes.menuItem}
				>
					{t('share.email')}
				</Menu.Item>
				<Menu.Item
					icon={<IconLink size={rem(18)} />}
					onClick={() => void handleShare('link')}
					className={classes.menuItem}
				>
					{t('share.copy-link')}
				</Menu.Item>
			</Menu.Dropdown>
		</Menu>
	)
}
