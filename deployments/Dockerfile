# Stage 1: Build Next.js application
FROM node:22-alpine AS builder
WORKDIR /app

# Prisma engine requires OpenSSL. Alpine 3.21+ no longer bundles libssl by default.
RUN apk add --no-cache openssl libc6-compat

# Copy dependency manifests first for better cache
COPY package.json package-lock.json* ./

# Install all dependencies (including devDependencies needed for build)
RUN npm ci

# Copy source code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build Next.js
RUN npm run build

# Stage 2: Production runner (Node.js required for server actions / SSR)
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Prisma client also needs openssl at runtime
RUN apk add --no-cache openssl libc6-compat

# Copy built application
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000

COPY start.sh ./start.sh
RUN chmod +x start.sh

CMD ["./start.sh"]
