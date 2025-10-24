# ReelVault - Render Backend Deployment Guide

## 🚀 Deploy Backend to Render

### Step 1: Prepare Your Repository
1. Push all your code to GitHub
2. Make sure the `server/` directory contains all backend files

### Step 2: Create MongoDB Database
1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Create a new cluster (free tier is fine)
3. Get your connection string (starts with `mongodb+srv://`)
4. Replace `<password>` with your database password
5. Add `reelvault` as the database name

### Step 3: Deploy on Render
1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: `reelvault-backend`
   - **Environment**: `Node`
   - **Build Command**: `cd server && npm install`
   - **Start Command**: `cd server && npm start`
   - **Root Directory**: Leave empty (use root)

### Step 4: Set Environment Variables
Add these in Render dashboard → Environment tab:

```
NODE_ENV=production
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=generate_a_long_random_string_here
TMDB_API_KEY=your_tmdb_api_key
FRONTEND_URL=https://your-netlify-app.netlify.app
```

### Step 5: Get Your Backend URL
After deployment, your backend will be available at:
```
https://reelvault-backend.onrender.com
```

## 🔧 Important Notes

1. **Free Tier Limitation**: Render free tier sleeps after 15 minutes of inactivity
2. **CORS**: Backend is configured to accept requests from your frontend URL
3. **Environment Variables**: Never commit `.env` file to GitHub
4. **MongoDB**: Use MongoDB Atlas for production database

## 🧪 Test Your Deployment

Once deployed, test these endpoints:
- Health check: `https://your-app.onrender.com/test`
- API health: `https://your-app.onrender.com/api/movies/popular`

## Next Steps
After backend is deployed:
1. Note your backend URL
2. Deploy frontend to Netlify
3. Update frontend API configuration with your backend URL