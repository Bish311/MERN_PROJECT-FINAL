const Rating = require('../models/Rating');

// @desc    Get user ratings
// @route   GET /api/ratings/user/:userId
// @access  Public
const getUserRatings = async (req, res) => {
  try {
    const { userId } = req.params;
    const { page = 1, limit = 20 } = req.query;

    const ratings = await Rating.find({ userId })
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('userId', 'username');

    const total = await Rating.countDocuments({ userId });

    res.json({
      success: true,
      count: ratings.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      data: ratings
    });
  } catch (error) {
    console.error('Get user ratings error:', error.message);
    res.status(500).json({ message: 'Server error while getting user ratings' });
  }
};

// @desc    Get movie ratings
// @route   GET /api/ratings/movie/:movieId
// @access  Public
const getMovieRatings = async (req, res) => {
  try {
    const { movieId } = req.params;
    const { page = 1, limit = 20 } = req.query;

    const ratings = await Rating.find({ movieId })
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('userId', 'username');

    const total = await Rating.countDocuments({ movieId });

    // Calculate average rating
    const avgResult = await Rating.aggregate([
      { $match: { movieId: parseInt(movieId) } },
      { $group: { _id: null, avgRating: { $avg: '$rating' }, count: { $sum: 1 } } }
    ]);

    const averageRating = avgResult.length > 0 ? avgResult[0].avgRating : 0;
    const ratingCount = avgResult.length > 0 ? avgResult[0].count : 0;

    res.json({
      success: true,
      count: ratings.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      averageRating: Math.round(averageRating * 10) / 10, // Round to 1 decimal
      ratingCount,
      data: ratings
    });
  } catch (error) {
    console.error('Get movie ratings error:', error.message);
    res.status(500).json({ message: 'Server error while getting movie ratings' });
  }
};

// @desc    Add or update rating (upsert)
// @route   POST /api/ratings
// @access  Private
const addOrUpdateRating = async (req, res) => {
  try {
    const { movieId, rating } = req.body;
    const userId = req.user._id;

    // Validate required fields
    if (!movieId || !rating) {
      return res.status(400).json({ message: 'Movie ID and rating are required' });
    }

    // Validate rating range
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    // Use upsert to create or update
    const ratingDoc = await Rating.findOneAndUpdate(
      { userId, movieId },
      { 
        userId,
        movieId,
        rating,
        createdAt: new Date()
      },
      { 
        new: true, 
        upsert: true,
        runValidators: true
      }
    ).populate('userId', 'username');

    res.status(201).json({
      success: true,
      data: ratingDoc
    });
  } catch (error) {
    console.error('Add/update rating error:', error.message);
    res.status(500).json({ message: 'Server error while saving rating' });
  }
};

// @desc    Delete rating
// @route   DELETE /api/ratings/:id
// @access  Private
const deleteRating = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    // Find and verify ownership
    const rating = await Rating.findById(id);
    if (!rating) {
      return res.status(404).json({ message: 'Rating not found' });
    }

    if (rating.userId.toString() !== userId.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this rating' });
    }

    // Delete rating
    await Rating.findByIdAndDelete(id);

    res.json({
      success: true,
      message: 'Rating deleted successfully'
    });
  } catch (error) {
    console.error('Delete rating error:', error.message);
    res.status(500).json({ message: 'Server error while deleting rating' });
  }
};

// @desc    Get user's rating for specific movie
// @route   GET /api/ratings/user/:userId/movie/:movieId
// @access  Public
const getUserMovieRating = async (req, res) => {
  try {
    const { userId, movieId } = req.params;

    const rating = await Rating.findOne({ userId, movieId })
      .populate('userId', 'username');

    if (!rating) {
      return res.status(404).json({ message: 'Rating not found' });
    }

    res.json({
      success: true,
      data: rating
    });
  } catch (error) {
    console.error('Get user movie rating error:', error.message);
    res.status(500).json({ message: 'Server error while getting rating' });
  }
};

module.exports = {
  getUserRatings,
  getMovieRatings,
  addOrUpdateRating,
  deleteRating,
  getUserMovieRating
};