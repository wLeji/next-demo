"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const battleEngine_1 = require("./battleEngine");
const BATTLE_INTERVAL = parseInt(process.env.BATTLE_INTERVAL_MS || '2000', 10);
async function loop() {
    try {
        await (0, battleEngine_1.runBattleEngine)();
    }
    catch (err) {
        console.error('[❌ BattleEngine] Erreur détectée :', err);
    }
    setTimeout(loop, BATTLE_INTERVAL);
}
loop();
