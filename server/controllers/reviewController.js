const Review = require('../models/Review');

// @desc    Get all reviews with pagination
// @route   GET /api/reviews
// @access  Public
const getAllReviews = async (req, res) => {
  try {
    const { page = 1, limit = 10, rating } = req.query;

    // Build query filter
    let query = {};
    if (rating) {
      query.rating = parseInt(rating);
    }

    const reviews = await Review.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('userId', 'username bio');

    const total = await Review.countDocuments(query);

    res.json({
      success: true,
      count: reviews.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      data: reviews
    });
  } catch (error) {
    console.error('Get all reviews error:', error.message);
    res.status(500).json({ message: 'Server error while getting reviews' });
  }
};

// @desc    Get user reviews
// @route   GET /api/reviews/user/:userId
// @access  Public
const getUserReviews = async (req, res) => {
  try {
    const { userId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const reviews = await Review.find({ userId })
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('userId', 'username bio');

    const total = await Review.countDocuments({ userId });

    res.json({
      success: true,
      count: reviews.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      data: reviews
    });
  } catch (error) {
    console.error('Get user reviews error:', error.message);
    res.status(500).json({ message: 'Server error while getting user reviews' });
  }
};

// @desc    Get movie reviews
// @route   GET /api/reviews/movie/:movieId
// @access  Public
const getMovieReviews = async (req, res) => {
  try {
    const { movieId } = req.params;
    const { page = 1, limit = 10, rating } = req.query;

    // Build query
    let query = { movieId: parseInt(movieId) };
    if (rating) {
      query.rating = parseInt(rating);
    }

    const reviews = await Review.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('userId', 'username bio');

    const total = await Review.countDocuments(query);

    res.json({
      success: true,
      count: reviews.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      data: reviews
    });
  } catch (error) {
    console.error('Get movie reviews error:', error.message);
    res.status(500).json({ message: 'Server error while getting movie reviews' });
  }
};

// @desc    Create review
// @route   POST /api/reviews
// @access  Private
const createReview = async (req, res) => {
  try {
    const { movieId, movieTitle, posterPath, reviewText, rating } = req.body;
    const userId = req.user._id;
    const username = req.user.username;

    // Validate required fields
    if (!movieId || !movieTitle || !reviewText || !rating) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Validate rating
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    // Check if user already reviewed this movie
    const existingReview = await Review.findOne({ userId, movieId });
    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this movie' });
    }

    // Create review
    const review = await Review.create({
      userId,
      username,
      movieId,
      movieTitle,
      posterPath: posterPath || '',
      reviewText,
      rating
    });

    // Populate user info
    await review.populate('userId', 'username bio');

    res.status(201).json({
      success: true,
      data: review
    });
  } catch (error) {
    console.error('Create review error:', error.message);
    res.status(500).json({ message: 'Server error while creating review' });
  }
};

// @desc    Update review
// @route   PUT /api/reviews/:id
// @access  Private
const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { reviewText, rating } = req.body;
    const userId = req.user._id;

    // Validate required fields
    if (!reviewText || !rating) {
      return res.status(400).json({ message: 'Review text and rating are required' });
    }

    // Validate rating
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    // Find and verify ownership
    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    if (review.userId.toString() !== userId.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this review' });
    }

    // Update review
    review.reviewText = reviewText;
    review.rating = rating;
    review.updatedAt = new Date();
    await review.save();

    // Populate user info
    await review.populate('userId', 'username bio');

    res.json({
      success: true,
      data: review
    });
  } catch (error) {
    console.error('Update review error:', error.message);
    res.status(500).json({ message: 'Server error while updating review' });
  }
};

// @desc    Delete review
// @route   DELETE /api/reviews/:id
// @access  Private
const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    // Find and verify ownership
    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    if (review.userId.toString() !== userId.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this review' });
    }

    // Delete review
    await Review.findByIdAndDelete(id);

    res.json({
      success: true,
      message: 'Review deleted successfully'
    });
  } catch (error) {
    console.error('Delete review error:', error.message);
    res.status(500).json({ message: 'Server error while deleting review' });
  }
};

module.exports = {
  getAllReviews,
  getUserReviews,
  getMovieReviews,
  createReview,
  updateReview,
  deleteReview
};