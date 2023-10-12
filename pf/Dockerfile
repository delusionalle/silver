# THis should work i hope
FROM node:lts-alpine3.18 AS base

# pnpm installation
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

COPY . /app
WORKDIR /app

FROM base AS deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm prisma generate
RUN pnpm run build

FROM base AS deploy
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/.next ./next

EXPOSE 3000
ENV PORT 3000
CMD ["pnpm", "start"]
