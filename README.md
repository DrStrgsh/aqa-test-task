# Test Task

## Docker Requirements

- Docker
- Docker Compose
- Access to `.env` variables:
  - `BASE_UI_URL`
  - `BASE_API_URL`
  - `UI_TEST_USER_EMAIL`
  - `UI_TEST_USER_PASSWORD`

## Docker Run

- Build container:
  - `docker compose build`
- Run UI tests (all projects: browsers + 2 mobile):
  - `docker compose run --rm tests npm run test:ui`
- Run API tests:
  - `docker compose run --rm tests npm run test:api`

## Auth note
- For UI tests `.auth/user.json` is required. If missing, generate it via the setup project locally or via CI step, so that auth state is saved in `.auth/user.json`.

## Project commands

### Local (no Docker)

- Install dependencies: `npm ci`
- Run setup flow only: `npm run test:setup`
- Run UI tests: `npm run test:ui`
- Run API tests: `npm run test:api`

### Docker

- Build image:
  - `npm run docker:build`
  - or `docker compose build`
- Run setup flow:
  - `npm run docker:setup`
  - or `docker compose run --rm tests npm run test:setup`
- Run UI tests:
  - `npm run docker:ui`
  - or `docker compose run --rm tests npm run test:ui`
- Run API tests:
  - `npm run docker:api`
  - or `docker compose run --rm tests npm run test:api`

### CI workflows

- Docker CI: `.github/workflows/ci-docker.yml` (workflow_dispatch input `suite: setup | ui | api | all`)
- Local CI: `.github/workflows/ci-local.yml` (workflow_dispatch input `suite: setup | ui | api | all`)
- Both workflows publish HTML reports to GitHub Pages.
