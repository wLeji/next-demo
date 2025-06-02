/*
  Warnings:

  - The `result` column on the `RouletteSession` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "RouletteSession" DROP COLUMN "result",
ADD COLUMN     "result" INTEGER;
