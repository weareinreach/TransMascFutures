-- CreateTable
CREATE TABLE "DefaultImage" (
    "id" TEXT NOT NULL,
    "altEN" TEXT NOT NULL,
    "altES" TEXT NOT NULL,
    "src" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DefaultImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Artwork" (
    "id" TEXT NOT NULL,
    "src" TEXT NOT NULL,
    "altEN" TEXT NOT NULL,
    "altES" TEXT NOT NULL,
    "titleEN" TEXT NOT NULL,
    "titleES" TEXT NOT NULL,
    "artist" TEXT NOT NULL,
    "descriptionEN" TEXT,
    "descriptionES" TEXT,
    "height" INTEGER NOT NULL,
    "width" INTEGER NOT NULL,
    "isVideo" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Artwork_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StoryCategory" (
    "id" TEXT NOT NULL,
    "categoryEN" TEXT NOT NULL,
    "categoryES" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StoryCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Story" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "pronouns" TEXT NOT NULL,
    "birthYear" INTEGER NOT NULL,
    "response1EN" TEXT,
    "response2EN" TEXT,
    "response1ES" TEXT,
    "response2ES" TEXT,
    "userId" TEXT,
    "image" TEXT,
    "defaultImageId" TEXT,
    "isInfluencer" BOOLEAN NOT NULL DEFAULT false,
    "publicSlug" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "textToxicity" DOUBLE PRECISION,
    "imageModeration" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Story_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StoryToCategory" (
    "categoryId" TEXT NOT NULL,
    "storyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StoryToCategory_pkey" PRIMARY KEY ("categoryId","storyId")
);

-- CreateTable
CREATE TABLE "PartnerOrg" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "href" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "visible" BOOLEAN NOT NULL DEFAULT true,
    "height" INTEGER NOT NULL,
    "width" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PartnerOrg_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Story_publicSlug_key" ON "Story"("publicSlug");

-- AddForeignKey
ALTER TABLE "Story" ADD CONSTRAINT "Story_defaultImageId_fkey" FOREIGN KEY ("defaultImageId") REFERENCES "DefaultImage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoryToCategory" ADD CONSTRAINT "StoryToCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "StoryCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoryToCategory" ADD CONSTRAINT "StoryToCategory_storyId_fkey" FOREIGN KEY ("storyId") REFERENCES "Story"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
