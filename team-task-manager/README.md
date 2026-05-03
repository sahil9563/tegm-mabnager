# Team Task Manager

Full-stack web app for team task management with role-based access.

## Local Setup
**Note: Run `npm install` manually in VSCode terminal for backend/frontend due to shell issues.**

1. `cd team-task-manager`
2. Backend: `cd backend`, `npm install`, copy `.env.example` to `.env` (get MONGO_URI from MongoDB Atlas, set JWT_SECRET), `npm run dev` (port 5000)
3. Frontend: New terminal, `cd frontend`, `npm install`, `npm start` (port 3000, proxy to backend)


## Deployment
- Push to GitHub
- Connect to Railway.app
- Add MongoDB Atlas service/vars

## Features
- Auth (Admin/Member)
- Projects & Tasks CRUD
- Dashboard & Overdue tracking

