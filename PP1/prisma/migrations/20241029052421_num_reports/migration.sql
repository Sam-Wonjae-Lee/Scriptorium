/*
  Warnings:

  - You are about to drop the `Links` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_Links` table. If the table is not empty, all the data it contains will be lost.
  - You are about to alter the column `avatar` on the `Users` table. The data in that column could be lost. The data in that column will be cast from `String` to `Binary`.
  - Added the required column `permission` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "_Links_B_index";

-- DropIndex
DROP INDEX "_Links_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Links";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_Links";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "_BlogsToTemplates" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_BlogsToTemplates_A_fkey" FOREIGN KEY ("A") REFERENCES "Blogs" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_BlogsToTemplates_B_fkey" FOREIGN KEY ("B") REFERENCES "Templates" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Blogs" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "numReports" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "Blogs_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Blogs" ("authorId", "content", "id", "title") SELECT "authorId", "content", "id", "title" FROM "Blogs";
DROP TABLE "Blogs";
ALTER TABLE "new_Blogs" RENAME TO "Blogs";
CREATE TABLE "new_Comments" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "blogId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "numReports" INTEGER NOT NULL DEFAULT 0,
    "parentCommentid" INTEGER,
    CONSTRAINT "Comments_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blogs" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Comments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Comments_parentCommentid_fkey" FOREIGN KEY ("parentCommentid") REFERENCES "Comments" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Comments" ("blogId", "content", "id", "parentCommentid", "userId") SELECT "blogId", "content", "id", "parentCommentid", "userId" FROM "Comments";
DROP TABLE "Comments";
ALTER TABLE "new_Comments" RENAME TO "Comments";
CREATE TABLE "new_Users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "avatar" BLOB,
    "password" TEXT NOT NULL,
    "permission" TEXT NOT NULL
);
INSERT INTO "new_Users" ("avatar", "email", "firstName", "id", "lastName", "password", "phone", "role") SELECT "avatar", "email", "firstName", "id", "lastName", "password", "phone", "role" FROM "Users";
DROP TABLE "Users";
ALTER TABLE "new_Users" RENAME TO "Users";
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");
CREATE UNIQUE INDEX "Users_phone_key" ON "Users"("phone");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "_BlogsToTemplates_AB_unique" ON "_BlogsToTemplates"("A", "B");

-- CreateIndex
CREATE INDEX "_BlogsToTemplates_B_index" ON "_BlogsToTemplates"("B");
