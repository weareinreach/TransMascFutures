-- CreateIndex
CREATE INDEX "PartnerOrg_visible_idx" ON "PartnerOrg"("visible");

-- CreateIndex
CREATE INDEX "PronounsToStory_pronounId_storyId_idx" ON "PronounsToStory"("pronounId", "storyId");

-- CreateIndex
CREATE INDEX "Story_published_id_idx" ON "Story"("published", "id");

-- CreateIndex
CREATE INDEX "StoryToCategory_storyId_categoryId_idx" ON "StoryToCategory"("storyId", "categoryId");
