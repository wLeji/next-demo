"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runSpinEngine = runSpinEngine;
const prisma_1 = require("../lib/prisma");
async function runSpinEngine() {
    const last = await prisma_1.prisma.rouletteSession.findFirst({
        where: { isComplete: false },
        orderBy: { startTime: 'desc' },
        include: { bets: true },
    });
    const now = new Date();
    // Crée une session si aucune en cours
    if (!last) {
        await prisma_1.prisma.rouletteSession.create({
            data: {
                startTime: now,
                endTime: new Date(now.getTime() + 1000),
            },
        });
        console.log('🆕 Nouvelle session créée');
        return;
    }
    // Si la session n'est pas encore terminée, on attend
    if (last.endTime > now)
        return;
    // 🎯 Tirage du résultat : un nombre entre 0 et 36
    const result = getRandomNumberResult();
    const resultColor = getColorForNumber(result);
    // Trouver les paris gagnants (selon la couleur)
    const winningBets = last.bets.filter(b => b.choice === resultColor);
    const winnerIds = [...new Set(winningBets.map(b => b.userId))];
    // 💰 Appliquer les gains
    await prisma_1.prisma.$transaction([
        ...winnerIds.map(userId => {
            const gain = winningBets
                .filter(b => b.userId === userId)
                .reduce((acc, bet) => {
                const multiplier = resultColor === 'GREEN' ? 14 : 2;
                return acc + bet.amount * multiplier;
            }, 0);
            return prisma_1.prisma.user.update({
                where: { id: userId },
                data: { tokens: { increment: gain } },
            });
        }),
        // ✅ Met à jour la session terminée avec le numéro tiré
        prisma_1.prisma.rouletteSession.update({
            where: { id: last.id },
            data: {
                result, // <--- le nombre (0 à 36)
                isComplete: true,
                winners: { connect: winnerIds.map(id => ({ id })) },
            },
        }),
        // 🔁 Crée une nouvelle session
        prisma_1.prisma.rouletteSession.create({
            data: {
                startTime: now,
                endTime: new Date(now.getTime() + 1000),
            },
        }),
    ]);
    console.log(`🎯 Session ${last.id} → Résultat : ${result} (${resultColor})`);
}
// 🔢 Retourne un nombre aléatoire entre 0 et 36
function getRandomNumberResult() {
    return Math.floor(Math.random() * 37);
}
// 🎨 Détermine la couleur du numéro tiré
function getColorForNumber(num) {
    if (num === 0)
        return 'GREEN';
    const redNumbers = [
        1, 3, 5, 7, 9, 12, 14, 16, 18,
        19, 21, 23, 25, 27, 30, 32, 34, 36,
    ];
    return redNumbers.includes(num) ? 'RED' : 'BLACK';
}
