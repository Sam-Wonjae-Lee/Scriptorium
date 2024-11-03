/*
  Warnings:

  - A unique constraint covering the columns `[blogId,userId]` on the table `BlogRating` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "BlogRating_blogId_userId_key" ON "BlogRating"("blogId", "userId");
