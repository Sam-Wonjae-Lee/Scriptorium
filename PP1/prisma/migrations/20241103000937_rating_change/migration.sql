/*
  Warnings:

  - You are about to drop the column `numDownvotes` on the `BlogRating` table. All the data in the column will be lost.
  - You are about to drop the column `numUpvotes` on the `BlogRating` table. All the data in the column will be lost.
  - You are about to drop the column `numDownvotes` on the `CommentRating` table. All the data in the column will be lost.
  - You are about to drop the column `numUpvotes` on the `CommentRating` table. All the data in the column will be lost.
  - Added the required column `rating` to the `BlogRating` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `BlogRating` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rating` to the `CommentRating` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `CommentRating` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_BlogRating" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "blogId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    CONSTRAINT "BlogRating_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blogs" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "BlogRating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_BlogRating" ("blogId", "id") SELECT "blogId", "id" FROM "BlogRating";
DROP TABLE "BlogRating";
ALTER TABLE "new_BlogRating" RENAME TO "BlogRating";
CREATE TABLE "new_CommentRating" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "commentId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    CONSTRAINT "CommentRating_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comments" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CommentRating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_CommentRating" ("commentId", "id") SELECT "commentId", "id" FROM "CommentRating";
DROP TABLE "CommentRating";
ALTER TABLE "new_CommentRating" RENAME TO "CommentRating";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
