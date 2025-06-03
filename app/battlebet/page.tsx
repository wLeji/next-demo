import BattleBetForm from '@/components/BattleBet/battlebetform/BattleBetForm'
import BattleBetList from '@/components/BattleBet/battlebetlist/BattleBetList'
import { prisma } from '@/lib/prisma'
import { BattleBetStatus } from '@prisma/client'

export default async function BattleBetPage() {
  const battles = await prisma.battleBet.findMany({
    
    where: {
      status: {
          in: [BattleBetStatus.WAITING, BattleBetStatus.IN_PROGRESS, BattleBetStatus.DONE],
        }
    },
    include: {
      participants: true,
      winner: true,
    },
    orderBy: { createdAt: 'desc' },
  });
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">⚔️ BattleBets</h1>
      <BattleBetForm />
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">BattleBets en attente</h2>
        <BattleBetList battles={battles} />
      </div>
    </div>
  );
}
