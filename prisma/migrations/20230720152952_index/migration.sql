-- CreateIndex
CREATE INDEX "PronounsToStory_storyId_idx" ON "PronounsToStory"("storyId");

-- CreateIndex
CREATE INDEX "StoryToCategory_storyId_idx" ON "StoryToCategory"("storyId");

-- CreateIndex
CREATE INDEX "StoryToCategory_categoryId_idx" ON "StoryToCategory"("categoryId");

