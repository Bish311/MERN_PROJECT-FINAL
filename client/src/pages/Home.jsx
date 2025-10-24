import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { movieAPI, watchlistAPI } from '../utils/api.js';
import SearchBar from '../components/Movies/SearchBarWithSuggestions.jsx';
import MovieGrid from '../components/Movies/MovieGrid.jsx';

const Home = () => {
  const { user, isAuthenticated } = useAuth();
  
  // State for different movie sections
  const [searchResults, setSearchResults] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [userWatchlist, setUserWatchlist] = useState([]);
  
  // Loading states
  const [searchLoading, setSearchLoading] = useState(false);
  const [popularLoading, setPopularLoading] = useState(false);
  const [trendingLoading, setTrendingLoading] = useState(false);
  
  // Error states
  const [popularError, setPopularError] = useState('');
  const [trendingError, setTrendingError] = useState('');
  
  // Current view state
  const [currentView, setCurrentView] = useState('browse'); // 'browse' or 'search'

  // Fetch user's watchlist if authenticated
  useEffect(() => {
    const fetchUserWatchlist = async () => {
      if (isAuthenticated && user?.id) {
        try {
          const response = await watchlistAPI.getUserWatchlist(user.id);
          setUserWatchlist(response.data.data || []);
        } catch (error) {
          console.error('Error fetching user watchlist:', error);
        }
      }
    };

    fetchUserWatchlist();
  }, [isAuthenticated, user]);

  // Fetch popular movies on mount
  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        setPopularLoading(true);
        setPopularError('');
        const response = await movieAPI.getPopular();
        console.log('Popular movies response:', response.data);
        setPopularMovies(response.data?.results || []);
      } catch (error) {
        console.error('Error fetching popular movies:', error);
        setPopularError('Failed to load popular movies');
      } finally {
        setPopularLoading(false);
      }
    };

    fetchPopularMovies();
  }, []);

  // Fetch trending movies on mount
  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        setTrendingLoading(true);
        setTrendingError('');
        const response = await movieAPI.getTrending();
        console.log('Trending movies response:', response.data);
        setTrendingMovies(response.data?.results || []);
      } catch (error) {
        console.error('Error fetching trending movies:', error);
        setTrendingError('Failed to load trending movies');
      } finally {
        setTrendingLoading(false);
      }
    };

    fetchTrendingMovies();
  }, []);

  // Handle search results
  const handleSearchResults = (results) => {
    setSearchResults(results);
    setCurrentView(results.length > 0 ? 'search' : 'browse');
  };

  // Handle search loading
  const handleSearchLoading = (loading) => {
    setSearchLoading(loading);
  };

  return (
    <div className="home-page">
      <div className="container">
        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">Welcome to ReelVault</h1>
            <p className="hero-subtitle">
              Discover, track, and review your favorite movies
            </p>
          </div>
        </div>

        {/* Search Section */}
        <div className="search-section">
          <SearchBar 
            onResults={handleSearchResults}
            onLoading={handleSearchLoading}
          />
        </div>

        {/* Content Sections */}
        <div className="content-sections">
          {currentView === 'search' ? (
            /* Search Results */
            <section className="search-results-section">
              <div className="section-header">
                <h2>Search Results</h2>
                <button 
                  className="btn btn-ghost"
                  onClick={() => {
                    setCurrentView('browse');
                    setSearchResults([]);
                  }}
                >
                  Clear Search
                </button>
              </div>
              <MovieGrid 
                movies={searchResults}
                loading={searchLoading}
                emptyMessage="No movies found for your search"
                userWatchlist={userWatchlist}
              />
            </section>
          ) : (
            /* Browse Sections */
            <>
              {/* Popular Movies */}
              <section className="popular-section">
                <div className="section-header">
                  <h2>Popular Movies</h2>
                  <p>What everyone's watching right now</p>
                </div>
                <MovieGrid 
                  movies={popularMovies.slice(0, 12)} // Show first 12
                  loading={popularLoading}
                  error={popularError}
                  emptyMessage="No popular movies available"
                  userWatchlist={userWatchlist}
                />
              </section>

              {/* Trending Movies */}
              <section className="trending-section">
                <div className="section-header">
                  <h2>Trending Today</h2>
                  <p>Movies that are trending right now</p>
                </div>
                <MovieGrid 
                  movies={trendingMovies.slice(0, 12)} // Show first 12
                  loading={trendingLoading}
                  error={trendingError}
                  emptyMessage="No trending movies available"
                  userWatchlist={userWatchlist}
                />
              </section>
            </>
          )}
        </div>

        {/* Call to Action for unauthenticated users */}
        {!isAuthenticated && (
          <div className="cta-section">
            <div className="cta-card vintage-card">
              <h3>Join ReelVault Today</h3>
              <p>
                Create an account to build your personal watchlist, 
                rate movies, and write reviews!
              </p>
              <div className="cta-buttons">
                <a href="/register" className="btn btn-primary">
                  Get Started
                </a>
                <a href="/login" className="btn btn-ghost">
                  Sign In
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;