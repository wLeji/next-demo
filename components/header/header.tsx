'use client'

import Styles from './header.module.css'
import LogoutButton from '@/components/auth/LogoutButton'
import { useUser } from '@/contexts/UserContext' // 👈 AJOUTÉ

export default function Header() {
  const { user } = useUser()

  return (
    <header className={Styles.header}>
      <div className={Styles.appname}>
        <h1>Casino Rigolo</h1>
      </div>
      <div className={Styles.nav}>
        <a href="/roulette" className={Styles.link}>Roulette</a>
        <a href="/battlebet" className={Styles.link}>BattleBet</a>
        <a href="/leaderboard" className={Styles.link}>Leaderboard</a>
      </div>
      <div className={Styles.usermenu}>
        {user ? (
          <div className={Styles.userinfo}>
            <a href="/profile" className={Styles.profileLink}>
              <span>👤 {user.username}</span>
            </a>
            <span>{user.tokens} 💵</span>
            <LogoutButton />
          </div>
        ) : (
          <a href="/login" className="bg-blue-500 text-white px-4 py-2 rounded">
            Se connecter
          </a>
        )}
      </div>
    </header>
  )
}
