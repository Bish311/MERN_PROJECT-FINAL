import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.PROD || window.location.hostname !== 'localhost'
    ? 'https://reelvault-back.onrender.com/api'
    : 'http://127.0.0.1:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token to headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common error scenarios
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    
    // Return a consistent error format
    const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
    return Promise.reject(new Error(errorMessage));
  }
);

// API service functions
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  verify: () => api.get('/auth/verify'),
};

export const movieAPI = {
  search: (query) => api.get(`/movies/search?query=${encodeURIComponent(query)}`),
  getDetails: (movieId) => api.get(`/movies/${movieId}`),
  getPopular: () => api.get('/movies/popular'),
  getTrending: () => api.get('/movies/trending'),
  getCredits: (movieId) => api.get(`/movies/${movieId}/credits`),
};

export const watchlistAPI = {
  getUserWatchlist: (userId) => api.get(`/watchlist/${userId}`),
  addToWatchlist: (movieData) => api.post('/watchlist', movieData),
  updateStatus: (itemId, status) => api.patch(`/watchlist/${itemId}`, { status }),
  removeFromWatchlist: (itemId) => api.delete(`/watchlist/${itemId}`),
};

export const ratingAPI = {
  getUserRatings: (userId) => api.get(`/ratings/user/${userId}`),
  getMovieRatings: (movieId) => api.get(`/ratings/movie/${movieId}`),
  getUserMovieRating: (movieId) => api.get(`/ratings/user-movie/${movieId}`),
  addOrUpdateRating: (ratingData) => api.post('/ratings', ratingData),
  deleteRating: (ratingId) => api.delete(`/ratings/${ratingId}`),
};

export const reviewAPI = {
  getAllReviews: (page = 1, limit = 10) => api.get(`/reviews?page=${page}&limit=${limit}`),
  getUserReviews: (userId) => api.get(`/reviews/user/${userId}`),
  getMovieReviews: (movieId) => api.get(`/reviews/movie/${movieId}`),
  createReview: (reviewData) => api.post('/reviews', reviewData),
  updateReview: (reviewId, reviewData) => api.put(`/reviews/${reviewId}`, reviewData),
  deleteReview: (reviewId) => api.delete(`/reviews/${reviewId}`),
};

// Utility functions for error handling
export const handleApiError = (error) => {
  console.error('API Error:', error);
  return {
    success: false,
    error: error.message || 'An unexpected error occurred',
  };
};

export const handleApiSuccess = (data) => {
  return {
    success: true,
    data: data,
  };
};

// Export the configured axios instance as default
export default api;