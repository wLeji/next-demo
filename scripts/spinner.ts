import { runSpinEngine } from './rouletteEngine'

const SPIN_INTERVAL = parseInt(process.env.SPIN_INTERVAL_MS || '60000', 10)

async function loop() {
  await runSpinEngine()
  setTimeout(loop, SPIN_INTERVAL)
}

loop()
