import { prisma } from '@/lib/prisma'
import { RouletteColor } from '@prisma/client'
import { BetForm } from '@/components/Roulette/betform/BetForm'
import RouletteWheel from '@/components/Roulette/Linear-roulette-wheel.tsx/Linear-roulette-wheel'
import Styles from './page.module.css'

export const dynamic = 'force-dynamic';

export default async function RoulettePage() {
  // Session en cours (encore ouverte)
  const currentSession = await prisma.rouletteSession.findFirst({
    where: { isComplete: false },
    orderBy: { startTime: 'desc' },
    include: {
      bets: {
        include: { user: true },
      },
    },
  })

  // Dernière session terminée (affichage résultat)
  const lastCompletedSession = await prisma.rouletteSession.findFirst({
    where: { isComplete: true },
    orderBy: { endTime: 'desc' },
    include: {
      winners: true,
    },
  })

  return (
    <div className={Styles.container}>
      {lastCompletedSession && (
        <div className="bg-gray-100 p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">🌀 Résultat de la dernière session</h2>
          <p className="text-sm text-gray-500 mb-2">
            ID : <span className="font-mono">{lastCompletedSession.id}</span><br />
            Résultat :{' '}
            <span className={`font-semibold text-${getColorClass(mapResultToColor(lastCompletedSession.result))}`}>
              {lastCompletedSession.result}
            </span>
          </p>
          <p className="text-sm text-gray-500">
            Gagnants :{' '}
            {lastCompletedSession.winners.length > 0
              ? lastCompletedSession.winners.map((w) => w.username).join(', ')
              : 'Aucun'}
          </p>
        </div>
      )}

      {currentSession ? (
        <>
          <RouletteWheel resultNumber={lastCompletedSession?.result ?? 0} />
          <BetForm sessionId={currentSession.id} bets={currentSession.bets} />
        </>
      ) : (
        <div className="p-6 text-gray-600">🎲 Aucune session en cours</div>
      )}
    </div>
  )
}

function mapResultToColor(result: number | null): RouletteColor | null {
  switch (result) {
    case 0:
      return 'GREEN';
    case 1:
      return 'RED';
    case 2:
      return 'BLACK';
    default:
      return null;
  }
}

function getColorClass(color: RouletteColor | null) {
  switch (color) {
    case 'RED':
      return 'red-600'
    case 'BLACK':
      return 'gray-800'
    case 'GREEN':
      return 'green-600'
    default:
      return 'gray-400'
  }
}
