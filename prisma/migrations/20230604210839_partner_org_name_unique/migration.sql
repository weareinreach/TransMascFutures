/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `PartnerOrg` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "PartnerOrg_name_key" ON "PartnerOrg"("name");
