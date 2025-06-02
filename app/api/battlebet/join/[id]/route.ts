// app/api/battlebet/join/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const battleId = params.id
  const cookieStore = cookies()
  const userId = cookieStore.get('userId')?.value

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const battle = await prisma.battleBet.findUnique({
    where: { id: battleId },
    include: {
      participants: true,
    },
  })

  if (!battle || battle.status !== 'WAITING') {
    return NextResponse.json({ error: 'BattleBet non disponible' }, { status: 400 })
  }

  if (battle.participants.find((p) => p.id === userId)) {
    return NextResponse.json({ error: 'Vous êtes déjà dans ce duel' }, { status: 400 })
  }

  const user = await prisma.user.findUnique({ where: { id: userId } })
  if (!user || user.tokens < battle.amount) {
    return NextResponse.json({ error: 'Pas assez de tokens' }, { status: 400 })
  }

  // Retirer les tokens du 2e joueur
  await prisma.user.update({
    where: { id: userId },
    data: {
      tokens: { decrement: battle.amount },
    },
  })

  const allParticipants = [...battle.participants, user]
  const winnerIndex = Math.floor(Math.random() * 2)
  const winner = allParticipants[winnerIndex]

  // Mise à jour du BattleBet
  const updated = await prisma.battleBet.update({
    where: { id: battleId },
    data: {
      status: 'COMPLETE',
      winner: { connect: { id: winner.id } },
      participants: {
        connect: { id: userId },
      },
    },
    include: { participants: true, winner: true },
  })

  // Donner les gains au gagnant
  await prisma.user.update({
    where: { id: winner.id },
    data: {
      tokens: { increment: battle.amount * 2 },
    },
  })

  return NextResponse.json({ message: 'Battle résolu !', winner: winner.username }, { status: 200 })
}
