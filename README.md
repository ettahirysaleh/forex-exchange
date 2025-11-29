# Crypto Exchange - Full Project

This is a ready-to-run template (Frontend + Backend + Postgres) created for the user.

## Quick start with Docker
1. Install Docker & Docker Compose
2. From the project root run:
   ```bash
   docker-compose up --build
   ```
3. Frontend: http://localhost:5173
   Backend: http://localhost:4000

## Backend notes
- After starting the DB, run (if not using Docker):
  ```
  cd backend
  npm install
  npx prisma generate
  npx prisma migrate dev --name init
  npm run dev
  ```

## Frontend notes
- In frontend folder:
  ```
  npm install
  npm run dev
  ```

## Important
Change JWT_SECRET before production.
