'use client'

import React from 'react'
import Styles from './betScreen.module.css'
import BetBox from '../betbox/betBox'
import { RouletteColor, Bet, User } from '@prisma/client'

interface BetScreenProps {
  selectedColor: RouletteColor
  setColor: (c: RouletteColor) => void
  handleSubmit: (color: RouletteColor) => void
  loading: boolean
  bets: (Bet & { user: User })[]
}

const BetScreen: React.FC<BetScreenProps> = ({ selectedColor, setColor, handleSubmit, loading, bets }) => {
  const colors: RouletteColor[] = ['RED', 'BLACK', 'GREEN']

  return (
    <div className={Styles.container}>
      {colors.map((color) => (
        <BetBox
          key={color}
          betType={color}
          handleSubmit={() => handleSubmit(color)}
          loading={loading}
          bettors={bets.filter(bet => bet.choice === color)}
          selected={selectedColor === color}
          onSelect={() => setColor(color)}
        />
      
      ))}
    </div>
  )
}

export default BetScreen

