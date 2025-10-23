const mongoose = require('mongoose');

const watchlistSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  movieId: {
    type: Number,
    required: [true, 'Movie ID is required']
  },
  movieTitle: {
    type: String,
    required: [true, 'Movie title is required']
  },
  posterPath: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['want-to-watch', 'watched'],
    default: 'want-to-watch'
  },
  addedAt: {
    type: Date,
    default: Date.now
  }
});

// Compound index to prevent duplicate entries
watchlistSchema.index({ userId: 1, movieId: 1 }, { unique: true });

module.exports = mongoose.model('Watchlist', watchlistSchema);
