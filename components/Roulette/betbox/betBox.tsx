'use client'

import React from 'react'
import Styles from './betBox.module.css'
import { RouletteColor, Bet, User } from '@prisma/client'

interface BetBoxProps {
  betType: RouletteColor
  selected: boolean
  onSelect: () => void
  handleSubmit: () => void
  loading: boolean
  bettors: (Bet & { user: User })[]
}

const BetBox: React.FC<BetBoxProps> = ({ betType, handleSubmit, loading, bettors }) => {
  return (
    <div className={Styles.container}>
      <div className={Styles.upper}>
        <button
          className={`${Styles.button} ${Styles[betType.toLowerCase()]}`}
          disabled={loading}
          onClick={handleSubmit}
        >
          <h2>Place Bet</h2>
        </button>
      </div>

      <ul className={Styles.bettorList}>
        {bettors.map((b, i) => (
          <li key={i}>{b.user.username} — {b.amount}💰</li>
        ))}
      </ul>
    </div>
  )
}


export default BetBox





