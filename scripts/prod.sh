#!/usr/bin/env sh
export GIT_COMMIT=$(git rev-parse --short HEAD)
docker compose -f docker/compose.dev.yaml -f docker/compose.prod.yaml "$1"
