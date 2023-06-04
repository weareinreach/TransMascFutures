/*
  Warnings:

  - You are about to drop the column `image` on the `PartnerOrg` table. All the data in the column will be lost.
  - You are about to drop the column `src` on the `PartnerOrg` table. All the data in the column will be lost.
  - Added the required column `href` to the `PartnerOrg` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageSrc` to the `PartnerOrg` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PartnerOrg" DROP COLUMN "image",
DROP COLUMN "src",
ADD COLUMN     "href" TEXT NOT NULL,
ADD COLUMN     "imageSrc" TEXT NOT NULL;
