// @ts-check
import i18nConfig from './next-i18next.config.js'
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful for
 * Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import('./src/env/server.mjs'))

/** @type {import('next').NextConfig} */
const config = {
	i18n: i18nConfig.i18n,
	reactStrictMode: true,
	swcMinify: true,
}
export default config
