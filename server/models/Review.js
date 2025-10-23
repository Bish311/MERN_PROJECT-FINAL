const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    username: {
      type: String,
      required: [true, 'Username is required']
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
    reviewText: {
      type: String,
      required: [true, 'Review text is required'],
      minlength: [10, 'Review must be at least 10 characters'],
      maxlength: [2000, 'Review cannot exceed 2000 characters']
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot exceed 5']
    }
  },
  {
    timestamps: true
  }
);

// Index for querying reviews by user and movie
reviewSchema.index({ userId: 1 });
reviewSchema.index({ movieId: 1 });

module.exports = mongoose.model('Review', reviewSchema);
