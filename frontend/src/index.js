// src/index.js

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ThemeProviderCustom from './theme'; // Import ThemeProviderCustom
import CssBaseline from '@mui/material/CssBaseline';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProviderCustom>
      <CssBaseline /> {/* Resets CSS to a consistent baseline */}
      <App />
    </ThemeProviderCustom>
  </React.StrictMode>,
  document.getElementById('root')
);
