import { cookies } from 'next/headers'
import i18nConfig from '~/i18nConfig'

export const getLocale = () => cookies().get('NEXT_LOCALE')?.value ?? i18nConfig.defaultLocale
