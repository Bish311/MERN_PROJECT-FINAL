const express = require('express');
const router = express.Router();
const {
  getUserRatings,
  getMovieRatings,
  addOrUpdateRating,
  deleteRating,
  getUserMovieRating
} = require('../controllers/ratingController');
const auth = require('../middleware/auth');

// @route   GET /api/ratings/user/:userId
// @desc    Get all ratings by user
// @access  Public
router.get('/user/:userId', getUserRatings);

// @route   GET /api/ratings/movie/:movieId
// @desc    Get all ratings for a movie with average
// @access  Public
router.get('/movie/:movieId', getMovieRatings);

// @route   GET /api/ratings/user/:userId/movie/:movieId
// @desc    Get specific user's rating for a movie
// @access  Public
router.get('/user/:userId/movie/:movieId', getUserMovieRating);

// @route   POST /api/ratings
// @desc    Add or update rating (upsert)
// @access  Private
router.post('/', auth, addOrUpdateRating);

// @route   DELETE /api/ratings/:id
// @desc    Delete rating
// @access  Private
router.delete('/:id', auth, deleteRating);

module.exports = router;