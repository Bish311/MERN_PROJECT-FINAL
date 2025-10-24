# 🎬 ReelVault - Movie Watchlist Manager

A full-stack **MERN** application that serves as a modern Letterboxd clone, featuring a vintage cinema aesthetic. ReelVault allows users to discover movies, create watchlists, write reviews, and rate films in an elegant, responsive interface.

## 🌟 Project Overview

ReelVault is a comprehensive movie management platform built with the complete MERN stack, integrating external APIs for movie data and providing a seamless user experience across all devices. The application demonstrates modern web development practices with real-world deployment on cloud platforms.

### 🎯 Key Features

- **🔐 User Authentication**: Complete JWT-based auth system with registration, login, and protected routes
- **🎭 Movie Discovery**: Browse trending, popular movies with detailed information via TMDB API
- **📝 Personal Watchlists**: Create, manage, and organize movie watchlists
- **⭐ Rating System**: Rate movies with star-based system and view personal ratings
- **✍️ Review System**: Write, edit, and delete detailed movie reviews
- **🔍 Advanced Search**: Search movies with intelligent suggestions and filtering
- **📱 Responsive Design**: Mobile-first design with vintage cinema aesthetics
- **🌙 Theme Support**: Built-in theme system for customizable user experience

## 🏗️ MERN Stack Implementation

### **M**ongoDB - Database Layer
- **MongoDB Atlas**: Cloud-hosted NoSQL database
- **Models**: User, Watchlist, Review, Rating schemas with Mongoose ODM
- **Relationships**: Referenced relationships between users, movies, and user-generated content
- **Indexing**: Optimized queries for performance

### **E**xpress.js - Backend Server
- **RESTful API**: Complete CRUD operations for all entities
- **Middleware**: Authentication, CORS, error handling, request validation
- **Controllers**: Organized business logic for auth, movies, watchlists, reviews, ratings
- **Routes**: Modular routing structure with protected endpoints
- **External API Integration**: TMDB API service layer for movie data

### **R**eact.js - Frontend Framework
- **Vite Build Tool**: Lightning-fast development with HMR
- **Component Architecture**: Reusable components for Auth, Movies, Reviews, Watchlists
- **Context API**: Global state management for authentication and themes
- **React Router**: Client-side routing with protected routes
- **Hooks**: Modern React patterns with useState, useEffect, useContext
- **Responsive UI**: Mobile-first design with CSS Grid and Flexbox

### **N**ode.js - Runtime Environment
- **Server Runtime**: Express.js server with middleware stack
- **Package Management**: NPM with development and production dependencies
- **Environment Configuration**: Environment-based configuration for development/production
- **Async Operations**: Promise-based operations for database and API calls

## 🚀 Live Deployment

### **Frontend**: [Netlify](https://reelvault-main.netlify.app)
- Vite production build with optimized assets
- Environment-based API URL configuration
- Continuous deployment from GitHub

### **Backend**: [Render](https://reelvault-back.onrender.com)
- Node.js server with Express.js
- CORS configured for cross-origin requests
- MongoDB Atlas connection
- Environment variables for production

### **Database**: MongoDB Atlas Cloud
- Hosted MongoDB cluster with global distribution
- Automated backups and scaling
- Connection pooling and optimization

## � API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/verify` - Token verification

### Movies (TMDB Integration)
- `GET /api/movies/popular` - Popular movies
- `GET /api/movies/trending` - Trending movies
- `GET /api/movies/search?query=` - Search movies
- `GET /api/movies/:id` - Movie details
- `GET /api/movies/:id/credits` - Movie cast/crew

### Watchlists
- `GET /api/watchlist` - Get user watchlist
- `POST /api/watchlist` - Add movie to watchlist
- `PUT /api/watchlist/:id` - Update watchlist item
- `DELETE /api/watchlist/:id` - Remove from watchlist

### Reviews
- `GET /api/reviews` - Get all reviews
- `POST /api/reviews` - Create review
- `PUT /api/reviews/:id` - Update review
- `DELETE /api/reviews/:id` - Delete review

