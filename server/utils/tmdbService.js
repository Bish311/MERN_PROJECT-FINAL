const axios = require('axios');

// Create axios instance for TMDB API
const tmdbApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: process.env.TMDB_API_KEY
  }
});

// Search movies by query
const searchMovies = async (query, page = 1) => {
  try {
    const response = await tmdbApi.get('/search/movie', {
      params: { query, page }
    });
    return response.data;
  } catch (error) {
    console.error('Error searching movies:', error.message);
    throw new Error('Failed to search movies');
  }
};

// Get movie details by ID
const getMovieDetails = async (movieId) => {
  try {
    const response = await tmdbApi.get(`/movie/${movieId}`);
    return response.data;
  } catch (error) {
    console.error('Error getting movie details:', error.message);
    throw new Error('Failed to get movie details');
  }
};

// Get popular movies
const getPopularMovies = async (page = 1) => {
  try {
    const response = await tmdbApi.get('/movie/popular', {
      params: { page }
    });
    return response.data;
  } catch (error) {
    console.error('Error getting popular movies:', error.message);
    throw new Error('Failed to get popular movies');
  }
};

// Get trending movies (daily)
const getTrendingMovies = async (timeWindow = 'day') => {
  try {
    const response = await tmdbApi.get(`/trending/movie/${timeWindow}`);
    return response.data;
  } catch (error) {
    console.error('Error getting trending movies:', error.message);
    throw new Error('Failed to get trending movies');
  }
};

// Get movie credits (cast and crew)
const getMovieCredits = async (movieId) => {
  try {
    const response = await tmdbApi.get(`/movie/${movieId}/credits`);
    return response.data;
  } catch (error) {
    console.error('Error getting movie credits:', error.message);
    throw new Error('Failed to get movie credits');
  }
};

module.exports = {
  searchMovies,
  getMovieDetails,
  getPopularMovies,
  getTrendingMovies,
  getMovieCredits
};