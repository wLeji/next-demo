'use client'

import React from 'react'
import Styles from './betBar.module.css'

interface BetBarProps {
  bet: number
  setBet: (n: number) => void
  userTokens: number
}

const BetBar: React.FC<BetBarProps> = ({ bet, setBet, userTokens }) => {
  const updateBet = (action: string) => {
    if (action === 'clear') setBet(0)
    else if (action === '1/2') setBet(Math.floor(bet / 2))
    else if (action === 'x2') setBet(bet * 2)
    else if (action === 'max') setBet(userTokens)
    else {
      const amount = parseInt(action)
      if (!isNaN(amount)) setBet(bet + amount)
    }
  }

  return (
    <div className={Styles.container}>
      <div className={Styles.entryside}>
        <input
          type="number"
          min="0"
          value={bet === 0 ? '' : bet}
          onChange={(e) => /^\d*$/.test(e.target.value) && setBet(Number(e.target.value))}
          className={Styles.input}
          placeholder="Montant du pari"
        />
      </div>
      <div className={Styles.buttonside}>
        {['clear', '+1', '+5', '+10', '+100', '1/2', 'x2', 'max'].map(label => (
          <button key={label} className={Styles.button} onClick={() => updateBet(label.replace('+', ''))}>
            {label}
          </button>
        ))}
      </div>
    </div>

  )
}

export default BetBar
