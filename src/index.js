import './my-sass.scss';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <head>
      <link rel="icon" href="/favicon.ico" />
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      <link rel="apple-touch-icon" href="/icon-apple-touch.png" />
      <link rel="manifest" href="/manifest.json" />
    </head>
    <App />
  </React.StrictMode>,
);
