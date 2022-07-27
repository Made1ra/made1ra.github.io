import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const store = [
  {
    id: '0',
    title: 'The Shawshank Redemption',
    watched: true
  },
  {
    id: '1',
    title: 'The Godfather',
    watched: true
  },
  {
    id: '2',
    title: 'The Dark Knight',
    watched: false
  },
  {
    id: '3',
    title: 'The Godfather Part II',
    watched: true
  }
];

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App movies={store} />
  </React.StrictMode>
);

reportWebVitals();
