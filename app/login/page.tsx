'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [error, setError] = useState('')
  const router = useRouter()

  const submit = async () => {
    setError('')
    const res = await fetch(`/api/auth/${mode}`, {
      method: 'POST',
      body: JSON.stringify({ email, password, username }),
    })

    const data = await res.json()
    if (res.ok) {
      router.push('/roulette')
    } else {
      setError(data?.error || 'Erreur inconnue')
    }
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        {mode === 'login' ? 'Connexion' : 'Créer un compte'}
      </h1>

      {mode === 'register' && (
        <input placeholder="Pseudo" value={username} onChange={(e) => setUsername(e.target.value)} className="border p-2 w-full mb-2" />
      )}
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="border p-2 w-full mb-2" />
      <input placeholder="Mot de passe" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="border p-2 w-full mb-4" />

      <button onClick={submit} className="bg-blue-600 text-white px-4 py-2 rounded w-full">
        {mode === 'login' ? 'Se connecter' : 'Créer un compte'}
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      <p className="text-sm mt-4 text-center text-gray-600">
        {mode === 'login' ? "Pas encore de compte ?" : "Déjà inscrit ?"}{' '}
        <button onClick={() => setMode(mode === 'login' ? 'register' : 'login')} className="underline">
          {mode === 'login' ? 'Créer un compte' : 'Se connecter'}
        </button>
      </p>
    </div>
  )
}
