"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runBattleEngine = runBattleEngine;
const prisma_1 = require("../lib/prisma");
const client_1 = require("@prisma/client");
async function runBattleEngine() {
    console.log(`[BattleEngine] Check à ${new Date().toLocaleTimeString()}`);
    // STEP 1 : WAITING → IN_PROGRESS (si 2 joueurs)
    const waitingBattles = await prisma_1.prisma.battleBet.findMany({
        where: { status: client_1.BattleBetStatus.WAITING },
        include: { participants: true },
    });
    for (const battle of waitingBattles) {
        if (battle.participants.length === 2) {
            await prisma_1.prisma.battleBet.update({
                where: { id: battle.id },
                data: {
                    status: client_1.BattleBetStatus.IN_PROGRESS,
                    progressionStep: 0,
                },
            });
            console.log(`🕐 Battle ${battle.id} → IN_PROGRESS`);
        }
    }
    // STEP 2 : IN_PROGRESS → DONE (à 5 ticks)
    const inProgressBattles = await prisma_1.prisma.battleBet.findMany({
        where: { status: client_1.BattleBetStatus.IN_PROGRESS },
        include: { participants: true },
    });
    for (const battle of inProgressBattles) {
        if (battle.participants.length < 2)
            continue;
        if (battle.progressionStep < 4) {
            await prisma_1.prisma.battleBet.update({
                where: { id: battle.id },
                data: { progressionStep: { increment: 1 } },
            });
            console.log(`⏳ Battle ${battle.id} → tick ${battle.progressionStep + 1}/5`);
        }
        else {
            const [p1, p2] = battle.participants;
            const winner = Math.random() < 0.5 ? p1 : p2;
            const total = battle.amount * 2;
            await prisma_1.prisma.battleBet.update({
                where: { id: battle.id },
                data: {
                    status: client_1.BattleBetStatus.DONE,
                    winner: { connect: { id: winner.id } },
                    progressionStep: 5,
                },
            });
            await prisma_1.prisma.user.update({
                where: { id: winner.id },
                data: {
                    tokens: { increment: total },
                },
            });
            console.log(`🏆 Battle ${battle.id} → DONE (gagnant : ${winner.username} +${total})`);
        }
    }
    // STEP 3 : DONE → FINISHED après 5 ticks
    const doneBattles = await prisma_1.prisma.battleBet.findMany({
        where: { status: client_1.BattleBetStatus.DONE },
    });
    for (const battle of doneBattles) {
        if (battle.progressionStep < 10) {
            await prisma_1.prisma.battleBet.update({
                where: { id: battle.id },
                data: {
                    progressionStep: { increment: 1 },
                },
            });
            console.log(`🧘 Battle ${battle.id} visible en DONE (${battle.progressionStep - 5}/5)`);
        }
        else {
            await prisma_1.prisma.battleBet.update({
                where: { id: battle.id },
                data: {
                    status: client_1.BattleBetStatus.FINISHED,
                },
            });
            console.log(`✅ Battle ${battle.id} → FINISHED (disparaît du front)`);
        }
    }
}
