/* eslint-disable turbo/no-undeclared-env-vars */
// @ts-check
import bundleAnalyze from '@next/bundle-analyzer'
import nextRoutes from 'nextjs-routes/config'

import i18nConfig from './next-i18next.config.js'
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful for
 * Docker builds.
 */
// eslint-disable-next-line turbo/no-undeclared-env-vars
!process.env.SKIP_ENV_VALIDATION && (await import('./src/env/server.mjs'))

const withRoutes = nextRoutes({ outDir: 'src/types' })
const withBundleAnalyzer = bundleAnalyze({ enabled: process.env.ANALYZE === 'true' })

/** @type {import('next').NextConfig} */
const config = {
	i18n: i18nConfig.i18n,
	reactStrictMode: true,
	swcMinify: true,
	compiler: {
		...(process.env.VERCEL_ENV === 'production' ? { removeConsole: { exclude: ['error'] } } : {}),
	},
	images: {
		remotePatterns: [{ protocol: 'https', hostname: 'placehold.co', pathname: '/**' }],
		// domains: ['placehold.co'],
	},
	eslint: { ignoreDuringBuilds: process.env.VERCEL_ENV !== 'production' },
	typescript: { ignoreBuildErrors: process.env.VERCEL_ENV !== 'production' },
}
/**
 * Wraps NextJS config with the Bundle Analyzer config.
 *
 * @param {typeof config} config
 * @returns {typeof config}
 */
function defineNextConfig(config) {
	return withBundleAnalyzer(withRoutes(config))
}

export default defineNextConfig(config)
