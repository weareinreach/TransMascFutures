/*
 Warnings:

 - Made the column `alt` on table `Artwork` required. This step will fail if there are existing NULL values in that column.
 - Made the column `title` on table `Artwork` required. This step will fail if there are existing NULL values in that column.
 - Made the column `alt` on table `DefaultImage` required. This step will fail if there are existing NULL values in that column.
 - Made the column `pronouns` on table `Pronouns` required. This step will fail if there are existing NULL values in that column.
 - Made the column `category` on table `StoryCategory` required. This step will fail if there are existing NULL values in that column.
 */
-- AlterTable
ALTER TABLE "Artwork"
	ALTER COLUMN "alt" SET NOT NULL,
	ALTER COLUMN "title" SET NOT NULL;

-- AlterTable
ALTER TABLE "DefaultImage"
	ALTER COLUMN "alt" SET NOT NULL;

-- AlterTable
ALTER TABLE "Pronouns"
	ALTER COLUMN "pronouns" SET NOT NULL;

-- AlterTable
ALTER TABLE "StoryCategory"
	ALTER COLUMN "category" SET NOT NULL;
