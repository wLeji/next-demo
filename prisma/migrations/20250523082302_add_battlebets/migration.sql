-- CreateEnum
CREATE TYPE "BattleBetStatus" AS ENUM ('WAITING', 'ONGOING', 'COMPLETE');

-- CreateTable
CREATE TABLE "BattleBet" (
    "id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "winnerId" TEXT,
    "status" "BattleBetStatus" NOT NULL DEFAULT 'WAITING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BattleBet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BattleParticipants" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_BattleParticipants_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_BattleParticipants_B_index" ON "_BattleParticipants"("B");

-- AddForeignKey
ALTER TABLE "BattleBet" ADD CONSTRAINT "BattleBet_winnerId_fkey" FOREIGN KEY ("winnerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BattleParticipants" ADD CONSTRAINT "_BattleParticipants_A_fkey" FOREIGN KEY ("A") REFERENCES "BattleBet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BattleParticipants" ADD CONSTRAINT "_BattleParticipants_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
