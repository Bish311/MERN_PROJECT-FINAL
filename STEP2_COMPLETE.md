# Step 2 Complete - Database Setup Instructions

## ✅ What's Been Created:

### Database Configuration
- ✅ `server/config/db.js` - MongoDB connection logic

### Models Created
- ✅ `server/models/User.js` - User schema with validation
- ✅ `server/models/Watchlist.js` - Watchlist with status tracking
- ✅ `server/models/Rating.js` - Movie ratings (1-5 stars)
- ✅ `server/models/Review.js` - User reviews with ratings

### Features Added
- Unique indexes on username and email
- Password validation (min 6 characters)
- Rating validation (1-5)
- Review length validation (10-2000 chars)
- Compound indexes to prevent duplicates
- Timestamps on User and Review models

## 🔧 NEXT STEP - MongoDB Atlas Setup:

### 1. Create MongoDB Atlas Account
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for free tier
3. Create a new cluster (name it `reelvault-cluster`)

### 2. Configure Database Access
1. Database Access → Add New Database User
2. Choose username and password
3. Set privileges to "Read and write to any database"

### 3. Configure Network Access
1. Network Access → Add IP Address
2. Click "Allow Access from Anywhere" (0.0.0.0/0) for development
3. Or add your current IP address

### 4. Get Connection String
1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy the connection string (looks like):
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

### 5. Update .env File
Replace the MONGODB_URI in your `.env` file:
```
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@reelvault-cluster.xxxxx.mongodb.net/reelvault?retryWrites=true&w=majority
```

**Important:** 
- Replace `<username>` with your database username
- Replace `<password>` with your database password
- Add `/reelvault` before the `?` to specify the database name

## 🧪 Test Connection

After updating `.env`, run:
```bash
node server/server.js
```

You should see:
```
Server running on port 5000
MongoDB Connected: reelvault-cluster-shard-00-00.xxxxx.mongodb.net
```

## 📦 Database Collections

Once connected, MongoDB will automatically create these collections:
- `users` - User accounts
- `watchlists` - User movie watchlists
- `ratings` - Movie ratings by users
- `reviews` - Movie reviews by users

## ✅ Step 2 Status: COMPLETE (pending MongoDB credentials)

Ready for Step 3: Authentication Backend once database is connected!
