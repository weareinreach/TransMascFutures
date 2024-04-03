import { createNextApiHandler } from "@trpc/server/adapters/next";

import { env } from "../../../env/server.mjs";
import { appRouter } from "../../../server/api/root";
import { createTRPCContext } from "../../../server/api/trpc";

// export API handler
export default createNextApiHandler({
	router: appRouter,
	createContext: createTRPCContext,
	onError:
		env.NODE_ENV === "development"
			? ({ path, error }) => {
					console.error(
						`❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`,
					);
				}
			: undefined,
	responseMeta(opts) {
		const { errors, type } = opts;
		// assuming you have all your public routes with the keyword `public` in them
		// checking that no procedures errored
		const allOk = errors.length === 0;
		// checking we're doing a query request
		const isQuery = type === "query";
		// cache request for 1 day + revalidate once every second
		const ONE_DAY_IN_SECONDS = 60 * 60 * 24;
		const ONE_HOUR_IN_SECONDS = 60 * 60;
		if (allOk && isQuery) {
			return {
				headers: {
					"cache-control": `s-maxage=${ONE_HOUR_IN_SECONDS}, stale-while-revalidate=${ONE_DAY_IN_SECONDS}`,
				},
			};
		}
		return {};
	},
});
