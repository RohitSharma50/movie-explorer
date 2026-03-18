# 🎬 Movie Explorer — MERN + Tailwind

A full-stack Movie Explorer app using the OMDb API, built with MongoDB, Express, React, Node.js, and Tailwind CSS.

---

## 📁 Project Structure

```
movie-explorer/
├── backend/               # Express + MongoDB API
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── .env.example
│   └── package.json
└── frontend/              # React + Vite + Tailwind
    ├── src/
    │   ├── components/
    │   ├── context/
    │   ├── hooks/
    │   ├── pages/
    │   ├── utils/
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    ├── .env.example
    └── package.json
```

---

## ⚙️ Environment Variables

### Backend (`backend/.env`)
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key_min_32_chars
OMDB_API_KEY=your_omdb_api_key
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

### Frontend (`frontend/.env`)
```env
# Leave empty in dev (Vite proxy handles it)
# Set to deployed backend URL in production:
VITE_API_URL=https://your-backend.onrender.com
```

> **Get your OMDb API key:** https://www.omdbapi.com/apikey.aspx (free tier available)

---

## 🚀 Local Development

### 1. Clone and install

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 2. Set up environment variables

```bash
# Backend
cp backend/.env.example backend/.env
# Fill in MONGO_URI, JWT_SECRET, OMDB_API_KEY

# Frontend
cp frontend/.env.example frontend/.env
# Leave VITE_API_URL empty for local dev
```

### 3. Run both servers

```bash
# Terminal 1 — Backend (port 5000)
cd backend
npm run dev

# Terminal 2 — Frontend (port 5173)
cd frontend
npm run dev
```

Open http://localhost:5173

---

## 🌐 Deployment

### Backend → Render (free tier)

1. Push code to GitHub
2. Go to https://render.com → New Web Service
3. Connect your repo, set root directory to `backend`
4. Build command: `npm install`
5. Start command: `node server.js`
6. Add environment variables (MONGO_URI, JWT_SECRET, OMDB_API_KEY, NODE_ENV=production, CLIENT_URL=https://your-frontend.vercel.app)
7. Deploy — copy the live URL

### Database → MongoDB Atlas (free tier)

1. https://cloud.mongodb.com → Create free cluster
2. Create a database user
3. Get the connection string → paste as MONGO_URI in Render

### Frontend → Vercel (free tier)

1. Go to https://vercel.com → New Project
2. Import your GitHub repo, set root directory to `frontend`
3. Add environment variable: `VITE_API_URL=https://your-backend.onrender.com`
4. Deploy

---

## 🔌 API Endpoints

### Auth
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | No | Register new user |
| POST | `/api/auth/login` | No | Login, returns JWT |
| GET | `/api/auth/me` | Yes | Get current user |

### Movies (OMDb proxy)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/movies/search?q=batman&page=1&type=movie` | No | Search movies |
| GET | `/api/movies/:imdbId` | No | Get movie details |

### Favorites
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/favorites` | Yes | Get user's favorites |
| POST | `/api/favorites` | Yes | Add a favorite |
| DELETE | `/api/favorites/:imdbId` | Yes | Remove a favorite |
| GET | `/api/favorites/:imdbId/check` | Yes | Check if favorited |

---

## ✅ Features Implemented

- [x] User registration & login with JWT
- [x] Movie search with pagination
- [x] Type filter (movies / series / episodes)
- [x] Movie detail page (poster, title, year, genre, actors, ratings, plot, awards)
- [x] Favorites system (add, remove, persist in MongoDB)
- [x] Protected routes (favorites requires login)
- [x] Loading skeletons
- [x] Toast notifications
- [x] Responsive design (mobile + desktop)
- [x] OMDb API key kept server-side
- [x] Session persistence via localStorage
