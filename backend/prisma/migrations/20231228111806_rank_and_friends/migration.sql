-- AlterTable
ALTER TABLE "User" ADD COLUMN     "friends" INTEGER[],
ADD COLUMN     "rank" INTEGER NOT NULL DEFAULT 500;
