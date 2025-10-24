import React, { useState, useCallback, useRef, useEffect } from 'react';
import { movieAPI } from '../../utils/api.js';

const SearchBar = ({ onResults, onLoading }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const timeoutRef = useRef(null);
  const suggestionTimeoutRef = useRef(null);
  const searchBarRef = useRef(null);

  // Debounce utility function
  const debounce = (func, delay) => {
    return (...args) => {
      const timeoutId = delay === 200 ? suggestionTimeoutRef : timeoutRef;
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
      timeoutId.current = setTimeout(() => func.apply(null, args), delay);
    };
  };

  // Search for suggestions (faster for instant feedback)
  const searchSuggestions = useCallback(
    debounce(async (searchQuery) => {
      if (!searchQuery.trim() || searchQuery.length < 2) {
        setSuggestions([]);
        setShowSuggestions(false);
        return;
      }

      try {
        const response = await movieAPI.search(searchQuery);
        const results = response.data?.results || [];
        // Show only first 5 suggestions for dropdown
        setSuggestions(results.slice(0, 5));
        setShowSuggestions(results.length > 0);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 200), // Faster for suggestions
    []
  );

  // Search for full results (slower to prevent too many requests)
  const searchMovies = useCallback(
    debounce(async (searchQuery) => {
      if (!searchQuery.trim()) {
        onResults([]);
        onLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError('');
        onLoading(true);
        
        const response = await movieAPI.search(searchQuery);
        const results = response.data?.results || [];
        console.log('Search results:', results);
        onResults(results);
      } catch (error) {
        console.error('Error searching movies:', error);
        setError('Failed to search movies');
        onResults([]);
      } finally {
        setIsLoading(false);
        onLoading(false);
      }
    }, 500), // Slower for full search
    [onResults, onLoading]
  );

  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    
    // Show suggestions as user types (fast)
    searchSuggestions(value);
    
    // Perform full search (slower)
    searchMovies(value);
  };

  // Handle suggestion click
  const handleSuggestionClick = (movie) => {
    setQuery(movie.title);
    setShowSuggestions(false);
    // Trigger immediate full search for this movie
    onLoading(true);
    movieAPI.search(movie.title)
      .then(response => {
        const results = response.data?.results || [];
        onResults(results);
      })
      .catch(error => {
        console.error('Error searching selected movie:', error);
        setError('Failed to search movies');
        onResults([]);
      })
      .finally(() => {
        onLoading(false);
      });
  };

  // Handle clear
  const handleClear = () => {
    setQuery('');
    setSuggestions([]);
    setShowSuggestions(false);
    onResults([]);
    onLoading(false);
    setError('');
  };

  // Handle key navigation in suggestions
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="search-bar-container" ref={searchBarRef}>
      <div className="search-bar">
        <div className="search-container">
          <div className="search-input-wrapper">
            <div className="search-icon">
              🔍
            </div>
            <input
              type="text"
              placeholder="Search for movies... (try typing 'Du' for Dune)"
              value={query}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="search-input"
              autoComplete="off"
              onFocus={() => query && suggestions.length > 0 && setShowSuggestions(true)}
            />
            {query && (
              <button
                type="button"
                onClick={handleClear}
                className="search-clear"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
            {isLoading && (
              <div className="search-loading">
                <div className="loading-spinner"></div>
              </div>
            )}
          </div>
          
          {error && (
            <div className="search-error">
              {error}
            </div>
          )}
        </div>
        
        {/* Suggestions Dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="suggestions-dropdown">
            {suggestions.map((movie) => (
              <div
                key={movie.id}
                className="suggestion-item"
                onClick={() => handleSuggestionClick(movie)}
              >
                <div className="suggestion-poster">
                  {movie.poster_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                      alt={movie.title}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div className="poster-placeholder" style={{display: movie.poster_path ? 'none' : 'flex'}}>
                    🎬
                  </div>
                </div>
                <div className="suggestion-info">
                  <div className="suggestion-title">{movie.title}</div>
                  <div className="suggestion-year">
                    {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
                    {movie.vote_average > 0 && (
                      <span className="suggestion-rating"> • ⭐ {movie.vote_average.toFixed(1)}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;