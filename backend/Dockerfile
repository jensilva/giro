# Stage 1 - Build
FROM node:20 AS builder

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .

# Gera Prisma client + build TS -> JS
RUN npx prisma generate
RUN yarn build

# Stage 2 - Runtime
FROM node:20-slim

WORKDIR /app

RUN apt-get update -y && apt-get install -y openssl

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD sh -c "npx prisma migrate deploy && node dist/server.js"
