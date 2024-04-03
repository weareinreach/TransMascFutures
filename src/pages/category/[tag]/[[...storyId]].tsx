import {
	AspectRatio,
	Button,
	Container,
	Grid,
	Loader,
	Modal,
	Title,
	useMantineTheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { type GetStaticPaths, type GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { type RoutedQuery } from "nextjs-routes";
import { useMemo } from "react";

import { PreviewCard } from "~/components/storyPreviewCard/PreviewCard";
import { getCategoryImage } from "~/data/categoryImages";
import { CardDisplay } from "~/layouts/CardDisplay";
import { IndividualStory } from "~/layouts/IndividualStory/IndividualStory";
import { prisma } from "~/server/db";
import { getServerSideTranslations } from "~/server/i18n";
import { fontIbmPlexSans } from "~/styles";
import { api, type RouterOutputs } from "~/utils/api";
import { trpcServerClient } from "~/utils/ssr";
import Logo from "~public/assets/tmf-logo-rect-bw-cropped.png";

export const CategoryPage = ({}: CategoryPageProps) => {
	const router = useRouter<"/category/[tag]/[[...storyId]]">();
	const theme = useMantineTheme();
	const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.xs})`);
	const category = router.query.tag;
	const locale = ["en", "es"].includes(router.locale) ? router.locale : "en";
	const popupStory = useMemo(
		() =>
			Array.isArray(router.query.storyId) && router.query.storyId.length
				? router.query.storyId.at(0)
				: typeof router.query.storyId === "string"
					? router.query.storyId
					: undefined,
		[router.query.storyId],
	);

	const { data: stories } = api.story.getByCategory.useQuery(
		{ tag: router.query.tag ?? "", locale },
		{ enabled: Boolean(router.query.tag) },
	);
	const { data: singleStory } = api.story.getStoryById.useQuery(
		{ id: popupStory ?? "", locale },
		{ enabled: typeof popupStory === "string" },
	);

	const { t } = useTranslation();

	if (!category || !stories) return <Loader />;

	const previewCards = stories.map(
		({ name, pronouns, response1, response2, id }, i) => {
			const pronounList = pronouns.map(({ pronoun }) => pronoun);
			const storyText = response1 ?? response2;
			return (
				<Link
					key={id}
					href={{
						pathname: "/category/[tag]/[[...storyId]]",
						query: { tag: router.query.tag ?? "", storyId: [id] },
					}}
					as={`/story/${id}`}
					scroll={false}
					style={{ textDecoration: "none" }}
				>
					<PreviewCard
						title={name}
						subtitle={pronounList.join(", ")}
						text={storyText}
					/>
				</Link>
			);
		},
	);

	return (
		<Container fluid>
			<Head>
				<title>
					{t("page-title.general-template", { page: "$t(nav.stories)" })}
				</title>
			</Head>
			<Grid align="center" my="md" grow>
				<Grid.Col sm={6} lg={5} md={4} px={{ lg: 40 }}>
					<AspectRatio ratio={723 / 174} my={40} mx="auto" maw={750}>
						<Image src={Logo} alt={t("logo-alt")} fill />
					</AspectRatio>
				</Grid.Col>
				<Grid.Col sm={6} lg={4} md={4}>
					<Title
						fw={100}
						order={1}
						fz={30}
						align="center"
						tt="uppercase"
						style={fontIbmPlexSans.style}
						lts={5}
					>
						{t(`story-gallery.${category}`)}
					</Title>
				</Grid.Col>
				<Grid.Col lg={3} md={4}>
					<Button
						component={Link}
						href={{ pathname: "/survey" }}
						tt="uppercase"
						variant="secondary"
						display="block"
						mx="auto"
					>
						{t("participate")}
					</Button>
				</Grid.Col>
			</Grid>
			{Boolean(previewCards.length) && (
				<CardDisplay>{previewCards}</CardDisplay>
			)}

			<Modal
				opened={!!router.query.storyId}
				// eslint-disable-next-line @typescript-eslint/no-misused-promises
				onClose={() =>
					router.replace(
						{
							pathname: "/category/[tag]/[[...storyId]]",
							query: { tag: router.query.tag ?? "" },
						},
						undefined,
						{
							shallow: true,
							scroll: false,
						},
					)
				}
				size="75vw"
				centered
				overlayProps={{ blur: 2 }}
				closeButtonProps={{ size: isMobile ? "xl" : "lg" }}
				radius="xl"
				fullScreen={isMobile}
			>
				{singleStory && (
					<IndividualStory
						name={singleStory.name}
						image={getCategoryImage(category)}
						pronouns={singleStory.pronouns.map(({ pronoun }) => pronoun)}
						response1={singleStory.response1}
						response2={singleStory.response2}
					/>
				)}
			</Modal>
		</Container>
	);
};

type CategoryPageProps = {
	stories: RouterOutputs["story"]["getByCategory"];
	category: string;
};

export const getStaticProps: GetStaticProps<
	Record<string, unknown>,
	RoutedQuery<"/category/[tag]/[[...storyId]]">
> = async ({ locale: ssrLocale, params }) => {
	const locale = (["en", "es"].includes(ssrLocale ?? "") ? ssrLocale : "en") as
		| "en"
		| "es";
	const ssg = trpcServerClient();
	if (!params?.tag) return { notFound: true };

	const storyId =
		Array.isArray(params.storyId) && params.storyId.length
			? params.storyId.at(0)
			: undefined;

	const [i18n] = await Promise.allSettled([
		getServerSideTranslations(locale),
		ssg.story.getByCategory.prefetch({ tag: params?.tag, locale }),
		...(storyId
			? [ssg.story.getStoryById.prefetch({ id: storyId, locale })]
			: []),
	]);

	return {
		props: {
			trpcState: ssg.dehydrate(),
			...(i18n.status === "fulfilled" ? i18n.value : {}),
		},
		// revalidate: 604800, // 1 week
	};
};
export const getStaticPaths: GetStaticPaths<{
	tag: string;
	storyId?: string[];
}> = async ({ locales = ["en", "es"] }) => {
	const categories = await prisma.storyCategory.findMany({
		select: {
			tag: true,
			stories: {
				select: { storyId: true },
				where: { story: { published: true } },
			},
		},
	});

	const paths = categories.flatMap(({ tag, stories }) => [
		...locales.map((locale) => ({
			params: { tag, storyId: undefined },
			locale,
		})),
		...stories.flatMap(({ storyId }) =>
			locales.map((locale) => ({
				params: { tag, storyId: [storyId] },
				locale,
			})),
		),
	]);

	return {
		paths,
		fallback: "blocking",
	};
};

export default CategoryPage;
