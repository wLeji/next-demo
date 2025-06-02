import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  const last = await prisma.rouletteSession.findFirst({
    orderBy: { startTime: 'desc' },
    include: {
      bets: {
        include: { user: true },
      },
      winners: true,
    },
  })

  return NextResponse.json({
    id: last?.id,
    result: last?.result,
    startTime: last?.startTime,
    endTime: last?.endTime,
    isComplete: last?.isComplete,
    bets: last?.bets.map(b => ({
      user: b.user.username,
      choice: b.choice,
      amount: b.amount,
    })),
    winners: last?.winners.map(w => w.username),
  })
}
