import { runBattleEngine } from './battleEngine'

const BATTLE_INTERVAL = parseInt(process.env.BATTLE_INTERVAL_MS || '2000', 10)

async function loop() {
  await runBattleEngine()
  setTimeout(loop, BATTLE_INTERVAL)
}

loop()