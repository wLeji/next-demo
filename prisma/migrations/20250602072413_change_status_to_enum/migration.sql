/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `BattleBet` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BattleBet" DROP COLUMN "updatedAt",
ALTER COLUMN "amount" SET DATA TYPE DOUBLE PRECISION;

-- CreateTable
CREATE TABLE "Participant" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "battleId" TEXT NOT NULL,

    CONSTRAINT "Participant_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_battleId_fkey" FOREIGN KEY ("battleId") REFERENCES "BattleBet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
