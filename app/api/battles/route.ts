import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { BattleBetStatus } from '@prisma/client'

export async function GET() {
  const battles = await prisma.battleBet.findMany({
    where: {
      status: {
        in: [BattleBetStatus.WAITING, BattleBetStatus.IN_PROGRESS, BattleBetStatus.DONE],
      },
    },
    include: {
      participants: true,
      winner: true,
    },
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json(battles)
}
