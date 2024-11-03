/*
  Warnings:

  - You are about to drop the `TemplateCodes` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `code` to the `Templates` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isPublic` to the `Templates` table without a default value. This is not possible if the table is not empty.
  - Added the required column `languageId` to the `Templates` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "TemplateCodes";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "_LanguagesToTemplates" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_LanguagesToTemplates_A_fkey" FOREIGN KEY ("A") REFERENCES "Languages" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_LanguagesToTemplates_B_fkey" FOREIGN KEY ("B") REFERENCES "Templates" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Templates" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "explanation" TEXT NOT NULL,
    "templateCodeId" INTEGER NOT NULL,
    "authorId" INTEGER NOT NULL,
    "code" TEXT NOT NULL,
    "languageId" INTEGER NOT NULL,
    "isPublic" BOOLEAN NOT NULL,
    CONSTRAINT "Templates_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Templates" ("authorId", "explanation", "id", "templateCodeId", "title") SELECT "authorId", "explanation", "id", "templateCodeId", "title" FROM "Templates";
DROP TABLE "Templates";
ALTER TABLE "new_Templates" RENAME TO "Templates";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "_LanguagesToTemplates_AB_unique" ON "_LanguagesToTemplates"("A", "B");

-- CreateIndex
CREATE INDEX "_LanguagesToTemplates_B_index" ON "_LanguagesToTemplates"("B");
