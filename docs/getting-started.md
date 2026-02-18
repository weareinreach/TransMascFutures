# Getting Started with TransMascFutures

## Summary

TransMascFutures is a trans-led digital campaign organized by [InReach](https://www.inreach.org) and [GLAAD](https://www.glaad.org). It aims to showcase positive stories from the diverse trans masculine community and increase access to safe, verified resources through the free InReach App.

## Branching Strategy

There are several branches in GitHub, but the ones of most concern are:

- **`dev`**: Base local development off this branch. Always create new feature branches from `dev`.
- **`main`**: Used in production. **Do not merge directly** without first branching from and merging into `dev`.

### Basic Workflow

1.  Checkout the development branch:
    ```bash
    git checkout dev
    git pull
    ```
2.  Create a new feature branch:
    ```bash
    git checkout -b <new-branch-name>
    ```
3.  Make changes, commit, and push:
    ```bash
    git commit -m "Your message"
    git push origin <new-branch-name>
    ```
4.  **On GitHub**:
    - Create a Pull Request (PR).
    - Merge into `dev`.
5.  **Deployment**:
    - After review and on the release schedule, `dev` is merged into `main`.
    - Deployment scripts run automatically (including DB schema or data migrations).
    - New code is pushed to production.

## Local Installation

**Important:** TransMascFutures and InReach use the same port numbers when running locally. To reduce confusion, it is suggested to run only one project at a time.

### 1. Setup Project

1.  Create a project directory.
2.  Clone the repository:
    ```bash
    git clone https://github.com/weareinreach/TransMascFutures.git
    ```
3.  Ensure `pnpm` is installed.
4.  Install dependencies:
    ```bash
    pnpm install
    ```

### 2. Environment Configuration

Ensure Docker is installed (used for the database).

Create a `.env` file in the root directory (you can copy `.env.example`) and populate it with the following. Update the `NEXTAUTH_SECRET` value.

```ini
# Environment
NODE_ENV=development

# Prisma
# Database connection URL for Prisma
POSTGRES_PRISMA_URL=postgres://user:password@localhost:5432/postgres

# Database connection URL without connection pooling
POSTGRES_URL_NON_POOLING=postgres://user:password@localhost:5432/postgres

# Next Auth
NEXTAUTH_URL=http://localhost:3000
# Generate with `openssl rand -base64 32`
# This can also be the same secret that’s been set for the InReach project
NEXTAUTH_SECRET=your_generated_secret_here

# Admin Portal
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=secure_password

# Crowdin API
CROWDIN_API=your_personal_access_token
```

### 3. Setup the Database

On local, you will be using the Docker container, specifically the `postgres` db.

1.  Start the Docker containers:
    ```bash
    pnpm db:up
    ```
2.  Create tables and seed the DB:
    ```bash
    pnpm db:migrate:apply
    ```

### 4. Verify DB Configuration

From the Docker UI, under the `docker` container, there should be 2 database views: `adminer-1` and `db-1`.

To use **Adminer** (web-based DB management):

1.  Go to http://localhost:8080.
2.  Enter the details:
    - **System:** PostgreSQL
    - **Server:** `db` (if inside Docker network) or `localhost` (from host)
    - **Username:** `user`
    - **Password:** `password`
    - **Database:** Leave blank (lists all) or use `postgres`.

## Running the Application

- **Start the App**:
  ```bash
  pnpm dev
  ```
- **Start Storybook** (for component development):
  ```bash
  pnpm dev:ui
  ```

## Database Connection Details

### Local DB (Docker)

- **User:** `user`
- **Password:** `password`
- **DB:** `db` (postgres)
- **URL:** `postgres://user:password@localhost:5432/postgres`

### Production DB

- **User:** `default`
- **Password:** `[REDACTED]`
- **DB:** `verceldb`
- **URL:** `ep-dry-resonance-088928-pooler.us-east-1.postgres.vercel-storage.com`
