/*
  Warnings:

  - You are about to drop the column `move` on the `Game` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Game" DROP COLUMN "move",
ADD COLUMN     "moves" TEXT[];
