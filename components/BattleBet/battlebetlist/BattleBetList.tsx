'use client'

import { useAuth } from '@/contexts/AuthContext'
import { BattleBet, User, BattleBetStatus } from '@prisma/client'
import { joinBattleBet } from '@/app/actions/joinBattleBet'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'

interface BattleBetListProps {
  battles: (BattleBet & { participants: User[], winner: User | null })[]
}

interface Notification {
  message: string
  type: 'win' | 'lose'
}

export default function BattleBetList({ battles }: BattleBetListProps) {
  const { user } = useAuth()
  const router = useRouter()

  const [notification, setNotification] = useState<Notification | null>(null)
  const alreadyHandled = useRef<Set<string>>(new Set())

  const handleJoin = async (battleId: string) => {
    if (!user) return
    const res = await joinBattleBet({ battleId, userId: user.id })

    if (res?.error) {
      alert(res.error)
    } else {
      router.refresh()
    }
  }

  // 🔔 Check si une battle DONE concerne l'utilisateur
  useEffect(() => {
    if (!user) return

    battles.forEach((battle) => {
      const isParticipant = battle.participants.some(p => p.id === user.id)

      if (
        battle.status === BattleBetStatus.DONE &&
        isParticipant &&
        !alreadyHandled.current.has(battle.id)
      ) {
        alreadyHandled.current.add(battle.id)

        const youWon = battle.winner?.id === user.id
        const opponent = battle.participants.find(p => p.id !== user.id)
        const message = youWon
          ? `🏆 Vous avez gagné ${battle.amount * 2} coins contre ${opponent?.username}`
          : `😢 Vous avez perdu ${battle.amount} coins contre ${battle.winner?.username}`

        setNotification({
          message,
          type: youWon ? 'win' : 'lose',
        })

        setTimeout(() => setNotification(null), 5000)
      }
    })
  }, [battles, user])

  return (
    <>
      {/* Notification Popup */}
      {notification && (
        <div
          className={`fixed top-6 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded shadow-lg z-50 text-white transition-all duration-500 ${
            notification.type === 'win' ? 'bg-green-600' : 'bg-red-600'
          }`}
        >
          {notification.message}
        </div>
      )}

      <ul className="space-y-4 mt-4">
        {battles
          .filter(b => b.status !== BattleBetStatus.FINISHED)
          .map((battle) => {
            const isAlreadyParticipant = user && battle.participants.some((p) => p.id === user.id)

            return (
              <li key={battle.id} className="p-4 bg-white rounded shadow">
                <p className="text-lg font-semibold">💰 Montant : {battle.amount}</p>
                <p>👥 Participants : {battle.participants.map(p => p.username).join(', ')}</p>

                <p>
                  🕓 Statut :{' '}
                  {battle.status === BattleBetStatus.WAITING && (
                    <span className="text-yellow-500 font-medium">En attente</span>
                  )}
                  {battle.status === BattleBetStatus.IN_PROGRESS && (
                    <span className="text-blue-500 font-medium">En cours...</span>
                  )}
                  {battle.status === BattleBetStatus.DONE && (
                    <span className="text-green-500 font-medium">Terminé</span>
                  )}
                </p>

                {battle.status === BattleBetStatus.DONE && (
                  <p className="mt-1 text-green-700 font-semibold">
                    🏆 Gagnant : {battle.winner?.username ?? '???'}
                  </p>
                )}

                {battle.status === BattleBetStatus.IN_PROGRESS && (
                  <div className="w-full bg-gray-200 rounded mt-2 h-2">
                    <div
                      className="bg-blue-500 h-2 rounded"
                      style={{ width: `${(battle.progressionStep / 5) * 100}%` }}
                    />
                  </div>
                )}

                {battle.status === BattleBetStatus.WAITING && !isAlreadyParticipant && user && (
                  <button
                    onClick={() => handleJoin(battle.id)}
                    className="mt-3 bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
                  >
                    Rejoindre
                  </button>
                )}

                {isAlreadyParticipant && (
                  <p className="text-sm text-gray-500 mt-2 italic">
                    ✅ Vous participez déjà à ce pari
                  </p>
                )}
              </li>
            )
          })}
      </ul>
    </>
  )
}
