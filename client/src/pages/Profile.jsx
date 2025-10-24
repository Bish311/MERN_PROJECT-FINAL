import React from 'react';
import { useAuth } from '../context/AuthContext.jsx';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="container">
      <div className="profile-page">
        <h1>User Profile</h1>
        {user && (
          <div className="vintage-card">
            <h2>Welcome, {user.username}!</h2>
            <p><strong>Email:</strong> {user.email}</p>
            {user.bio && <p><strong>Bio:</strong> {user.bio}</p>}
            <p>Profile page features coming soon...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;