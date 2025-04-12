import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { SearchResultsProvider } from './contexts/SearchResultsContext';

ReactDOM.render(
  <SearchResultsProvider>
    <Router>
      <App />
    </Router>
  </SearchResultsProvider>,
  document.getElementById('root')
);
