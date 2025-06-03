'use server'

import { prisma } from '@/lib/prisma'
import { BattleBetStatus } from '@prisma/client'

export async function joinBattleBet(data: {
  battleId: string
  userId: string
}) {
  try {
    const battle = await prisma.battleBet.findUnique({
      where: { id: data.battleId },
      include: { participants: true },
    })

    if (!battle) return { error: 'BattleBet introuvable' }

    if (battle.participants.some(p => p.id === data.userId)) {
      return { error: 'Vous êtes déjà dans ce BattleBet' }
    }

    const user = await prisma.user.findUnique({ where: { id: data.userId } })
    if (!user) return { error: 'Utilisateur introuvable' }

    if (user.tokens < battle.amount) {
      return { error: 'Solde insuffisant' }
    }

    // ⚠️ Transaction interactive
    await prisma.$transaction(async (tx) => {
      // 1. Ajout du participant
      const updatedBattle = await tx.battleBet.update({
        where: { id: data.battleId },
        data: {
          participants: {
            connect: { id: data.userId },
          },
        },
        include: { participants: true },
      })

      // 2. Mise à jour du status SI on est maintenant à 2 joueurs
      if (updatedBattle.participants.length === 2) {
        await tx.battleBet.update({
          where: { id: data.battleId },
          data: {
            status: BattleBetStatus.IN_PROGRESS,
          },
        })
      }

      // 3. Décrémente les tokens
      await tx.user.update({
        where: { id: data.userId },
        data: {
          tokens: {
            decrement: battle.amount,
          },
        },
      })
    })

    return { success: true }
  } catch (e) {
    console.error('[joinBattleBet error]', e)
    return { error: 'Erreur lors de la participation au BattleBet' }
  }
}
