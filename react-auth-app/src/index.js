import React from 'react';
import ReactDOM from 'react-dom/client';  // Import the new 'root' API
import './index.css';
import App from './App';

// Create the root for React 18
const root = ReactDOM.createRoot(document.getElementById('root'));

// Use root.render() to render the App component
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
