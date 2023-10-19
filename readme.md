# silver - an aiijc final stage solution

(производство challenge)

## DEPLOYMENT INFO

### 1. `scripts/prod.sh build` builds the containers

### 2. `scripts/prod.sh up` launches the project in production mode

### you need docker compose.
you probably want to use WSL cause Windows support is untested.

do these in this order

dont touch the environment variables

dont run the dev mode

if you dont have bash replace the script with `docker compose -f docker/compose.yaml -f docker/compose.prod.yaml`

If you launch the project in one environment and want to run it in another, rebuild the containers before doing so

## docs

### basic usage

- `> scripts/dev.sh up` - starts compose in dev mode
- `> scripts/prod.sh up` - starts compose in prod mode

### dx scripts

`dev.sh` and `prod.sh` are shorthand for `docker compose -f docker/compose.(env).yaml`
use them by appending docker compose commands after calling the script

### orchestration

project is managed at the highest level using docker compose

config files for compose can be found in the `/docker/` directory

each file corresponds to the environment its launched in

the production config builds upon and depends on the development config

services:

- `api` - python fastapi linking to model
- `pf` - next.js project. has 2 dockerfiles in the `/pf/` directory
- `db` - postgresql database. there are 2 databases stored on the same volume for dev and prod env
- `proxy` - nginx proxying next.js, configurable at `proxy/nginx.conf`

### file structure

dx/build files:
- `/docker/` - docker compose files for dev and prod builds
- `/scripts/` - useful scripts for dx

project files:
- `/model/` - jupyter notebook files for model
- `/api/` - python api wrapping model
- `/pf/` - analytics platform/dashboard
- `/proxy/` - nginx proxy configuration

### environment variables

environment variables are set using docker compose linking to pf/.env.(development | production)

an example (empty) .env file can be found at pf/.env.example

## impl

### api

web part
- python
- fastapi

algo part
- xgboost classifier (scikit wrapper)
- params found with hyperopt

### platform

web-based analysis platform for the ml solution

frontend:
- next.js
- tailwind
- next-auth

linking:
- some sort of api for middlemanning model and frontend
- todo: detail

