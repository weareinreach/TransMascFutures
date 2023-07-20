-- CreateTable
CREATE TABLE "DefaultImage"(
	"id" text NOT NULL,
	"altEN" text NOT NULL,
	"altES" text NOT NULL,
	"src" text NOT NULL,
	"createdAt" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"updatedAt" timestamp(3) NOT NULL,
	CONSTRAINT "DefaultImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Artwork"(
	"id" text NOT NULL,
	"src" text NOT NULL,
	"altEN" text NOT NULL,
	"altES" text NOT NULL,
	"titleEN" text NOT NULL,
	"titleES" text NOT NULL,
	"artist" text NOT NULL,
	"descriptionEN" text,
	"descriptionES" text,
	"height" integer NOT NULL,
	"width" integer NOT NULL,
	"isVideo" boolean NOT NULL DEFAULT FALSE,
	"createdAt" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"updatedAt" timestamp(3) NOT NULL,
	CONSTRAINT "Artwork_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StoryCategory"(
	"id" text NOT NULL,
	"tag" text NOT NULL,
	"categoryEN" text NOT NULL,
	"categoryES" text NOT NULL,
	"order" integer,
	"image" text,
	"imageAltEN" text,
	"imageAltES" text,
	"createdAt" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"updatedAt" timestamp(3) NOT NULL,
	CONSTRAINT "StoryCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pronouns"(
	"id" text NOT NULL,
	"tag" text NOT NULL,
	"pronounsEN" text NOT NULL,
	"pronounsES" text NOT NULL,
	"createdAt" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"updatedAt" timestamp(3) NOT NULL,
	CONSTRAINT "Pronouns_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PronounsToStory"(
	"pronounId" text NOT NULL,
	"storyId" text NOT NULL,
	"createdAt" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"updatedAt" timestamp(3) NOT NULL,
	CONSTRAINT "PronounsToStory_pkey" PRIMARY KEY ("storyId", "pronounId")
);

-- CreateTable
CREATE TABLE "Story"(
	"id" text NOT NULL,
	"name" text NOT NULL,
	"response1EN" text,
	"response2EN" text,
	"response1ES" text,
	"response2ES" text,
	"userId" text,
	"imageId" text,
	"isInfluencer" boolean NOT NULL DEFAULT FALSE,
	"publicSlug" text,
	"published" boolean NOT NULL DEFAULT FALSE,
	"textToxicity" double precision,
	"imageModeration" jsonb,
	"createdAt" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"updatedAt" timestamp(3) NOT NULL,
	CONSTRAINT "Story_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StoryToCategory"(
	"categoryId" text NOT NULL,
	"storyId" text NOT NULL,
	"createdAt" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"updatedAt" timestamp(3) NOT NULL,
	CONSTRAINT "StoryToCategory_pkey" PRIMARY KEY ("categoryId", "storyId")
);

-- CreateTable
CREATE TABLE "PartnerOrg"(
	"id" text NOT NULL,
	"name" text NOT NULL,
	"href" text NOT NULL,
	"tag" text NOT NULL,
	"imageSrc" text,
	"order" integer NOT NULL,
	"visible" boolean NOT NULL DEFAULT TRUE,
	"height" integer,
	"width" integer,
	"createdAt" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"updatedAt" timestamp(3) NOT NULL,
	CONSTRAINT "PartnerOrg_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StorySubmission"(
	"id" text NOT NULL,
	"userId" text NOT NULL,
	"responses" jsonb NOT NULL,
	"createdAt" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"updatedAt" timestamp(3) NOT NULL,
	CONSTRAINT "StorySubmission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DataMigration"(
	"id" text NOT NULL,
	"jobId" text NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"createdBy" text NOT NULL,
	"appliedAt" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT "DataMigration_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StoryCategory_tag_key" ON "StoryCategory"("tag");

-- CreateIndex
CREATE UNIQUE INDEX "Pronouns_tag_key" ON "Pronouns"("tag");

-- CreateIndex
CREATE INDEX "PronounsToStory_storyId_idx" ON "PronounsToStory"("storyId");

-- CreateIndex
CREATE UNIQUE INDEX "Story_publicSlug_key" ON "Story"("publicSlug");

-- CreateIndex
CREATE INDEX "StoryToCategory_storyId_idx" ON "StoryToCategory"("storyId");

-- CreateIndex
CREATE INDEX "StoryToCategory_categoryId_idx" ON "StoryToCategory"("categoryId");

-- CreateIndex
CREATE UNIQUE INDEX "PartnerOrg_name_key" ON "PartnerOrg"("name");

-- CreateIndex
CREATE UNIQUE INDEX "DataMigration_jobId_key" ON "DataMigration"("jobId");

-- AddForeignKey
ALTER TABLE "PronounsToStory"
	ADD CONSTRAINT "PronounsToStory_pronounId_fkey" FOREIGN KEY ("pronounId") REFERENCES "Pronouns"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PronounsToStory"
	ADD CONSTRAINT "PronounsToStory_storyId_fkey" FOREIGN KEY ("storyId") REFERENCES "Story"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Story"
	ADD CONSTRAINT "Story_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "DefaultImage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoryToCategory"
	ADD CONSTRAINT "StoryToCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "StoryCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoryToCategory"
	ADD CONSTRAINT "StoryToCategory_storyId_fkey" FOREIGN KEY ("storyId") REFERENCES "Story"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Seed Initial Data
INSERT INTO "Pronouns"(id, "pronounsEN", "pronounsES", "createdAt", "updatedAt", tag)
	VALUES ('clienra200007pexbweivoffq', 'They/Them/Theirs', 'Elle', '2023-06-03 02:42:00.708', '2023-06-03 02:42:00.708', 'they'),
('clienra200008pexbpobaxztr', 'He/Him/His', 'Él', '2023-06-03 02:42:00.708', '2023-06-03 02:42:00.708', 'he'),
('clienra200009pexb5wyo4bkt', 'Any pronouns', 'Cualquier pronombre', '2023-06-03 02:42:00.708', '2023-06-03 02:42:00.708', 'any'),
('clienra20000apexb4zhmhq3d', 'No pronouns', 'No pronombres', '2023-06-03 02:42:00.708', '2023-06-03 02:42:00.708', 'none'),
('clj4e08hd0000pen90lv874yq', 'Ze/Zir/Zim', 'Ze/Zir/Zim', '2023-06-20 14:34:14.313', '2023-06-20 14:34:14.313', 'ze'),
('e760lz3xzlp27tlbt5bon5li', 'Xe/Xem/Xyr', 'Xe/Xem/Xyr', '2023-06-27 16:48:38.608', '2023-06-27 16:48:38.608', 'xe'),
('p25mm6jsk7e52y5rir82sedh', 'Ey/Em/Eir', 'Ey/Em/Eir', '2023-06-27 16:48:38.608', '2023-06-27 16:48:38.608', 'ey'),
('bcyvm58r6hrr90b1z26xwzbd', '','', '2023-06-27 16:48:38.608', '2023-06-27 16:48:38.608', 'other');

INSERT INTO "StoryCategory"(id, "categoryEN", "categoryES", "createdAt", "updatedAt", "order", image, "imageAltEN", "imageAltES", tag)
	VALUES ('clienra1i0000pexbs0j5xjhl', 'BIPOC', 'Personas BIPOC', '2023-06-03 02:42:00.578', '2023-06-03 02:42:00.578', 1, 'bipoc', NULL, NULL, 'bipoc'),
('clienra1i0003pexbvo2gu720', 'Immigrant', 'Personas Inmigrantes', '2023-06-03 02:42:00.578', '2023-06-03 02:42:00.578', 3, 'immigrant', NULL, NULL, 'immigrant'),
('clienra1i0005pexby9upd67c', 'Queer', 'Personas Queer', '2023-06-03 02:42:00.578', '2023-06-03 02:42:00.578', 5, 'queer', NULL, NULL, 'queer'),
('clienra1i0001pexbc72b9hyj', 'Disabled', 'Personas Con Discapacidad', '2023-06-03 02:42:00.578', '2023-06-05 21:18:31.025', 2, 'disabled', NULL, NULL, 'disabled'),
('clienra1i0002pexbm17yqg2d', 'Elder', 'Personas Mayores', '2023-06-03 02:42:00.578', '2023-06-05 21:18:31.025', 4, 'elder', NULL, NULL, 'elder'),
('clienra1i0006pexbks2nzu97', 'Trans Man', 'Hombres Trans', '2023-06-03 02:42:00.578', '2023-06-05 21:18:31.025', 6, 'transman', NULL, NULL, 'transman'),
('clienra1i0004pexbkht4nc39', 'Trans Masc / Nonbinary', 'Gente Transmasculino / No Binaria', '2023-06-03 02:42:00.578', '2023-06-27 16:51:29.841', 7, 'transmasc-nonbinary', NULL, NULL, 'transmasc');

