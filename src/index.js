import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// This is the main part of the project of frontend , so here we will just call APP function, it combines everything.

const root = ReactDOM.createRoot(document.getElementById('root'));          // Create a root element for rendering React Components
root.render(                                                                // Rendering "App" component inside the root element
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
