/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-unused-modules */
// @ts-ignore
const isCi = process.env.CI !== undefined;
if (!isCi) {
	require("husky").install();
}
