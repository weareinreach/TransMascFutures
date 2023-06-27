/*
 Warnings:

 - A unique constraint covering the columns `[tag]` on the table `Pronouns` will be added. If there are existing duplicate values, this will fail.
 - Added the required column `tag` to the `Pronouns` table without a default value. This is not possible if the table is not empty.
 */
-- AlterTable
ALTER TABLE "Pronouns"
	ADD COLUMN "tag" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Pronouns_tag_key" ON "Pronouns"("tag");

-- Update Data
UPDATE
	"Pronouns"
SET
	tag = 'they'
WHERE
	id = 'clienra200007pexbweivoffq';

UPDATE
	"Pronouns"
SET
	tag = 'he'
WHERE
	id = 'clienra200008pexbpobaxztr';

UPDATE
	"Pronouns"
SET
	tag = 'any'
WHERE
	id = 'clienra200009pexb5wyo4bkt';

UPDATE
	"Pronouns"
SET
	tag = 'none'
WHERE
	id = 'clienra20000apexb4zhmhq3d';

UPDATE
	"Pronouns"
SET
	tag = 'ze'
WHERE
	id = 'clj4e08hd0000pen90lv874yq';

INSERT INTO "Pronouns"(id, tag, "pronounsEN", "pronounsES", "updatedAt")
	VALUES ('e760lz3xzlp27tlbt5bon5li', 'xe', 'Xe/Xem/Xyr', 'Xe/Xem/Xyr', CURRENT_TIMESTAMP),
('p25mm6jsk7e52y5rir82sedh', 'ey', 'Ey/Em/Eir', 'Ey/Em/Eir', CURRENT_TIMESTAMP),
('bcyvm58r6hrr90b1z26xwzbd', 'other', '','', CURRENT_TIMESTAMP);

ALTER TABLE "Pronouns"
	ALTER COLUMN "tag" SET NOT NULL;

