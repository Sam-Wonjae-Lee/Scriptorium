/*
  Warnings:

  - You are about to drop the `FlaggedBlogs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FlaggedComments` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "FlaggedBlogs";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "FlaggedComments";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Blogs" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "numReports" INTEGER NOT NULL DEFAULT 0,
    "isFlagged" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Blogs_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Blogs" ("authorId", "content", "id", "numReports", "title") SELECT "authorId", "content", "id", "numReports", "title" FROM "Blogs";
DROP TABLE "Blogs";
ALTER TABLE "new_Blogs" RENAME TO "Blogs";
CREATE TABLE "new_Comments" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "blogId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "numReports" INTEGER NOT NULL DEFAULT 0,
    "isFlagged" BOOLEAN NOT NULL DEFAULT false,
    "parentCommentid" INTEGER,
    CONSTRAINT "Comments_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blogs" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Comments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Comments_parentCommentid_fkey" FOREIGN KEY ("parentCommentid") REFERENCES "Comments" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Comments" ("blogId", "content", "id", "numReports", "parentCommentid", "userId") SELECT "blogId", "content", "id", "numReports", "parentCommentid", "userId" FROM "Comments";
DROP TABLE "Comments";
ALTER TABLE "new_Comments" RENAME TO "Comments";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
