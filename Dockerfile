# Étape 1 : Build
FROM node:20-slim AS builder

WORKDIR /app
RUN apt-get update && apt-get install -y openssl

COPY package.json package-lock.json* ./
RUN corepack enable && npm install

COPY . .

RUN npx prisma generate
RUN npm run build

# Étape 2 : Runner
FROM node:20-slim AS runner

WORKDIR /app
RUN corepack enable

ENV NODE_ENV=production

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/.env ./.env

# Expose le port Next.js
EXPOSE 3000

CMD ["npm", "start"]
