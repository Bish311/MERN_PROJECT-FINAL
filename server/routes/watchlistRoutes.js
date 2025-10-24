const express = require('express');
const router = express.Router();
const {
  getUserWatchlist,
  addToWatchlist,
  updateWatchlistStatus,
  removeFromWatchlist
} = require('../controllers/watchlistController');
const auth = require('../middleware/auth');

// @route   GET /api/watchlist/:userId
// @desc    Get user watchlist (with optional status filter)
// @access  Private
router.get('/:userId', auth, getUserWatchlist);

// @route   POST /api/watchlist
// @desc    Add movie to watchlist
// @access  Private
router.post('/', auth, addToWatchlist);

// @route   PATCH /api/watchlist/:id
// @desc    Update watchlist item status
// @access  Private
router.patch('/:id', auth, updateWatchlistStatus);

// @route   DELETE /api/watchlist/:id
// @desc    Remove movie from watchlist
// @access  Private
router.delete('/:id', auth, removeFromWatchlist);

module.exports = router;