import React from 'react';
import { Link } from 'react-router-dom';
import './index.css'; 

const NotFound = () => {
  return (
    <div className="not-found-container">
      <img
        src="https://via.placeholder.com/400x300?text=Image+Not+Found"
        alt="Not Found"
        className="not-found-image"
      />
      <h1 className="not-found-title">Page Not Found</h1>
      <p className="not-found-description">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link to="/" className="go-home-button">
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
