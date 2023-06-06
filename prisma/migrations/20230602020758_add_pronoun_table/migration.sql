/*
  Warnings:

  - You are about to drop the column `birthYear` on the `Story` table. All the data in the column will be lost.
  - You are about to drop the column `defaultImageId` on the `Story` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Story` table. All the data in the column will be lost.
  - You are about to drop the column `pronouns` on the `Story` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Story" DROP CONSTRAINT "Story_defaultImageId_fkey";

-- AlterTable
ALTER TABLE "Story" DROP COLUMN "birthYear",
DROP COLUMN "defaultImageId",
DROP COLUMN "image",
DROP COLUMN "pronouns",
ADD COLUMN     "imageId" TEXT;

-- CreateTable
CREATE TABLE "Pronouns" (
    "id" TEXT NOT NULL,
    "pronounsEN" TEXT NOT NULL,
    "pronounsES" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pronouns_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PronounsToStory" (
    "pronounId" TEXT NOT NULL,
    "storyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PronounsToStory_pkey" PRIMARY KEY ("storyId","pronounId")
);

-- AddForeignKey
ALTER TABLE "PronounsToStory" ADD CONSTRAINT "PronounsToStory_pronounId_fkey" FOREIGN KEY ("pronounId") REFERENCES "Pronouns"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PronounsToStory" ADD CONSTRAINT "PronounsToStory_storyId_fkey" FOREIGN KEY ("storyId") REFERENCES "Story"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Story" ADD CONSTRAINT "Story_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "DefaultImage"("id") ON DELETE SET NULL ON UPDATE CASCADE;
