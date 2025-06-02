'use server'

import { prisma } from '@/lib/prisma'
import { RouletteColor } from '@prisma/client'


export async function placeBet(data: {
  sessionId: string
  userId: string
  amount: number
  choice: RouletteColor
}) {
  try {
    const user = await prisma.user.findUnique({ where: { id: data.userId } })

    if (!user) return { error: 'Utilisateur introuvable' }

    if (user.tokens < data.amount) {
      return { error: 'Solde insuffisant' }
    }

    await prisma.$transaction([
      prisma.bet.create({
        data: {
          userId: data.userId,
          sessionId: data.sessionId,
          amount: data.amount,
          choice: data.choice,
        },
      }),
      prisma.user.update({
        where: { id: data.userId },
        data: {
          tokens: {
            decrement: data.amount,
          },
        },
      }),
    ])

    return { success: true }
  } catch (e) {
    console.error('[placeBet error]', e)
    return { error: 'Erreur lors de l\'enregistrement du pari' }
  }
}
