/*
 Warnings:

 - A unique constraint covering the columns `[tag]` on the table `StoryCategory` will be added. If there are existing duplicate values, this will fail.
 - Added the required column `tag` to the `StoryCategory` table without a default value. This is not possible if the table is not empty.
 */
-- AlterTable
ALTER TABLE "StoryCategory"
	ADD COLUMN "tag" TEXT;

-- Copy over values from the 'image' field to use as tags.
UPDATE
	"StoryCategory"
SET
	tag = image;

-- Set field to be required.
ALTER TABLE "StoryCategory"
	ALTER tag SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "StoryCategory_tag_key" ON "StoryCategory"("tag");

