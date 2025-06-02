// prisma/seed.ts
import { PrismaClient, RouletteColor } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // 1. Création de 3 utilisateurs
  const [alice, bob, jules] = await Promise.all([
    prisma.user.upsert({
      where: { email: 'alice@example.com' },
      update: {},
      create: {
        email: 'alice@example.com',
        username: 'Alice',
        password: 'password123',
      },
    }),
    prisma.user.upsert({
      where: { email: 'bob@example.com' },
      update: {},
      create: {
        email: 'bob@example.com',
        username: 'Bob',
        password: 'password123',
      },
    }),
    prisma.user.upsert({
      where: { email: 'jules@example.com' },
      update: {},
      create: {
        email: 'jules@example.com',
        username: 'Jules',
        password: 'password123',
      },
    }),
  ])

  // 2. Création d'une session de roulette en cours (sur 1 minute)
  const now = new Date()
  const end = new Date(now.getTime() + 60 * 1000) // +1 minute

  const session = await prisma.rouletteSession.create({
    data: {
      startTime: now,
      endTime: end,
    },
  })

  // 3. Création de paris
  await Promise.all([
    prisma.bet.create({
      data: {
        userId: alice.id,
        sessionId: session.id,
        amount: 10,
        choice: RouletteColor.RED,
      },
    }),
    prisma.bet.create({
      data: {
        userId: bob.id,
        sessionId: session.id,
        amount: 15,
        choice: RouletteColor.BLACK,
      },
    }),
    prisma.bet.create({
      data: {
        userId: jules.id,
        sessionId: session.id,
        amount: 5,
        choice: RouletteColor.GREEN,
      },
    }),
  ])

  // 4. Création d'un BattleBet
  const battleBet = await prisma.battleBet.create({
    data: {
      amount: 50,
      participants: {
        connect: [
          { id: alice.id },
          { id: bob.id },
        ],
      },
      winner: {
        connect: { id: alice.id },
      },
      status: 'WAITING', // Assuming BattleBetStatus is an enum with values like WAITING, COMPLETED, etc.
    },
  })

  console.log('✅ Seed terminé : users, session et bets créés')
}

main()
  .catch((e) => {
    console.error('❌ Erreur seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
