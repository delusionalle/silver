#!/usr/bin/env sh
docker compose -f docker/compose.dev.yaml -f docker/compose.prod.yaml "$1"
