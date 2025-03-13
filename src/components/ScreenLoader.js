import React from 'react';
import './ScreenLoader.css';

const LoadingScreen = () => {
  return (
    <div className="loading-overlay">
      <div className="loading-spinner"></div>
    </div>
  );
};

export default LoadingScreen;
