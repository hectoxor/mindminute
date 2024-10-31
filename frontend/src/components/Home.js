// src/components/Home.js


import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  useTheme, 
  useMediaQuery 
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import ScheduleIcon from '@mui/icons-material/Schedule';
import QuizIcon from '@mui/icons-material/Quiz';
import SchoolIcon from '@mui/icons-material/School';
import SummarizeIcon from '@mui/icons-material/Summarize';
import HomeIllustration from '../logo.svg'; // Replace with your image path
import MotionButton from './AnimatedButton'; 

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 1 }
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 1, delay: 0.5 }
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid 
          container 
          spacing={4} 
          alignItems="center" 
          justifyContent="center"
        >
          <Grid item xs={12} md={6}>
            <motion.div variants={itemVariants}>
              <Typography 
                variant={isMobile ? "h4" : "h3"} 
                component="h1" 
                gutterBottom
                sx={{ color: 'primary.main' }}
              >
                Welcome to MindMinute
              </Typography>
              <Typography variant="h6" paragraph sx={{ color: 'text.secondary' }}>
                Your personal assistant for managing study schedules, generating self-assessment questions, creating flashcards, and summarizing study materials. Achieve your academic goals with ease and efficiency!
              </Typography>
              <Box mt={4}>
                <Grid container spacing={2}>
                  <Grid item>
                    <MotionButton
                      variant="contained"
                      color="primary"
                      size="large"
                      component={RouterLink}
                      to="/ImproveSchedule"
                      startIcon={<ScheduleIcon />}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Improve Schedule
                    </MotionButton>
                  </Grid>
                  <Grid item>
                    <MotionButton
                      variant="outlined"
                      color="primary"
                      size="large"
                      component={RouterLink}
                      to="/Flashcards"
                      startIcon={<QuizIcon />}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Generate Questions
                    </MotionButton>
                  </Grid>
                  <Grid item>
                    <MotionButton
                      variant="outlined"
                      color="primary"
                      size="large"
                      component={RouterLink}
                      to="/PsychologyPage"
                      startIcon={<SchoolIcon />}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Stress Relief
                    </MotionButton>
                  </Grid>
                  <Grid item>
                    <MotionButton
                      variant="outlined"
                      color="primary"
                      size="large"
                      component={RouterLink}
                      to="/NLPForm"
                      startIcon={<SummarizeIcon />}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      AI Therapist
                    </MotionButton>
                  </Grid>
                </Grid>
              </Box>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6}>
            <motion.div
              variants={imageVariants}
            >
              <Box
                component="img"
                src={HomeIllustration}
                alt="Study Illustration"
                sx={{
                  width: '100%',
                  height: isMobile ? 300 : 400,
                  objectFit: 'cover',
                  borderRadius: 2,
                  boxShadow: 3,
                }}
              />
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </motion.div>
  );
};

export default Home;
