import { Button } from '@mantine/core'
import Link from 'next/link'
import { LangPick } from './LangPick'
import classes from './styles.module.css'
import { initTranslations } from '~/app/i18n'
import { getLocale } from '~/server/i18n'
import { BurgerButton } from './BurgerButton'

const linksInfo = [
	{ key: 'nav.home', href: '/' },
	{ key: 'nav.gallery', href: '/gallery' },
	{ key: 'nav.act', href: '/act' },
	{ key: 'nav.about', href: '/about' },
	{ key: 'nav.share', href: '/share' },
] as const

const findResourceButton = { key: 'nav.find-resources', href: 'https://app.inreach.org' } as const

export const NavBar = async () => {
	const locale = getLocale()
	const { t } = await initTranslations(locale, ['common'])

	const links = linksInfo.map(({ href, key }) => (
		<Link key={key} href={href} className={classes.linkItem}>
			{t(key)}
		</Link>
	))

	return (
		<nav className={classes.barRoot}>
			<BurgerButton>
				<div className={classes.linksContainer}>{links}</div>
				<div className={classes.rightSection}>
					<LangPick />
					<Button
						component={Link}
						href={findResourceButton.href}
						variant='outline'
						target='_blank'
						className={classes.findResource}
						classNames={{
							root: classes.resourceBtnRoot,
							label: classes.resourceBtnLabel,
						}}
					>
						{t(findResourceButton.key)}
					</Button>
				</div>
			</BurgerButton>
		</nav>
	)
}
