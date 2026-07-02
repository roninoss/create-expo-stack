FROM node:22-slim

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY src ./src

# Warm the npx cache so the first request doesn't pay the download cost.
# CES_VERSION=latest still re-resolves on each request, so this stays fresh.
RUN npx --yes create-expo-stack@latest --version || true

ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000

CMD ["node", "src/server.js"]
