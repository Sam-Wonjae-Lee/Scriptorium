-- CreateTable
CREATE TABLE "Users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "avatar" BLOB,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Languages" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Templates" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "explanation" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL,
    "languageId" INTEGER NOT NULL,
    "code" TEXT NOT NULL,
    "forkedId" INTEGER,
    "isPublic" BOOLEAN NOT NULL,
    CONSTRAINT "Templates_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Languages" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Templates_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Tags" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Blogs" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "numReports" INTEGER NOT NULL DEFAULT 0,
    "isFlagged" BOOLEAN NOT NULL DEFAULT false,
    "numUpvotes" INTEGER NOT NULL DEFAULT 0,
    "numDownvotes" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "Blogs_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Comments" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "blogId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "numReports" INTEGER NOT NULL DEFAULT 0,
    "isFlagged" BOOLEAN NOT NULL DEFAULT false,
    "numUpvotes" INTEGER NOT NULL DEFAULT 0,
    "numDownvotes" INTEGER NOT NULL DEFAULT 0,
    "parentCommentId" INTEGER,
    CONSTRAINT "Comments_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blogs" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Comments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Comments_parentCommentId_fkey" FOREIGN KEY ("parentCommentId") REFERENCES "Comments" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "BlogRating" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "blogId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    CONSTRAINT "BlogRating_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blogs" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "BlogRating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CommentRating" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "commentId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    CONSTRAINT "CommentRating_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comments" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CommentRating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Reports" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "message" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "BlogReports" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "blogId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "reportId" INTEGER NOT NULL,
    CONSTRAINT "BlogReports_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blogs" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "BlogReports_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "BlogReports_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "Reports" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CommentReports" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "commentId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "reportId" INTEGER NOT NULL,
    CONSTRAINT "CommentReports_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comments" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CommentReports_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CommentReports_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "Reports" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "FlaggedBlogs" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "blogId" INTEGER NOT NULL,
    "reportId" INTEGER NOT NULL,
    CONSTRAINT "FlaggedBlogs_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blogs" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "FlaggedBlogs_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "Reports" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "FlaggedComments" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "commentId" INTEGER NOT NULL,
    "reportId" INTEGER NOT NULL,
    CONSTRAINT "FlaggedComments_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comments" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "FlaggedComments_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "Reports" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_TagsToTemplates" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_TagsToTemplates_A_fkey" FOREIGN KEY ("A") REFERENCES "Tags" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_TagsToTemplates_B_fkey" FOREIGN KEY ("B") REFERENCES "Templates" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_Tags" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_Tags_A_fkey" FOREIGN KEY ("A") REFERENCES "Blogs" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_Tags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tags" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_BlogsToTemplates" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_BlogsToTemplates_A_fkey" FOREIGN KEY ("A") REFERENCES "Blogs" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_BlogsToTemplates_B_fkey" FOREIGN KEY ("B") REFERENCES "Templates" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Users_phone_key" ON "Users"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Languages_name_key" ON "Languages"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Tags_name_key" ON "Tags"("name");

-- CreateIndex
CREATE UNIQUE INDEX "BlogRating_blogId_userId_key" ON "BlogRating"("blogId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "CommentRating_commentId_userId_key" ON "CommentRating"("commentId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "_TagsToTemplates_AB_unique" ON "_TagsToTemplates"("A", "B");

-- CreateIndex
CREATE INDEX "_TagsToTemplates_B_index" ON "_TagsToTemplates"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Tags_AB_unique" ON "_Tags"("A", "B");

-- CreateIndex
CREATE INDEX "_Tags_B_index" ON "_Tags"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_BlogsToTemplates_AB_unique" ON "_BlogsToTemplates"("A", "B");

-- CreateIndex
CREATE INDEX "_BlogsToTemplates_B_index" ON "_BlogsToTemplates"("B");
