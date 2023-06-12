-- DropForeignKey
ALTER TABLE "PronounsToStory" DROP CONSTRAINT "PronounsToStory_storyId_fkey";

-- DropForeignKey
ALTER TABLE "StoryToCategory" DROP CONSTRAINT "StoryToCategory_storyId_fkey";

-- AddForeignKey
ALTER TABLE "PronounsToStory" ADD CONSTRAINT "PronounsToStory_storyId_fkey" FOREIGN KEY ("storyId") REFERENCES "Story"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoryToCategory" ADD CONSTRAINT "StoryToCategory_storyId_fkey" FOREIGN KEY ("storyId") REFERENCES "Story"("id") ON DELETE CASCADE ON UPDATE CASCADE;
