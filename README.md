# ReelVault - Movie Watchlist Manager

A MERN stack Letterboxd clone with a vintage cinema aesthetic.

## Project Status

**✅ Step 1 Complete** - Vite + MERN stack ready for development

## Tech Stack

- MongoDB with Mongoose
- Express.js
- **React.js with Vite** ⚡ (Fast HMR)
- Node.js
- TMDB API v3
- JWT Authentication
- Vanilla CSS

## 🔑 Keys Required

Before proceeding, get these API keys:

1. **MongoDB URI** - Sign up at https://www.mongodb.com/cloud/atlas
2. **TMDB API Key** - Get from https://www.themoviedb.org/settings/api
3. **JWT Secret** - Generate with: `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`

Update them in `.env` file!

## 🚀 Quick Start

```bash
# Install dependencies (already done)
npm install
cd client && npm install

# Run development servers (both at once)
npm run dev

# Or run separately:
npm run server  # Backend on http://localhost:5000
npm run client  # Frontend on http://localhost:3000
```

## 📁 Structure

```
MERN_PROJECT-FINAL/
├── client/              # Vite React frontend
│   ├── src/
│   │   ├── components/  # Auth, Movies, Watchlist, Reviews, Common
│   │   ├── pages/
│   │   ├── context/
│   │   ├── utils/
│   │   └── styles/
│   ├── vite.config.js   # Vite config with proxy
│   └── package.json
├── server/              # Express backend
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── config/
│   └── utils/
├── .env                 # Environment variables
├── .gitignore
└── package.json
```

## ⚡ Vite Benefits

- Lightning fast hot module replacement (HMR)
- Instant server start
- Optimized builds
- Better developer experience

## 📋 Next Steps

Follow Step 2 in `masterplan.md` to set up Database and Models!
