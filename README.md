# StudyBuddy AI

An AI‑powered study companion with chat, study sessions, and user accounts.

## 🚀 **Live Deployment**

**AWS App Runner**: [https://your-app-url.ap-south-1.elasticbeanstalk.com](https://your-app-url.ap-south-1.elasticbeanstalk.com)

## 🛠️ **Tech Stack**

- **Frontend**: React 18 + Vite
- **Backend**: Node.js + Express
- **Database**: MongoDB (via Mongoose)
- **Auth**: JWT (JSON Web Tokens)
- **AI**: Google Gemini API (via @google/generative-ai)
- **Other**: Firebase (optional, for client-side features)
- **Deployment**: AWS App Runner

## 📦 **Deployment**

This application is deployed on AWS App Runner using the following configuration:

- **Runtime**: Node.js 18
- **Build Process**: 
  - Client: `npm install && npm run build`
  - Server: `npm install`
- **Start Command**: `cd server && npm start`
- **Environment**: Production with security headers and rate limiting

### **Automatic Deployment**
- **Source**: GitHub Repository
- **Trigger**: Push to main branch
- **Build**: Automatic build and deployment
- **Health Checks**: `/health` endpoint

### Tech Stack

- **Frontend**: React 18 + Vite
- **Backend**: Node.js + Express
- **Database**: MongoDB (via Mongoose)
- **Auth**: JWT (JSON Web Tokens)
- **AI**: Google Gemini API (via @google/generative-ai)
- **Other**: Firebase (optional, for client-side features)

### Project Structure

```text
StudyBuddy-AI/
├── client/                     # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/         # Reusable UI (e.g. Chat)
│   │   ├── pages/              # Route-level pages (Home, Auth, etc.)
│   │   ├── routes/             # React Router configuration
│   │   ├── hooks/              # Custom React hooks
│   │   ├── services/           # API clients (REST, Firebase)
│   │   ├── context/            # React context providers
│   │   └── utils/              # Helper & formatting utilities
│   ├── index.html
│   └── vite.config.js
│
├── server/                     # Express backend
│   ├── .env.example            # Server environment template
│   └── src/
│       ├── config/             # DB, Firebase, and other config
│       │   ├── db.js           # MongoDB connection
│       │   └── firebase.js
│       ├── controllers/        # Route handlers (AI, auth, etc.)
│       │   ├── ai.controller.js
│       │   └── auth.controller.js
│       ├── middleware/         # Express middleware (auth, errors, etc.)
│       │   ├── auth.js
│       │   └── error.js
│       ├── models/             # Mongoose models
│       │   ├── User.js
│       │   └── ChatHistory.js
│       ├── routes/             # API route definitions
│       │   ├── index.js
│       │   ├── ai.routes.js
│       │   └── auth.routes.js
│       ├── services/           # Gemini and other service integrations
│       │   └── gemini.service.js
│       └── index.js            # Express app bootstrap
│
└── README.md
```

---

## Environment Variables

All sensitive configuration is handled via `.env` files (never commit real secrets).

### Server (`server/.env`)

Create `server/.env` from `server/.env.example`:

```bash
cp server/.env.example server/.env
```

Then fill in:

- **PORT** – API port (default: `3000`)
- **GEMINI_API_KEY** – Google Gemini API key
- **GEMINI_MODEL** – (optional) Gemini model name, e.g. `gemini-1.5-flash`
- **FIREBASE_SERVICE_ACCOUNT** – (optional) Firebase Admin JSON or path
- **MONGODB_URI** – MongoDB connection string  
  e.g. `mongodb://localhost:27017/studybuddy-ai`
- **MONGODB_DB** – MongoDB database name (optional, overrides dbName)
- **JWT_SECRET** – Strong secret used to sign JWT access tokens

### Client (`client/.env`)

Create `client/.env` from `client/.env.example`:

```bash
cp client/.env.example client/.env
```

Then fill in your Firebase client keys (if you use Firebase in the UI).

> Note: The Vite dev server proxies `/api` to the Express backend, so you usually don’t need to set a separate API base URL in development.

---

## Getting Started (Development)

1. **Install dependencies**

   ```bash
   cd server && npm install
   cd ../client && npm install
   ```

2. **Configure environment**

   - `cp server/.env.example server/.env` and set the values
   - `cp client/.env.example client/.env` and set the values (optional if not using Firebase yet)

3. **Run the backend**

   ```bash
   cd server
   npm run dev
   # Server: http://localhost:3000
   ```

4. **Run the frontend**

   ```bash
   cd client
   npm run dev
   # Frontend: http://localhost:5173
   ```

---

## Core API Endpoints

Base URL: `/api`

- **AI & Study**
  - `POST /api/chat` – Chat with the AI assistant
  - `POST /api/ai/chat` – Same chat handler, namespaced under `/ai`
  - `POST /api/ai/study` – Create a study session (quiz, flashcards, etc.)

- **Auth**
  - `POST /api/auth/signup` – Create a new user account (email + password)
  - `POST /api/auth/login` – Log in and receive a JWT

- **Chat History**
  - `GET /api/chat/history` – Authenticated endpoint; returns the latest saved chat history for the current user

- **Health**
  - `GET /health` – Basic health check

All error responses are JSON with a consistent shape:

```json
{ "error": "Human‑readable message" }
```

---

## Error Handling & Production Readiness

- **Backend**
  - Centralized **error middleware** (`middleware/error.js`) handles uncaught errors and returns safe JSON responses.
  - Validation in controllers (e.g. `ai.controller.js`, `auth.controller.js`) ensures required fields are present and well‑formed.
  - Unknown routes return a structured 404 via the `notFound` middleware.
  - MongoDB connection is established at startup (`config/db.js`); the server exits if the connection fails.

- **Frontend**
  - The shared `apiRequest` helper in `client/src/services/api.js` unwraps server error responses and throws `Error` objects with user‑friendly messages.
  - The chat UI shows a clear loading state while waiting for the AI and displays any error message inline.
  - Layout is mobile‑responsive: the chat component adapts to small screens and uses viewport height effectively.

- **Security**
  - Passwords are hashed with **bcrypt** before storage.
  - Auth uses **JWT** with an expiration; protected routes verify the bearer token.
- Secrets (Gemini API key, JWT secret, Mongo URI, Firebase credentials) are expected **only** in `.env` files, never in source control.

---

## Production Notes

- **Build frontend**

  ```bash
  cd client
  npm run build
  ```

  Serve the static `dist/` folder behind a CDN or via your node server / reverse proxy.

- **Run backend in production**

  ```bash
  cd server
  npm run start
  ```

  Use a process manager like PM2 or a container orchestration platform, set all required environment variables, and place the app behind HTTPS (e.g. Nginx, cloud load balancer).

- **Logging & Monitoring**
  - For a real deployment, plug the error middleware into a logging/monitoring solution (Datadog, Sentry, etc.).
  - Enable MongoDB and HTTP request metrics in your observability stack.
