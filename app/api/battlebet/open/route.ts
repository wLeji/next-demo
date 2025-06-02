// app/api/battlebet/open/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const openBattles = await prisma.battleBet.findMany({
      where: {
        status: 'WAITING',
      },
      include: {
        participants: {
          select: {
            id: true,
            username: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(openBattles)
  } catch (error) {
    console.error('Error fetching open battles:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
