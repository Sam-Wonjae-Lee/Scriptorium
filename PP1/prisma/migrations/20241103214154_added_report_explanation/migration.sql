/*
  Warnings:

  - Added the required column `explanation` to the `BlogReports` table without a default value. This is not possible if the table is not empty.
  - Added the required column `explanation` to the `CommentReports` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_BlogReports" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "blogId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "reportId" INTEGER NOT NULL,
    "explanation" TEXT NOT NULL,
    CONSTRAINT "BlogReports_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blogs" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "BlogReports_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "BlogReports_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "Reports" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_BlogReports" ("blogId", "id", "reportId", "userId") SELECT "blogId", "id", "reportId", "userId" FROM "BlogReports";
DROP TABLE "BlogReports";
ALTER TABLE "new_BlogReports" RENAME TO "BlogReports";
CREATE TABLE "new_CommentReports" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "commentId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "reportId" INTEGER NOT NULL,
    "explanation" TEXT NOT NULL,
    CONSTRAINT "CommentReports_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comments" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CommentReports_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CommentReports_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "Reports" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_CommentReports" ("commentId", "id", "reportId", "userId") SELECT "commentId", "id", "reportId", "userId" FROM "CommentReports";
DROP TABLE "CommentReports";
ALTER TABLE "new_CommentReports" RENAME TO "CommentReports";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
