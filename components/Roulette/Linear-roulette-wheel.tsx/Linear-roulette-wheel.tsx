"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import "./LinearRouletteWheel.css"
import { useUser } from '@/contexts/UserContext'


const rouletteNumbers = [
  0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27,
  13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1,
  20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26,
]

const getNumberColor = (num: number) => {
  if (num === 0) return "green"
  return [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36].includes(num)
    ? "red"
    : "black"
}

export default function LinearRouletteWheel({
  resultNumber,
  onRollEnd,
}: {
  resultNumber: number
  onRollEnd?: () => void
}) {
  const [xPos, setXPos] = useState(0)
  const [result, setResult] = useState<number | null>(null)
  const [isSpinning, setIsSpinning] = useState(false)
  const [animationKey, setAnimationKey] = useState(0)
  const [offset, setOffset] = useState(0)
  const [lastResultSeen, setLastResultSeen] = useState<number | null>(null)
  const [hasAlreadySpun, setHasAlreadySpun] = useState(false)
  const { refreshUser } = useUser()

  const SLOT_SIZE = 100
  const ADJUSTMENT = 40
  const bandWrapperRef = useRef<HTMLDivElement>(null)

  const repeatedNumbers = [...Array(5)].flatMap(() => rouletteNumbers)

  useEffect(() => {
    if (bandWrapperRef.current) {
      setOffset(bandWrapperRef.current.offsetWidth / 2)
    }
  }, [])

  const getTargetPosition = (num: number) => {
    const targetIndex = rouletteNumbers.indexOf(num) + rouletteNumbers.length * 2
    return -(targetIndex * SLOT_SIZE - offset + ADJUSTMENT)
  }

  useEffect(() => {
    if (resultNumber == null || offset === 0) return

    const target = getTargetPosition(resultNumber)

    if (resultNumber !== lastResultSeen) {
      setLastResultSeen(resultNumber)

      if (hasAlreadySpun) {
        // 🎯 Nouveau résultat → animation
        setXPos(5000)
        setAnimationKey(prev => prev + 1)
        setIsSpinning(true)

        setTimeout(() => {
          setXPos(target)
        }, 50)

        setTimeout(() => {
          setResult(resultNumber)
          setIsSpinning(false)
          refreshUser()
          onRollEnd?.()  
        }, 10000)
      } else {
        setXPos(target)
        setResult(resultNumber)
        setHasAlreadySpun(true)
      }
    }
  }, [resultNumber, offset])

  return (
    <div className="roulette-container">
      <div className="roulette-band-wrapper" ref={bandWrapperRef}>
        <div className="roulette-marker" />

        <motion.div
          key={animationKey}
          className="roulette-band"
          animate={{ x: xPos }}
          transition={{
            duration: isSpinning ? 10 : 0,
            ease: [0.1, 0.4, 0.7, 1],
          }}
        >
          {repeatedNumbers.map((number, index) => (
            <div key={index} className={`slot ${getNumberColor(number)}`}>
              <span>{number}</span>
            </div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {result !== null && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`result ${getNumberColor(result)}`}
          >
            <h2>Result: {result}</h2>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
