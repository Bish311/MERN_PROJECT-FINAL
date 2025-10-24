import React from 'react';
import MovieCard from './MovieCard.jsx';

const MovieGrid = ({ 
  movies = [], 
  loading = false, 
  error = null, 
  emptyMessage = "No movies found",
  userWatchlist = []
}) => {
  // Loading state
  if (loading) {
    return (
      <div className="movie-grid-container">
        <div className="movie-grid-loading">
          <div className="loading-content">
            <div className="loading-spinner large"></div>
            <p>Loading movies...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="movie-grid-container">
        <div className="movie-grid-error vintage-card">
          <div className="error-content">
            <span className="error-icon">⚠️</span>
            <h3>Oops! Something went wrong</h3>
            <p>{error}</p>
            <button 
              className="btn btn-primary"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Empty state
  if (!movies || movies.length === 0) {
    return (
      <div className="movie-grid-container">
        <div className="movie-grid-empty vintage-card">
          <div className="empty-content">
            <span className="empty-icon">🎬</span>
            <h3>No Movies Found</h3>
            <p>{emptyMessage}</p>
          </div>
        </div>
      </div>
    );
  }

  // Movies grid
  return (
    <div className="movie-grid-container">
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            userWatchlist={userWatchlist}
          />
        ))}
      </div>
      
      {/* Show count */}
      <div className="movie-grid-footer">
        <p className="movie-count">
          Showing {movies.length} movie{movies.length !== 1 ? 's' : ''}
        </p>
      </div>
    </div>
  );
};

export default MovieGrid;