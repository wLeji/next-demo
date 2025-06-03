// app/api/leaderboard/route.ts
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  const users = await prisma.user.findMany({
    orderBy: {
      tokens: 'desc',
    },
    select: {
      id: true,
      username: true,
      tokens: true,
    },
    take: 10, // top 10
  })

  return NextResponse.json(users)
}
