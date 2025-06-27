'use client'

import React from 'react'
import Styles from './betScreen.module.css'
import BetBox from '../betbox/betBox'
import { RouletteColor, Bet } from '@prisma/client'
import type { PublicUser } from '@/app/types/user'

interface BetScreenProps {
  selectedColor: RouletteColor
  setColor: (c: RouletteColor) => void
  handleSubmit: (color: RouletteColor) => void
  loading: boolean
  bets: (Bet & { user: PublicUser })[]
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
          bettors={bets.filter(bet => bet.choice === color).map(bet => ({
            ...bet,
            user: {
              ...bet.user,
              createdAt: new Date(), // Replace with actual values if available
              email: '',
              password: '',
              tokens: 0,
            },
          }))}
          selected={selectedColor === color}
          onSelect={() => setColor(color)}
        />
      
      ))}
    </div>
  )
}

export default BetScreen

