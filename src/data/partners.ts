import { type LiteralUnion } from "type-fest";

import Glaad from "~public/assets/partners/glaad.png";
import Hollister from "~public/assets/partners/hollister.png";
import ImmigrationEquality from "~public/assets/partners/immigrationEquality.png";
import KYLP from "~public/assets/partners/kylp_t.png";
import LambdaLegal from "~public/assets/partners/lambaLegal_t.png";
import MTPC from "~public/assets/partners/mtpc.png";
import NQAPIA from "~public/assets/partners/nqapia_t.png";
import OasisLegal from "~public/assets/partners/oasisLegal.png";
import Sage from "~public/assets/partners/sage.png";
import StandWithTrans from "~public/assets/partners/standWithTrans.png";
import TAVA from "~public/assets/partners/tava.png";

export const partnerImages = {
	glaad: Glaad,
	lambdaLegal: LambdaLegal,
	sage: Sage,
	immigrationEquality: ImmigrationEquality,
	nqapia: NQAPIA,
	hollister: Hollister,
	kylp: KYLP,
	mtpc: MTPC,
	oasisLegal: OasisLegal,
	standWithTrans: StandWithTrans,
	tava: TAVA,
};
type Partners = keyof typeof partnerImages;

export const isValidPartnerImage = (partner: unknown): partner is Partners =>
	typeof partner === "string" && Object.hasOwn(partnerImages, partner);

export const getPartnerImage = (partner: LiteralUnion<Partners, string>) =>
	isValidPartnerImage(partner) ? partnerImages[partner] : undefined;
