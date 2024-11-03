-- CreateTable
CREATE TABLE "_TagsToTemplates" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_TagsToTemplates_A_fkey" FOREIGN KEY ("A") REFERENCES "Tags" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_TagsToTemplates_B_fkey" FOREIGN KEY ("B") REFERENCES "Templates" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_TagsToTemplates_AB_unique" ON "_TagsToTemplates"("A", "B");

-- CreateIndex
CREATE INDEX "_TagsToTemplates_B_index" ON "_TagsToTemplates"("B");
