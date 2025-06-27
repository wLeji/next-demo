"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rouletteEngine_1 = require("./rouletteEngine");
const SPIN_INTERVAL = parseInt(process.env.SPIN_INTERVAL_MS || '60000', 10);
async function loop() {
    await (0, rouletteEngine_1.runSpinEngine)();
    setTimeout(loop, SPIN_INTERVAL);
}
loop();
