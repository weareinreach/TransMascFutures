import Link from 'next/link'

import { useStyles } from './NavStyles'

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
		const [title, href] = linkInfo
		return (
			<Link key={title} href={href} className={classes.navlink}>
				{title.toUpperCase()}
			</Link>
		)
	})

	return <>{links}</>
}
