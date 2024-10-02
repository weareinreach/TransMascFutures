/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
// @ts-check
import bundleAnalyze from '@next/bundle-analyzer'
import { RelativeCiAgentWebpackPlugin } from '@relative-ci/agent'
import { I18NextHMRPlugin } from 'i18next-hmr/webpack'

import path from 'path'
import { fileURLToPath } from 'url'

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful for
 * Docker builds.
 */

// eslint-disable-next-line @typescript-eslint/no-unused-expressions
!process.env.SKIP_ENV_VALIDATION && (await import('./src/env.mjs'))

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const withBundleAnalyzer = bundleAnalyze({
	enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
	compiler: {
		...(process.env.VERCEL_ENV === 'production' ? { removeConsole: { exclude: ['error'] } } : {}),
	},
	experimental: {
		optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
	},
	eslint: { ignoreDuringBuilds: process.env.VERCEL_ENV !== 'production' },
	typescript: { ignoreBuildErrors: process.env.VERCEL_ENV !== 'production' },
	webpack: (config, { dev, isServer }) => {
		if (!dev && !isServer) {
			config.plugins.push(new RelativeCiAgentWebpackPlugin())
		}
		if (dev && !isServer) {
			config.plugins.push(
				new I18NextHMRPlugin({
					localesDir: path.resolve(__dirname, './public/locales'),
				})
			)
		}
		return config
	},
}
/**
 * Wraps NextJS config with the Bundle Analyzer config.
 *
 * @param {typeof nextConfig} config
 * @returns {typeof nextConfig}
 */
function defineNextConfig(config) {
	return withBundleAnalyzer(config)
}

export default defineNextConfig(nextConfig)
