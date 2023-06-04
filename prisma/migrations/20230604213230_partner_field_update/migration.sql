/*
  Warnings:

  - You are about to drop the column `href` on the `PartnerOrg` table. All the data in the column will be lost.
  - Added the required column `src` to the `PartnerOrg` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tag` to the `PartnerOrg` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PartnerOrg" DROP COLUMN "href",
ADD COLUMN     "src" TEXT NOT NULL,
ADD COLUMN     "tag" TEXT NOT NULL;
