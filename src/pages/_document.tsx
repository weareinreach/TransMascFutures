import { createStylesServer, ServerStyles } from '@mantine/next'
import Document, { Head, Html, Main, NextScript } from 'next/document'

import { styleCache } from '../styles/emotionCache'

import type { DocumentContext } from 'next/document'

const stylesServer = createStylesServer(styleCache)

export default class _Document extends Document {
	static async getInitialProps(ctx: DocumentContext) {
		const initialProps = await Document.getInitialProps(ctx)

		return {
			...initialProps,
			styles: [
				initialProps.styles,
				<ServerStyles html={initialProps.html} server={stylesServer} key='styles' />,
			],
		}
	}

	render() {
		return (
			<Html>
				<Head />
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}
