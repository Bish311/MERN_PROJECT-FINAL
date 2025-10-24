import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import ThemeToggle from './ThemeToggle.jsx';
import './Navbar.css';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    setShowMobileMenu(false);
    navigate('/');
  };

  const handleNavClick = () => {
    setShowMobileMenu(false);
    setShowUserMenu(false);
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo" onClick={handleNavClick}>
          <span className="logo-icon">🎬</span>
          <span className="logo-text">ReelVault</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="navbar-nav desktop-nav">
          <Link 
            to="/" 
            className={`nav-link ${isActivePath('/') ? 'active' : ''}`}
            onClick={handleNavClick}
          >
            Home
          </Link>
          
          {isAuthenticated && (
            <>
              <Link 
                to="/profile" 
                className={`nav-link ${isActivePath('/profile') ? 'active' : ''}`}
                onClick={handleNavClick}
              >
                Profile
              </Link>
              <Link 
                to="/reviews" 
                className={`nav-link ${isActivePath('/reviews') ? 'active' : ''}`}
                onClick={handleNavClick}
              >
                Reviews
              </Link>
            </>
          )}
        </div>

        {/* Right side controls */}
        <div className="navbar-controls">
          <ThemeToggle />

          {isAuthenticated ? (
            <div className="user-menu-container">
              <button 
                className="user-menu-trigger"
                onClick={() => setShowUserMenu(!showUserMenu)}
                aria-label="User menu"
              >
                <span className="user-avatar">
                  {user?.username?.charAt(0).toUpperCase() || 'U'}
                </span>
                <span className="user-name">{user?.username}</span>
                <svg 
                  className={`dropdown-arrow ${showUserMenu ? 'open' : ''}`}
                  width="12" 
                  height="12" 
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                >
                  <path d="M7 10l5 5 5-5z"/>
                </svg>
              </button>

              {showUserMenu && (
                <div className="user-menu-dropdown">
                  <Link to="/profile" className="dropdown-item" onClick={handleNavClick}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                    Profile
                  </Link>
                  <button className="dropdown-item logout-btn" onClick={handleLogout}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.59L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
                    </svg>
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="btn btn-ghost" onClick={handleNavClick}>
                Login
              </Link>
              <Link to="/register" className="btn btn-primary" onClick={handleNavClick}>
                Register
              </Link>
            </div>
          )}

          {/* Mobile menu button */}
          <button 
            className="mobile-menu-btn"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            aria-label="Toggle mobile menu"
          >
            <div className={`hamburger ${showMobileMenu ? 'open' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        {showMobileMenu && (
          <div className="mobile-nav">
            <Link 
              to="/" 
              className={`mobile-nav-link ${isActivePath('/') ? 'active' : ''}`}
              onClick={handleNavClick}
            >
              Home
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link 
                  to="/profile" 
                  className={`mobile-nav-link ${isActivePath('/profile') ? 'active' : ''}`}
                  onClick={handleNavClick}
                >
                  Profile
                </Link>
                <Link 
                  to="/reviews" 
                  className={`mobile-nav-link ${isActivePath('/reviews') ? 'active' : ''}`}
                  onClick={handleNavClick}
                >
                  Reviews
                </Link>
                <button className="mobile-nav-link logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="mobile-nav-link" onClick={handleNavClick}>
                  Login
                </Link>
                <Link to="/register" className="mobile-nav-link" onClick={handleNavClick}>
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;