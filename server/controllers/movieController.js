const {
  searchMovies,
  getMovieDetails,
  getPopularMovies,
  getTrendingMovies,
  getMovieCredits
} = require('../utils/tmdbService');

// @desc    Search movies
// @route   GET /api/movies/search
// @access  Public
const searchMoviesController = async (req, res) => {
  try {
    const { query, page } = req.query;

    if (!query) {
      return res.status(400).json({ message: 'Search query is required' });
    }

    const data = await searchMovies(query, page);
    res.json(data);
  } catch (error) {
    console.error('Search movies error:', error.message);
    res.status(500).json({ message: 'Server error while searching movies' });
  }
};

// @desc    Get movie details
// @route   GET /api/movies/:movieId
// @access  Public
const getMovieDetailsController = async (req, res) => {
  try {
    const { movieId } = req.params;

    if (!movieId) {
      return res.status(400).json({ message: 'Movie ID is required' });
    }

    const data = await getMovieDetails(movieId);
    res.json(data);
  } catch (error) {
    console.error('Get movie details error:', error.message);
    res.status(500).json({ message: 'Server error while getting movie details' });
  }
};

// @desc    Get popular movies
// @route   GET /api/movies/popular
// @access  Public
const getPopularMoviesController = async (req, res) => {
  try {
    const { page } = req.query;
    const data = await getPopularMovies(page);
    res.json(data);
  } catch (error) {
    console.error('Get popular movies error:', error.message);
    res.status(500).json({ message: 'Server error while getting popular movies' });
  }
};

// @desc    Get trending movies
// @route   GET /api/movies/trending
// @access  Public
const getTrendingMoviesController = async (req, res) => {
  try {
    const { timeWindow } = req.query; // 'day' or 'week'
    const data = await getTrendingMovies(timeWindow);
    res.json(data);
  } catch (error) {
    console.error('Get trending movies error:', error.message);
    res.status(500).json({ message: 'Server error while getting trending movies' });
  }
};

// @desc    Get movie credits
// @route   GET /api/movies/:movieId/credits
// @access  Public
const getMovieCreditsController = async (req, res) => {
  try {
    const { movieId } = req.params;

    if (!movieId) {
      return res.status(400).json({ message: 'Movie ID is required' });
    }

    const data = await getMovieCredits(movieId);
    res.json(data);
  } catch (error) {
    console.error('Get movie credits error:', error.message);
    res.status(500).json({ message: 'Server error while getting movie credits' });
  }
};

module.exports = {
  searchMoviesController,
  getMovieDetailsController,
  getPopularMoviesController,
  getTrendingMoviesController,
  getMovieCreditsController
};