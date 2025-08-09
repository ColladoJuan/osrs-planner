
# OSRS Progression Planner (Starter)

- Frontend: React (Vite) in `/frontend`
- Backend: Node + Express in `/backend`
- Dockerfile builds the frontend and serves it from the backend

## Deploy on Railway
1. Upload this repo to GitHub.
2. On Railway: New Project → Deploy from Repo → select this repo.
3. Railway detects the Dockerfile and builds.
4. Open the Railway service URL (serves API + frontend).

## Local (optional)
- Build & run:
  docker build -t osrs-planner .
  docker run -p 5000:5000 osrs-planner

Then open http://localhost:5000
