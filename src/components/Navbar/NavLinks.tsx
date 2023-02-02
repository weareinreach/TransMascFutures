import { createStyles } from '@mantine/core'
import Link from 'next/link'

const useStyles = createStyles((theme, _params, _getRef) => ({
	link: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		height: '100%',
		fontStyle: 'italic',
		textAlign: 'center',
	},
}))

type linkData = Array<[string, string]>

export const NavLinks = () => {
	const { classes } = useStyles()

	const linksInfo: linkData = [
		['learn', '#'],
		['act', '#'],
		['about', '#'],
		['share', '#'],
		['find resources', '#'],
	]

	const links = linksInfo.map((linkInfo) => {
		const [title] = linkInfo
		return (
			<Link key={title} href='#' className={classes.link}>
				{title.toUpperCase()}
			</Link>
		)
	})

	return <>{links}</>
}
