import { runBattleEngine } from './battleEngine'

const BATTLE_INTERVAL = parseInt(process.env.BATTLE_INTERVAL_MS || '2000', 10)

async function loop() {
  try {
    await runBattleEngine()
  } catch (err) {
    console.error('[❌ BattleEngine] Erreur détectée :', err)
  }

  setTimeout(loop, BATTLE_INTERVAL)
}

loop()
