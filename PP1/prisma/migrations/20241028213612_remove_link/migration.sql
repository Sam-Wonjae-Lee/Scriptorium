/*
  Warnings:

  - You are about to drop the `Links` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_LanguagesToTemplates` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_Links` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `templateCodeId` on the `Templates` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "_LanguagesToTemplates_B_index";

-- DropIndex
DROP INDEX "_LanguagesToTemplates_AB_unique";

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
DROP TABLE "_LanguagesToTemplates";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_Links";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Templates" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "explanation" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL,
    "languageId" INTEGER NOT NULL,
    "code" TEXT NOT NULL,
    "isPublic" BOOLEAN NOT NULL,
    CONSTRAINT "Templates_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Languages" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Templates_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Templates" ("authorId", "code", "explanation", "id", "isPublic", "languageId", "title") SELECT "authorId", "code", "explanation", "id", "isPublic", "languageId", "title" FROM "Templates";
DROP TABLE "Templates";
ALTER TABLE "new_Templates" RENAME TO "Templates";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
