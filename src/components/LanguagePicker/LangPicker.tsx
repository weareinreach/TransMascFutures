// src/components/LanguagePicker/LangPicker.tsx

import { createStyles, Flex, Menu, rem, Text, UnstyledButton, type UnstyledButtonProps } from '@mantine/core'
import { IconLanguage } from '@tabler/icons-react'
import { hasCookie, setCookie } from 'cookies-next'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { forwardRef, useCallback, useEffect, useMemo } from 'react'

import { type LocaleCodes, translatedLangs } from '../../data/languages'

const useStyles = createStyles((theme) => ({
	menuTargetButton: {
		fontWeight: 600,
		backgroundColor: 'transparent',
		border: 'none',
		padding: `${rem(4)} ${rem(12)}`,
		borderRadius: theme.spacing.sm,
		height: rem(56),
		color: theme.colors.gray[0],
		'&:hover': {
			backgroundColor: theme.other.colors.darkGray, // eslint-disable-line @typescript-eslint/no-unsafe-member-access
			cursor: 'pointer',
		},
		'&[data-expanded]': {
			backgroundColor: theme.other.colors.darkGray, // eslint-disable-line @typescript-eslint/no-unsafe-member-access
		},
	},

	menuItem: {
		fontSize: theme.fontSizes.md,
		fontWeight: 500,
		color: `${theme.colors.dark[9]} !important`,
		padding: `${rem(16)} ${rem(32)}`,
		...theme.fn.hover({
			backgroundColor: theme.colors.gray[1],
			cursor: 'pointer',
		}),
	},
}))

const MenuTarget = forwardRef<HTMLButtonElement, UnstyledButtonProps & { activeLang: string | undefined }>(
	({ activeLang, ...props }, ref) => {
		const { classes, theme } = useStyles()
		return (
			<UnstyledButton ref={ref} {...props} className={classes.menuTargetButton}>
				<Flex align='center' gap='xs'>
					<IconLanguage size={20} color={theme.colors.gray[0]} />
					<Text fz={theme.fontSizes.md} fw={600} color={theme.colors.gray[0]}>
						{activeLang}
					</Text>
				</Flex>
			</UnstyledButton>
		)
	}
)
MenuTarget.displayName = 'MenuTarget'

export const LangPicker = () => {
	const { classes } = useStyles()
	const { i18n } = useTranslation()
	const router = useRouter()
	const currentLanguage = router.locale

	const activeLang = useMemo(
		() => translatedLangs.find((lang) => lang.localeCode === currentLanguage)?.nativeName,
		[currentLanguage]
	)

	const handleLanguageChange = useCallback(
		(newLocale: LocaleCodes) => () => {
			// Destructure pathname, query, asPath from router here
			const { pathname, query, asPath } = router // <-- Add this line

			void i18n.changeLanguage(newLocale)
			// eslint-disable-next-line @typescript-eslint/no-floating-promises
			setCookie('NEXT_LOCALE', newLocale)
			void router.replace({ pathname, query }, asPath, { locale: newLocale })
		},
		[i18n, router] // Dependencies are still correct
	)

	const menuItems = useMemo(
		() =>
			translatedLangs.map((lang) => (
				<Menu.Item key={lang.localeCode} onClick={handleLanguageChange(lang.localeCode)}>
					{lang.nativeName}
				</Menu.Item>
			)),
		[handleLanguageChange]
	)

	useEffect(() => {
		if (!hasCookie('NEXT_LOCALE') && currentLanguage) {
			// eslint-disable-next-line @typescript-eslint/no-floating-promises
			setCookie('NEXT_LOCALE', currentLanguage)
		}
	}, [currentLanguage])

	return (
		<Menu
			trigger='hover'
			classNames={{
				item: classes.menuItem,
			}}
			position='bottom-start'
			transitionProps={{
				transition: 'scale-y',
			}}
			radius='sm'
			shadow='xs'
		>
			<Menu.Target>
				<MenuTarget activeLang={activeLang} />
			</Menu.Target>
			<Menu.Dropdown>{menuItems}</Menu.Dropdown>
		</Menu>
	)
}
