// app/api/battlebet/create/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'

export async function POST(req: NextRequest) {
  const cookieStore = cookies()
  const userId = cookieStore.get('userId')?.value

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized (missing userId)' }, { status: 401 })
  }

  const body = await req.json()
  const amount = body.amount

  if (!amount || typeof amount !== 'number' || amount <= 0) {
    return NextResponse.json({ error: 'Invalid amount' }, { status: 400 })
  }

  const user = await prisma.user.findUnique({ where: { id: userId } })
  if (!user || user.tokens < amount) {
    return NextResponse.json({ error: 'Insufficient tokens' }, { status: 400 })
  }

  // Décrémente les coins
  await prisma.user.update({
    where: { id: userId },
    data: {
      tokens: { decrement: amount },
    },
  })

  // Crée le BattleBet
  const battleBet = await prisma.battleBet.create({
    data: {
      amount,
      status: 'WAITING',
      participants: {
        connect: { id: userId },
      },
    },
    include: {
      participants: true,
    },
  })

  return NextResponse.json(battleBet, { status: 201 })
}
