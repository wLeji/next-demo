'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createBattleBet } from '@/app/actions/createBattleBet'
import { useAuth } from '@/contexts/AuthContext'
import { useUser } from '@/contexts/UserContext'


export default function BattleBetForm() {
  const { user } = useAuth()
  const { refreshUser } = useUser()
  const router = useRouter()

  const [amount, setAmount] = useState<number>(0)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)

  if (!user) return <p className="text-red-600">Vous devez être connecté pour créer un BattleBet.</p>

  const handleSubmit = async () => {
    if (!amount || amount <= 0) return alert("Montant invalide.")
    setLoading(true)
    setSuccess(null)

    const res = await createBattleBet({ userId: user.id, amount })

    if (res?.error) {
      alert(res.error)
    } else {
      setSuccess('BattleBet créé !')
      router.refresh() // Pour afficher la nouvelle liste
    }

    await refreshUser()
    setLoading(false)
  }

  return (
    <div className="bg-gray-100 p-4 rounded shadow max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Créer un BattleBet</h2>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        placeholder="Montant"
        className="w-full mb-2 p-2 border rounded"
      />
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Création...' : 'Créer'}
      </button>
      {success && <p className="text-green-600 mt-2 text-center">{success}</p>}
    </div>
  )
}
