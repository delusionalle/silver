#!/bin/sh

pnpm prisma generate
pnpm prisma db push
