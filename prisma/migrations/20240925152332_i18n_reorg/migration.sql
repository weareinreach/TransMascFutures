-- AlterTable
ALTER TABLE "Artwork"
	ADD COLUMN "alt" TEXT,
	ADD COLUMN "description" TEXT,
	ADD COLUMN "title" TEXT;

UPDATE
	"Artwork"
SET
	"alt" = "altEN",
	"title" = "titleEN",
	"description" = "descriptionEN";

-- AlterTable
ALTER TABLE "DefaultImage"
	ADD COLUMN "alt" TEXT;

UPDATE
	"DefaultImage"
SET
	"alt" = "altEN";

-- AlterTable
ALTER TABLE "Pronouns"
	ADD COLUMN "pronouns" TEXT;

UPDATE
	"Pronouns"
SET
	"pronouns" = "pronounsEN";

-- AlterTable
ALTER TABLE "Story"
	ADD COLUMN "response1" TEXT,
	ADD COLUMN "response2" TEXT;

UPDATE
	"Story"
SET
	"response1" = "response1EN",
	"response2" = "response2EN";

-- AlterTable
ALTER TABLE "StoryCategory"
	ADD COLUMN "category" TEXT,
	ADD COLUMN "imageAlt" TEXT;

UPDATE
	"StoryCategory"
SET
	"category" = "categoryEN",
	"imageAlt" = "imageAltEN";
