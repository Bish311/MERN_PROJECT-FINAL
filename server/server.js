const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL 
    : 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Test route (for debugging)
app.get('/test', (req, res) => {
  res.send('✅ API is working!');
});

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'ReelVault API is running',
    endpoints: {
      auth: '/api/auth (register, login, verify)',
      movies: '/api/movies (search, popular, trending, details, credits)',
      watchlist: '/api/watchlist (get, add, update, remove)',
      ratings: '/api/ratings (get, add/update, delete)',
      reviews: '/api/reviews (get all, create, update, delete)',
      test: '/test'
    }
  });
});

// Start server ONLY after DB connects
const startServer = async () => {
  try {
    await connectDB(); // This will log success or exit on failure

    // NOW mount routes after DB is connected
    console.log('📂 Loading auth routes...');
    const authRoutes = require('./routes/authRoutes');
    console.log('✅ Auth routes required successfully:', typeof authRoutes);
    app.use('/api/auth', authRoutes);
    console.log('🔗 Auth routes mounted at /api/auth');

    // Load movie routes
    console.log('📂 Loading movie routes...');
    const movieRoutes = require('./routes/movieRoutes');
    console.log('✅ Movie routes required successfully:', typeof movieRoutes);
    app.use('/api/movies', movieRoutes);
    console.log('🔗 Movie routes mounted at /api/movies');

    // Load watchlist routes
    console.log('📂 Loading watchlist routes...');
    const watchlistRoutes = require('./routes/watchlistRoutes');
    console.log('✅ Watchlist routes required successfully:', typeof watchlistRoutes);
    app.use('/api/watchlist', watchlistRoutes);
    console.log('🔗 Watchlist routes mounted at /api/watchlist');

    // Load rating routes
    console.log('📂 Loading rating routes...');
    const ratingRoutes = require('./routes/ratingRoutes');
    console.log('✅ Rating routes required successfully:', typeof ratingRoutes);
    app.use('/api/ratings', ratingRoutes);
    console.log('🔗 Rating routes mounted at /api/ratings');

    // Load review routes
    console.log('📂 Loading review routes...');
    const reviewRoutes = require('./routes/reviewRoutes');
    console.log('✅ Review routes required successfully:', typeof reviewRoutes);
    app.use('/api/reviews', reviewRoutes);
    console.log('🔗 Review routes mounted at /api/reviews');

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`\n✅ Server running on http://127.0.0.1:${PORT}`);
      console.log(`🌐 Test endpoint: http://127.0.0.1:${PORT}/test`);
      console.log(`🔐 Auth endpoint: http://127.0.0.1:${PORT}/api/auth`);
      console.log(`🎬 Movies endpoint: http://127.0.0.1:${PORT}/api/movies`);
      console.log(`📝 Watchlist endpoint: http://127.0.0.1:${PORT}/api/watchlist`);
      console.log(`⭐ Ratings endpoint: http://127.0.0.1:${PORT}/api/ratings`);
      console.log(`📑 Reviews endpoint: http://127.0.0.1:${PORT}/api/reviews`);
      console.log(`\n� Key Endpoints:`);
      console.log(`📝 Register: POST http://127.0.0.1:${PORT}/api/auth/register`);
      console.log(`� Login: POST http://127.0.0.1:${PORT}/api/auth/login`);
      console.log(`🔎 Search: GET http://127.0.0.1:${PORT}/api/movies/search?query=batman`);
      console.log(`🔥 Popular: GET http://127.0.0.1:${PORT}/api/movies/popular`);
      console.log(`� Add to Watchlist: POST http://127.0.0.1:${PORT}/api/watchlist`);
      console.log(`⭐ Rate Movie: POST http://127.0.0.1:${PORT}/api/ratings`);
      console.log(`📝 Write Review: POST http://127.0.0.1:${PORT}/api/reviews\n`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();
