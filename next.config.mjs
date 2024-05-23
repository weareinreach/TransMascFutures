/* eslint-disable turbo/no-undeclared-env-vars */
// @ts-check
import bundleAnalyze from '@next/bundle-analyzer'
import { RelativeCiAgentWebpackPlugin } from '@relative-ci/agent'
import { I18NextHMRPlugin } from 'i18next-hmr/webpack'
import nextRoutes from 'nextjs-routes/config'

import path from 'path'
import { fileURLToPath } from 'url'

import i18nConfig from './next-i18next.config.js'
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful for
 * Docker builds.
 */

!process.env.SKIP_ENV_VALIDATION && (await import('./src/env/server.mjs'))

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const withRoutes = nextRoutes({ outDir: 'src/types' })
const withBundleAnalyzer = bundleAnalyze({
	enabled: process.env.ANALYZE === 'true',
})

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
	experimental: {
		outputFileTracingExcludes: {
			'*': ['**swc+core**', '**esbuild**'],
		},
		webpackBuildWorker: true,
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
 * @param {typeof config} config
 * @returns {typeof config}
 */
function defineNextConfig(config) {
	return withBundleAnalyzer(withRoutes(config))
}

export default defineNextConfig(config)
