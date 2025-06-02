'use client'

import { createContext, useContext, useEffect, useState } from 'react'

interface UserData {
  username: string
  tokens: number
}

interface UserContextType {
  user: UserData | null
  refreshUser: () => Promise<void>
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserData | null>(null)

  const fetchUser = async () => {
    try {
      const res = await fetch('/api/user/coins', { cache: 'no-store' })
      if (!res.ok) return setUser(null)
      const data = await res.json()
      setUser(data)
    } catch (err) {
      console.error('Erreur de récupération du user:', err)
      setUser(null)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <UserContext.Provider value={{ user, refreshUser: fetchUser }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) throw new Error('useUser must be used within UserProvider')
  return context
}
