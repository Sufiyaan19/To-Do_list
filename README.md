# MERN Stack Todo Application

A full-stack todo application built with the MERN stack (MongoDB, Express.js, React, Node.js).

## Features

- User Authentication (JWT)
- Create, Read, Update, Delete Todos
- Mark Todos as Complete/Incomplete
- Search and Filter Todos
- Pagination
- Responsive Design

## Tech Stack

### Backend
- Node.js & Express.js
- MongoDB with Mongoose
- JWT Authentication
- Express Validator
- Helmet for security
- CORS enabled

### Frontend
- React with Vite
- React Router v6
- Axios for API calls
- Modern UI/UX
- Responsive design

## Deployment

### Backend (Render)
1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set environment variables:
   ```
   NODE_ENV=production
   MONGO_URI=your_mongodb_atlas_uri
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```
4. Deploy with following settings:
   - Build Command: `npm install`
   - Start Command: `npm start`

### Frontend (Vercel)
1. Push your code to GitHub
2. Import project in Vercel
3. Set environment variables:
   ```
   VITE_API_BASE_URL=your_render_backend_url
   ```
4. Deploy

### MongoDB Atlas
1. Create cluster
2. Create database user
3. Whitelist IP addresses (0.0.0.0/0 for all)
4. Get connection string
5. Add to backend environment variables

## Local Development

1. Clone repository
2. Install dependencies:
   ```bash
   npm run install-all
   ```
3. Create .env files:
   
   Backend (.env):
   ```
   PORT=5000
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_secret
   NODE_ENV=development
   ```
   
   Frontend (.env):
   ```
   VITE_API_BASE_URL=http://localhost:5000
   ```

4. Start development servers:
   ```bash
   npm run dev
   ```

## API Endpoints

### Auth Routes
- POST /api/auth/register - Register user
- POST /api/auth/login - Login user
- GET /api/auth/me - Get user profile

### Todo Routes
- GET /api/todos - Get all todos
- POST /api/todos - Create todo
- PUT /api/todos/:id - Update todo
- DELETE /api/todos/:id - Delete todo
- PUT /api/todos/:id/complete - Toggle todo completion

## Security Features

- Helmet.js for security headers
- Rate limiting
- JWT authentication
- Input validation
- XSS protection
- CORS configuration
- MongoDB injection protection