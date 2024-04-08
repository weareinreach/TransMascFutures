import { Anchor, Burger, Container, Drawer, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { useCallback, useEffect } from "react";

import classes from "./Navbar.module.css";

// const HEADER_HEIGHT = 75

const NavLinks = ({
	drawerHandler,
}: {
	drawerHandler?: ReturnType<typeof useDisclosure>[1];
}) => {
	const { t } = useTranslation();
	const router = useRouter();
	const linksInfo = [
		{ key: "nav.home", href: "/" as const },
		{ key: "nav.gallery", href: "/gallery" as const },
		{ key: "nav.act", href: "/act" as const },
		{ key: "nav.about", href: "/about" as const },
		{ key: "nav.share", href: "/share" as const },
		{ key: "nav.find-resources", href: "https://app.inreach.org" as const },
	]; //satisfies Array<Readonly<LinkData>>

	useEffect(() => {
		const drawerCloser = (_: unknown) => drawerHandler && drawerHandler.close();

		router.events.on("routeChangeComplete", drawerCloser);

		return router.events.off("routeChangeComplete", drawerCloser);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [router.asPath]);

	const links = linksInfo.map(({ key, href }) => {
		if (href === "https://app.inreach.org") {
			return (
				<a key={key} href={href} className={classes.navlink}>
					{t(key).toLocaleUpperCase()}
				</a>
			);
		}

		return (
			<Link key={key} href={href} className={classes.navlink}>
				{t(key).toLocaleUpperCase()}
			</Link>
		);
	});

	return <>{links}</>;
};

// This type is only needed when trying to make a story for a page
// to check whether the button to go to the main page works
type pathProp = { path?: string };

const HamburgerMenu = ({ path }: pathProp) => {
	const [opened, handler] = useDisclosure(false);
	const router = useRouter();
	const { asPath, pathname, query, locale } = router;
	const { t } = useTranslation();

	const switchLang = useCallback(
		() =>
			router.replace({ pathname, query }, asPath, {
				locale: locale === "en" ? "es" : "en",
			}),
		[router, locale, asPath, query, pathname],
	);

	return (
		<Container
			className={classes.burger}
			style={{ justifyContent: path === "/" ? "end" : "space-between" }}
		>
			<Drawer
				opened={opened}
				onClose={handler.close}
				title={
					<Text fz="md" fw={900} c="gray.0">
						{"InReach X GLAAD"}
					</Text>
				}
				size="sm"
				padding="xl"
				classNames={{
					content: classes["drawer-bg"],
					header: classes["drawer-bg"],
				}}
			>
				<NavLinks drawerHandler={handler} />
				<Anchor
					variant="category"
					tt="uppercase"
					// eslint-disable-next-line @typescript-eslint/no-misused-promises
					onClick={switchLang}
				>
					{t("nav.switch-lang-short")}
				</Anchor>
			</Drawer>
			<Burger
				opened={opened}
				onClick={handler.toggle}
				size="lg"
				color="#FEFEFF"
				aria-label="burgerButton"
				title="Open sidenav"
			/>
		</Container>
	);
};

export const Navbar = ({ path }: pathProp) => {
	const router = useRouter();
	return (
		// <Header height={HEADER_HEIGHT} className={classes.glaadGray}>
		<>
			<Container className={classes.navbar} fluid>
				<NavLinks />
			</Container>
			<HamburgerMenu path={path ?? router.pathname} />
		</>
		// </Header>
	);
};