### Ratings
- `GET /api/ratings/:movieId` - Get movie rating
- `POST /api/ratings` - Add/update rating
- `DELETE /api/ratings/:id` - Delete rating

## 🛠️ Technology Stack

### Frontend
- **React 18** - Component-based UI library
- **Vite** - Build tool with fast HMR
- **React Router v6** - Client-side routing
- **Axios** - HTTP client for API requests
- **CSS3** - Custom styling with CSS Grid/Flexbox
- **Responsive Design** - Mobile-first approach

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment configuration

### External Services
- **TMDB API** - Movie database and information
- **MongoDB Atlas** - Cloud database hosting
- **Netlify** - Frontend hosting and deployment
- **Render** - Backend hosting and deployment

## 📁 Project Structure

```
MERN_PROJECT-FINAL/
├── client/                     # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth/          # Login, Register components
│   │   │   ├── Movies/        # Movie display, search components
│   │   │   ├── Reviews/       # Review management components
│   │   │   ├── Watchlist/     # Watchlist components
│   │   │   └── Common/        # Shared UI components
│   │   ├── pages/             # Page components
│   │   ├── context/           # React Context providers
│   │   ├── utils/             # API client and utilities
│   │   └── styles/            # CSS stylesheets
│   ├── vite.config.js         # Vite configuration
│   └── package.json           # Frontend dependencies
├── server/                     # Express backend
│   ├── models/                # Mongoose schemas
│   ├── routes/                # API route definitions
│   ├── controllers/           # Business logic
│   ├── middleware/            # Auth and validation middleware
│   ├── config/                # Database configuration
│   └── utils/                 # External API services
├── tests/                      # API testing scripts
├── .env                        # Environment variables
└── package.json               # Root dependencies
```

## 🔧 Local Development Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account
- TMDB API key

### Environment Variables
Create a `.env` file with:
```env
MONGODB_URI=your_mongodb_connection_string
TMDB_API_KEY=your_tmdb_api_key
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

### Installation & Running
```bash
# Clone the repository
git clone https://github.com/Bish311/MERN_PROJECT-FINAL.git
cd MERN_PROJECT-FINAL

# Install backend dependencies
npm install

# Install frontend dependencies
cd client && npm install

# Run development servers (from root)
npm run dev           # Runs both frontend and backend
# OR run separately:
npm run server        # Backend on http://localhost:5000
npm run client        # Frontend on http://localhost:3000
```

## 🎯 Project Completion Status

**✅ COMPLETE** - All 7 core features implemented and deployed:

1. **✅ Project Setup** - MERN stack with Vite configuration
2. **✅ Database & Models** - MongoDB schemas for all entities
3. **✅ Authentication System** - JWT-based auth with protected routes
4. **✅ Movie Integration** - TMDB API integration with search and discovery
5. **✅ Watchlist Feature** - Complete CRUD operations for user watchlists
6. **✅ Review System** - User reviews with full management capabilities
7. **✅ Production Deployment** - Live deployment on Netlify + Render

## 🚀 Future Enhancements

While the core application is complete and fully functional, potential future features could include:

- **Social Features**: Follow users, public reviews, activity feeds
- **Advanced Filtering**: Genre filters, year ranges, rating filters
- **Movie Lists**: Custom themed lists beyond personal watchlists
- **Recommendations**: AI-powered movie recommendations
- **Statistics**: Personal viewing statistics and analytics
- **Offline Support**: PWA capabilities for offline access
- **Real-time Features**: Live chat, real-time notifications
- **Advanced Search**: Filters by director, cast, genre combinations

## � Project Highlights

- **Full-Stack MERN Implementation**: Complete utilization of MongoDB, Express.js, React.js, and Node.js
- **Modern Development Practices**: ES6+, async/await, modular architecture
- **Production-Ready Deployment**: Cloud hosting with environment-based configuration
- **Responsive Design**: Mobile-first approach with elegant UI/UX
- **Secure Authentication**: JWT tokens with protected routes and data validation
- **External API Integration**: Seamless integration with third-party movie database
- **Scalable Architecture**: Modular codebase ready for future enhancements

---

**ReelVault** - Where every movie finds its place in your personal cinema collection! 🎬✨
