// src/theme.js

import React, { createContext, useMemo, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Create a context for color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
  mode: 'dark', // Default mode
});

// Function to get design tokens based on mode
const getDesignTokens = (mode) => ({
  palette: {
    mode,
    primary: {
      main: '#1E88E5', // Blue shade
    },
    secondary: {
      main: '#424242', // Grey shade
    },
    background: {
      default: mode === 'dark' ? '#121212' : '#ffffff', // Black or white background
      paper: mode === 'dark' ? '#1D1D1D' : '#f5f5f5', // Slightly lighter black or white for paper components
    },
    text: {
      primary: mode === 'dark' ? '#FFFFFF' : '#000000', // White or black text
      secondary: mode === 'dark' ? '#B0BEC5' : '#424242', // Light grey or dark grey text
    },
  },
  typography: {
    h3: {
      fontWeight: 700,
      color: '#1E88E5', // Blue color for headers
    },
    h4: {
      fontWeight: 700,
      color: mode === 'dark' ? '#FFFFFF' : '#1E88E5', // White or blue color for smaller headers
    },
    body1: {
      color: mode === 'dark' ? '#B0BEC5' : '#424242', // Light grey or dark grey for body text
    },
    button: {
      textTransform: 'none', // Disable uppercase on buttons
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    // Add more component overrides if needed
  },
});

// ThemeProviderCustom component
const ThemeProviderCustom = ({ children }) => {
  const [mode, setMode] = useState('dark'); // Default to dark mode

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
      mode, // Expose current mode
    }),
    [mode]
  );

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default ThemeProviderCustom;
