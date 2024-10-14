// src/components/Navbar.js

import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ScheduleIcon from '@mui/icons-material/Schedule';
import QuizIcon from '@mui/icons-material/Quiz';
import SchoolIcon from '@mui/icons-material/School';
import SummarizeIcon from '@mui/icons-material/Summarize';
import ThemeToggle from './ThemeToggle'; // Ensure ThemeToggle is correctly implemented
import AnimatedButton from './AnimatedButton'; // Import the AnimatedButton

const Navbar = () => {
  return (
    <AppBar position="static" color="secondary" elevation={0}>
      <Toolbar>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{ flexGrow: 1, color: 'primary.main' }}
        >
          {/* SocAI */}
        </Typography>
        <Box>
          <AnimatedButton
            color="inherit"
            component={RouterLink}
            to="/"
            startIcon={<ScheduleIcon />}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            sx={{ mr: 1 }}
          >
            Home
          </AnimatedButton>
          <AnimatedButton
            color="inherit"
            component={RouterLink}
            to="/ImproveSchedule"
            startIcon={<ScheduleIcon />}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            sx={{ mr: 1 }}
          >
            Improve Schedule
          </AnimatedButton>
          <AnimatedButton
            color="inherit"
            component={RouterLink}
            to="/Flashcards"
            startIcon={<QuizIcon />}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            sx={{ mr: 1 }}
          >
            Generate Flashcards
          </AnimatedButton>
          <AnimatedButton
            color="inherit"
            component={RouterLink}
            to="/PsychologyPage"
            startIcon={<SchoolIcon />}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            sx={{ mr: 1 }}
          >
            Stress Relief
          </AnimatedButton>
          <AnimatedButton
            color="inherit"
            component={RouterLink}
            to="/NLPForm"
            startIcon={<SummarizeIcon />}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            sx={{ mr: 1 }}
          >
            AI Buddy
          </AnimatedButton>
          <ThemeToggle /> {/* Ensure ThemeToggle is correctly implemented */}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
