const express = require('express');
const router = express.Router();
const {
  getAllReviews,
  getUserReviews,
  getMovieReviews,
  createReview,
  updateReview,
  deleteReview
} = require('../controllers/reviewController');
const auth = require('../middleware/auth');

// @route   GET /api/reviews
// @desc    Get all reviews with pagination and optional rating filter
// @access  Public
router.get('/', getAllReviews);

// @route   GET /api/reviews/user/:userId
// @desc    Get all reviews by user
// @access  Public
router.get('/user/:userId', getUserReviews);

// @route   GET /api/reviews/movie/:movieId
// @desc    Get all reviews for a movie
// @access  Public
router.get('/movie/:movieId', getMovieReviews);

// @route   POST /api/reviews
// @desc    Create new review
// @access  Private
router.post('/', auth, createReview);

// @route   PUT /api/reviews/:id
// @desc    Update review
// @access  Private
router.put('/:id', auth, updateReview);

// @route   DELETE /api/reviews/:id
// @desc    Delete review
// @access  Private
router.delete('/:id', auth, deleteReview);

module.exports = router;