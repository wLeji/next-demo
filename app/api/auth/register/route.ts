import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'

export async function POST(req: Request) {
  const { email, username, password } = await req.json()
  const existing = await prisma.user.findUnique({ where: { email } })

  if (existing) return NextResponse.json({ error: 'Email déjà utilisé' }, { status: 400 })

  const hashed = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: { email, username, password: hashed },
  })

  const res = NextResponse.json({ success: true })
  res.cookies.set('userId', user.id, {
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  })

  return res
}
