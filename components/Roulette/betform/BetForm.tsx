'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { placeBet } from '@/app/actions/placeBet'
import { RouletteColor, Bet } from '@prisma/client'
import { useAuth } from '@/contexts/AuthContext'
import BetBar from '@/components/Roulette/betbar/betBar'
import BetScreen from '@/components/Roulette/betscreen/betScreen'
import Style from './BetForm.module.css'
import { useUser } from '@/contexts/UserContext'
import type { PublicUser } from '@/app/types/user'

interface BetFormProps {
  sessionId: string
  bets: (Bet & { user: PublicUser })[]
}

export function BetForm({ sessionId, bets }: BetFormProps) {
  const { user } = useAuth()
  const router = useRouter()
  const { refreshUser } = useUser()

  const [amount, setAmount] = useState<number>(0)
  const [color, setColor] = useState<RouletteColor>('RED')
  const [loading, setLoading] = useState<boolean>(false)
  const [success, setSuccess] = useState<string | null>(null)

  const [localBets, setLocalBets] = useState<(Bet & { user: PublicUser })[]>(bets)

  useEffect(() => {
    const interval = setInterval(() => {
      if (document.visibilityState === 'visible' && !loading) {
        router.refresh()
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [loading, router])

  useEffect(() => {
    setLocalBets(bets)
  }, [bets])

  if (!user) return <p className="text-red-600">Vous devez être connecté pour parier.</p>

  const handleSubmit = async (colorToBet: RouletteColor) => {
    if (!amount || amount <= 0) return alert("Montant invalide.")
    setLoading(true)
    setSuccess(null)

    const res = await placeBet({ sessionId, userId: user.id, amount, choice: colorToBet })

    if (res?.error) {
      alert(res.error)
    } else {
      setSuccess('Pari enregistré !')
      setLocalBets((prev) => [
        ...prev,
        {
          id: 'temp-' + Date.now(),
          amount,
          choice: colorToBet,
          sessionId,
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: user.id,
          user: {
            id: user.id,
            username: user.username,
            tokens: user.tokens,
          },
        },
      ])
    }

    await refreshUser()
    setLoading(false)
  }

  return (
    <div className={Style.container}>
      <BetBar bet={amount} setBet={setAmount} userTokens={user.tokens} />
      <BetScreen
        selectedColor={color}
        setColor={setColor}
        handleSubmit={handleSubmit}
        loading={loading}
        bets={localBets}
      />
      {success && <p className="text-green-600 mt-2 text-center">{success}</p>}
    </div>
  )
}

export default BetForm
