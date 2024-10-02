'use server'
import { cookies } from 'next/headers'
import { redirect, RedirectType } from 'next/navigation'

export const changeLocale = async (locale: string, path: string) => {
	cookies().set('NEXT_LOCALE', locale)
	redirect(path, RedirectType.replace)
}
