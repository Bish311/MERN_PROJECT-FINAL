import React from 'react';

const NotFound = () => {
  return (
    <div className="container">
      <div className="not-found-page">
        <div className="vintage-card" style={{ textAlign: 'center' }}>
          <h1>404</h1>
          <h2>Page Not Found</h2>
          <p>The page you're looking for doesn't exist.</p>
          <a href="/" className="btn btn-primary">Go Home</a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;