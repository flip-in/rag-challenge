-- CreateTable
CREATE TABLE "Post" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "category" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "author" TEXT NOT NULL,
    "image" TEXT,
    "snippet" TEXT
);
