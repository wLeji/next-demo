'use server'

import { prisma } from '@/lib/prisma'

export async function createBattleBet(data: {
    userId: string
    amount: number
  }) {
    try {
      const user = await prisma.user.findUnique({ where: { id: data.userId } })
  
      if (!user) return { error: 'Utilisateur introuvable' }
  
      if (user.tokens < data.amount) {
        return { error: 'Solde insuffisant' }
      }
      await prisma.$transaction([
        prisma.battleBet.create({
          data: {
            amount: data.amount,
            status: 'WAITING',
            participants: {
              connect: { id: data.userId },
            },
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
      console.error('[Create BattleBet error]', e)
      return { error: 'Erreur lors de l\'enregistrement du pari' }
    }
  }
  