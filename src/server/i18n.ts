// eslint-disable-next-line no-restricted-imports
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import i18nConfig from "../../next-i18next.config";

export const getServerSideTranslations = async (
	locale = "en",
	namespacesRequired: string[] = ["common"],
	extraLocales?: string[] | false,
) =>
	serverSideTranslations(locale, namespacesRequired, i18nConfig, extraLocales);
