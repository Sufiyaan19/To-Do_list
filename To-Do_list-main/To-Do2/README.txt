
TY23 Todo Fullstack (Frontend + Backend)
---------------------------------------
Backend: /backend (Express + Mongoose)
Frontend: /frontend (Vite + React)

To run locally:
  - Start MongoDB (local or Atlas)
  - Backend: cd backend && npm install && npm run dev
  - Frontend: cd frontend && npm install && npm run dev

For deployment:
  - Deploy frontend to Vercel; set VITE_API_BASE env var to backend URL
  - Deploy backend to Render/Heroku/Cloud Run. Set MONGO_URI and JWT_SECRET in production env.
