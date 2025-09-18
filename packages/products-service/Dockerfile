FROM node:18-alpine AS deps
WORKDIR /app
COPY ../../package.json ../../yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:18-alpine AS builder
WORKDIR /app
COPY . ./packages/products-service
COPY --from=deps /app/node_modules ./node_modules
RUN yarn workspace products-service build

FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=builder /app/packages/products-service/dist ./dist
COPY ./package.json ./
ENV NODE_ENV=production
CMD ["node", "dist/main.js"]
