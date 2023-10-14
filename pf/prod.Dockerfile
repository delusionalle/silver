# THis should work i hope
FROM node:lts-alpine3.18 AS base

# pnpm installation
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs
USER nodejs

COPY --chown=nodejs:nodejs . /app
WORKDIR /app

FROM base AS deps
RUN pnpm install --frozen-lockfile

FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
RUN pnpm run build

FROM base AS deploy

COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/.next ./.next

RUN pnpm prisma generate
#RUN pnpm run db:push

CMD ["pnpm", "start"]
