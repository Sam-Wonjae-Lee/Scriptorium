/*
  Warnings:

  - A unique constraint covering the columns `[commentId,userId]` on the table `CommentRating` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CommentRating_commentId_userId_key" ON "CommentRating"("commentId", "userId");
