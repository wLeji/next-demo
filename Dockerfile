# Étape 1 : Build
FROM node:20-slim AS builder

WORKDIR /app

# Ajout d'OpenSSL pour Prisma
RUN apt-get update && apt-get install -y openssl

# Copie package et install
COPY package.json package-lock.json* ./
RUN corepack enable && npm install

# Copie de tous les fichiers de build
COPY . .

# Prisma + Compilation
RUN npx prisma generate --schema=./prisma/schema.prisma
RUN npx prisma migrate deploy
RUN npm run build

# Étape 2 : Runner
FROM node:20-slim AS runner

WORKDIR /app
RUN corepack enable

ENV NODE_ENV=production

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.ts ./next.config.ts
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/scripts ./scripts

# Port Next.js
EXPOSE 3000

CMD ["npm", "start"]
