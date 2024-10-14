// src/components/Footer.js

import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box 
      sx={{ 
        bgcolor: 'secondary.main', 
        color: 'text.primary', 
        p: 3, 
        mt: 'auto' 
      }}
      component="footer"
    >
      <Typography variant="body2" align="center">
        © {new Date().getFullYear()} SocAI. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
