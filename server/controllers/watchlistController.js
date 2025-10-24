const Watchlist = require('../models/Watchlist');

// @desc    Get user watchlist
// @route   GET /api/watchlist/:userId
// @access  Private
const getUserWatchlist = async (req, res) => {
  try {
    const { userId } = req.params;
    const { status } = req.query; // Optional filter by status

    // Build query
    let query = { userId };
    if (status) {
      query.status = status;
    }

    const watchlist = await Watchlist.find(query)
      .sort({ addedAt: -1 }) // Most recent first
      .populate('userId', 'username');

    res.json({
      success: true,
      count: watchlist.length,
      data: watchlist
    });
  } catch (error) {
    console.error('Get user watchlist error:', error.message);
    res.status(500).json({ message: 'Server error while getting watchlist' });
  }
};

// @desc    Add movie to watchlist
// @route   POST /api/watchlist
// @access  Private
const addToWatchlist = async (req, res) => {
  try {
    const { movieId, movieTitle, posterPath, status = 'want-to-watch' } = req.body;
    const userId = req.user._id;

    // Validate required fields
    if (!movieId || !movieTitle) {
      return res.status(400).json({ message: 'Movie ID and title are required' });
    }

    // Check if movie already in watchlist
    const existingEntry = await Watchlist.findOne({ userId, movieId });
    if (existingEntry) {
      return res.status(400).json({ message: 'Movie already in watchlist' });
    }

    // Create new watchlist entry
    const watchlistItem = await Watchlist.create({
      userId,
      movieId,
      movieTitle,
      posterPath: posterPath || '',
      status
    });

    res.status(201).json({
      success: true,
      data: watchlistItem
    });
  } catch (error) {
    console.error('Add to watchlist error:', error.message);
    res.status(500).json({ message: 'Server error while adding to watchlist' });
  }
};

// @desc    Update watchlist status
// @route   PATCH /api/watchlist/:id
// @access  Private
const updateWatchlistStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const userId = req.user._id;

    // Validate status
    if (!['want-to-watch', 'watched'].includes(status)) {
      return res.status(400).json({ message: 'Status must be want-to-watch or watched' });
    }

    // Find and verify ownership
    const watchlistItem = await Watchlist.findById(id);
    if (!watchlistItem) {
      return res.status(404).json({ message: 'Watchlist item not found' });
    }

    if (watchlistItem.userId.toString() !== userId.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this item' });
    }

    // Update status
    watchlistItem.status = status;
    await watchlistItem.save();

    res.json({
      success: true,
      data: watchlistItem
    });
  } catch (error) {
    console.error('Update watchlist status error:', error.message);
    res.status(500).json({ message: 'Server error while updating watchlist' });
  }
};

// @desc    Remove movie from watchlist
// @route   DELETE /api/watchlist/:id
// @access  Private
const removeFromWatchlist = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    // Find and verify ownership
    const watchlistItem = await Watchlist.findById(id);
    if (!watchlistItem) {
      return res.status(404).json({ message: 'Watchlist item not found' });
    }

    if (watchlistItem.userId.toString() !== userId.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this item' });
    }

    // Remove item
    await Watchlist.findByIdAndDelete(id);

    res.json({
      success: true,
      message: 'Movie removed from watchlist'
    });
  } catch (error) {
    console.error('Remove from watchlist error:', error.message);
    res.status(500).json({ message: 'Server error while removing from watchlist' });
  }
};

module.exports = {
  getUserWatchlist,
  addToWatchlist,
  updateWatchlistStatus,
  removeFromWatchlist
};