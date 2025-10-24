const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
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

    app.listen(PORT, '127.0.0.1', () => {
      console.log(`\n✅ Server running on http://127.0.0.1:${PORT}`);
      console.log(`🌐 Test endpoint: http://127.0.0.1:${PORT}/test`);
      console.log(`🔐 Auth endpoint: http://127.0.0.1:${PORT}/api/auth`);
      console.log(`📝 Register: POST http://127.0.0.1:${PORT}/api/auth/register`);
      console.log(`🔑 Login: POST http://127.0.0.1:${PORT}/api/auth/login`);
      console.log(`🔍 Verify: GET http://127.0.0.1:${PORT}/api/auth/verify\n`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();
