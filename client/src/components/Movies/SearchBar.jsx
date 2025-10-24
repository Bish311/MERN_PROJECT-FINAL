import React, { useState, useEffect, useCallback } from 'react';
import { movieAPI } from '../../utils/api.js';

const SearchBar = ({ onResults, onLoading }) => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce(async (searchQuery) => {
      if (!searchQuery.trim()) {
        onResults([]);
        return;
      }

      try {
        setIsLoading(true);
        setError('');
        onLoading?.(true);

        const response = await movieAPI.search(searchQuery);
        console.log('Search response:', response.data);
        onResults(response.data?.results || []);
      } catch (error) {
        console.error('Search error:', error);
        setError('Failed to search movies. Please try again.');
        onResults([]);
      } finally {
        setIsLoading(false);
        onLoading?.(false);
      }
    }, 500),
    [onResults, onLoading]
  );

  // Effect for debounced search
  useEffect(() => {
    debouncedSearch(query);
    
    // Cleanup function to cancel pending debounced calls
    return () => {
      debouncedSearch.cancel?.();
    };
  }, [query, debouncedSearch]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleClear = () => {
    setQuery('');
    onResults([]);
  };

  return (
    <div className="search-bar">
      <div className="search-container">
        <div className="search-input-wrapper">
          <div className="search-icon">
            🔍
          </div>
          <input
            type="text"
            placeholder="Search for movies..."
            value={query}
            onChange={handleInputChange}
            className="search-input"
            autoComplete="off"
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
    </div>
  );
};

// Debounce utility function
function debounce(func, wait) {
  let timeout;
  
  const debounced = function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
  
  debounced.cancel = function() {
    clearTimeout(timeout);
  };
  
  return debounced;
}

export default SearchBar;