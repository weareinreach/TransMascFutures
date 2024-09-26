'use client'
import { Menu, MenuTarget, MenuItem, MenuDropdown, Text, Group } from '@mantine/core'
import i18nConfig from '~/i18nConfig'
import { IconLanguage } from '@tabler/icons-react'
import classes from './LangPick.module.css'
import { useTranslation } from 'react-i18next'
import { useSearchParams, useSelectedLayoutSegments } from 'next/navigation'
import { changeLocale } from './server-actions'

export const LangPick = () => {
	const langs = i18nConfig.locales.map((locale) => ({
		displayText: new Intl.DisplayNames(locale, { type: 'language' }).of(locale),
		locale,
	}))
	const {
		i18n: { resolvedLanguage },
	} = useTranslation()
	const currentLocale = resolvedLanguage ?? i18nConfig.defaultLocale
	const currentLanguage = new Intl.DisplayNames(currentLocale, { type: 'language' }).of(currentLocale)
	const pathSegments = useSelectedLayoutSegments()
	const currentSearchParams = useSearchParams()
	const langItems = langs.map(({ displayText, locale }) => {
		const newSearchParams =
			currentSearchParams.toString().length === 0 ? undefined : currentSearchParams.toString()
		const newPath = `/${locale}/${pathSegments.join('/')}`
		const newHref = newSearchParams ? [newPath, newSearchParams].join('?') : newPath

		return (
			<MenuItem key={locale} onClick={() => changeLocale(locale, `/${pathSegments.join('/')}`)}>
				{displayText}
			</MenuItem>
		)
	})

	return (
		<Menu classNames={{ item: classes.item, itemLabel: classes.itemLabel }}>
			<MenuTarget>
				<Group className={classes.target}>
					<IconLanguage size={24} />
					<Text tt='uppercase' fw={600} fz={14}>
						{currentLanguage}
					</Text>
				</Group>
			</MenuTarget>
			<MenuDropdown>{langItems}</MenuDropdown>
		</Menu>
	)
}
