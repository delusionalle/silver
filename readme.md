# silver - an aiijc final stage solution

(производство challenge)

## workflow

- start development docker compose file with scripts/dev.sh
- start production with scripts/prod.sh

## structure

dx/build files:
- `/docker/` - docker compose files for dev and prod builds
- `/scripts/` - useful scripts for dx

project files:
- `/model/` - jupyter notebook files for model
- `/api/` - python api wrapping model
- `/pf/` - analytics platform/dashboard
- `/proxy/` - nginx proxy configuration

## impl

### ml

- todo: detail

### platform

web-based analysis platform for the ml solution

frontend:
- next.js
- tailwind
- next-auth

linking:
- some sort of api for middlemanning model and frontend
- todo: detail

## notes

- should improve and clean ml solution

12 oct progress check:
- FIX DOCKER
- make API for model (flask or django I DONT CARE JUST MAKE IT)
- implement nginx proxy (should be easy)
- ACTUALLY MAKE DASHBOARD | BASIC LAYOUT
- WTF KIND OF ANALYTICS DO WE NEED?
- ACTUALLY MAKE DASHBOARD | ANALYTICS

## .2023
