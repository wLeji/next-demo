import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  const userId = (await cookies()).get('userId')?.value
  if (!userId) return NextResponse.json({ error: 'Non connecté' }, { status: 401 })

  const user = await prisma.user.findUnique({ where: { id: userId } })
  if (!user) return NextResponse.json({ error: 'Utilisateur introuvable' }, { status: 401 })

  return NextResponse.json({
    id: user.id,
    username: user.username,
    tokens: user.tokens,
  })
}
