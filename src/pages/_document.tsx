import { createStylesServer, ServerStyles } from '@mantine/next'
import Document, { Head, Html, Main, NextScript } from 'next/document'
import { type DocumentContext } from 'next/document'
import Script from 'next/script'

import { styleCache } from '../styles/emotionCache'

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
					<Script
						src='https://stats.inreach.org/umami.js'
						data-website-id='4aa20a1c-b728-4a15-a3dc-8b0a771de69e'
						data-domains='transmascfutures.inreach.org'
					/>
				</body>
			</Html>
		)
	}
}
