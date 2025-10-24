import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { watchlistAPI } from '../../utils/api.js';

const MovieCard = ({ movie, userWatchlist = [] }) => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [isAddingToWatchlist, setIsAddingToWatchlist] = useState(false);

  // TMDB image base URL
  const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
  const TMDB_IMAGE_FALLBACK = 'https://image.tmdb.org/t/p/w500/placeholder.jpg';

  // Extract year from release date
  const getYear = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).getFullYear();
  };

  // Check if movie is in user's watchlist
  useEffect(() => {
    if (userWatchlist && userWatchlist.length > 0) {
      const inWatchlist = userWatchlist.some(
        item => item.movieId === movie.id
      );
      setIsInWatchlist(inWatchlist);
    }
  }, [userWatchlist, movie.id]);

  // Handle click to movie details
  const handleCardClick = (e) => {
    // Don't navigate if clicking on watchlist button
    if (e.target.closest('.watchlist-btn')) {
      return;
    }
    navigate(`/movie/${movie.id}`);
  };

  // Handle add/remove from watchlist
  const handleWatchlistToggle = async (e) => {
    e.stopPropagation();
    
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      setIsAddingToWatchlist(true);

      if (isInWatchlist) {
        // Find the watchlist item and remove it
        const watchlistItem = userWatchlist.find(item => item.movieId === movie.id);
        if (watchlistItem) {
          await watchlistAPI.removeFromWatchlist(watchlistItem._id);
          setIsInWatchlist(false);
        }
      } else {
        // Add to watchlist
        const movieData = {
          movieId: movie.id,
          movieTitle: movie.title,
          posterPath: movie.poster_path,
          status: 'want-to-watch'
        };
        await watchlistAPI.addToWatchlist(movieData);
        setIsInWatchlist(true);
      }
    } catch (error) {
      console.error('Watchlist error:', error);
    } finally {
      setIsAddingToWatchlist(false);
    }
  };

  // Handle image error
  const handleImageError = (e) => {
    e.target.src = '/poster-placeholder.svg'; // Fallback to local placeholder
  };

  const posterUrl = movie.poster_path 
    ? `${TMDB_IMAGE_BASE_URL}${movie.poster_path}`
    : '/poster-placeholder.svg';

  const year = getYear(movie.release_date);

  return (
    <div 
      className="movie-card vintage-card"
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick(e);
        }
      }}
    >
      <div className="movie-poster-container">
        <img
          src={posterUrl}
          alt={`${movie.title} poster`}
          className="movie-poster"
          onError={handleImageError}
          loading="lazy"
        />
        <div className="movie-overlay">
          <div className="movie-rating">
            {movie.vote_average ? (
              <span className="rating-badge">
                ⭐ {movie.vote_average.toFixed(1)}
              </span>
            ) : null}
          </div>
        </div>
      </div>

      <div className="movie-info">
        <h3 className="movie-title" title={movie.title}>
          {movie.title}
        </h3>
        
        <div className="movie-meta">
          {year && (
            <span className="movie-year">{year}</span>
          )}
          {movie.genre_ids && movie.genre_ids.length > 0 && (
            <span className="movie-genres">
              {/* Genre names would require a genre lookup - skip for now */}
            </span>
          )}
        </div>

        {movie.overview && (
          <p className="movie-overview" title={movie.overview}>
            {movie.overview.length > 100 
              ? `${movie.overview.substring(0, 100)}...`
              : movie.overview
            }
          </p>
        )}

        {isAuthenticated && (
          <button
            className={`watchlist-btn ${isInWatchlist ? 'in-watchlist' : 'not-in-watchlist'}`}
            onClick={handleWatchlistToggle}
            disabled={isAddingToWatchlist}
            aria-label={isInWatchlist ? 'Remove from watchlist' : 'Add to watchlist'}
          >
            {isAddingToWatchlist ? (
              <span>⏳</span>
            ) : isInWatchlist ? (
              <span>✓ In Watchlist</span>
            ) : (
              <span>+ Add to Watchlist</span>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default MovieCard;