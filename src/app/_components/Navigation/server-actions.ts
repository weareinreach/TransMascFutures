'use server'
import { cookies } from 'next/headers'
import { redirect, RedirectType } from 'next/navigation'

export const changeLocale = async (locale: string, path: string) => {
	console.log(locale, path)
	cookies().set('NEXT_LOCALE', locale)
	redirect(path, RedirectType.replace)
}
