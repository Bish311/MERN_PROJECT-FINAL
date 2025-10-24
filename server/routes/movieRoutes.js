const express = require('express');
const router = express.Router();
const {
  searchMoviesController,
  getMovieDetailsController,
  getPopularMoviesController,
  getTrendingMoviesController,
  getMovieCreditsController
} = require('../controllers/movieController');

// @route   GET /api/movies/search
// @desc    Search movies by query
// @access  Public
router.get('/search', searchMoviesController);

// @route   GET /api/movies/popular
// @desc    Get popular movies
// @access  Public
router.get('/popular', getPopularMoviesController);

// @route   GET /api/movies/trending
// @desc    Get trending movies
// @access  Public
router.get('/trending', getTrendingMoviesController);

// @route   GET /api/movies/:movieId
// @desc    Get movie details by ID
// @access  Public
router.get('/:movieId', getMovieDetailsController);

// @route   GET /api/movies/:movieId/credits
// @desc    Get movie credits (cast and crew)
// @access  Public
router.get('/:movieId/credits', getMovieCreditsController);

module.exports = router;