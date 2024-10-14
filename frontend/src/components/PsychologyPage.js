// src/components/PsychologyPage.js

import React, { useState } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@mui/material';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import TimerIcon from '@mui/icons-material/Timer';
import AirIcon from '@mui/icons-material/Air';
import HealingIcon from '@mui/icons-material/Healing';
import ReactPlayer from 'react-player';
import ReactAudioPlayer from 'react-audio-player';

const techniques = [
  {
    title: 'Mindfulness Meditation',
    description: 'Practice being present in the moment to reduce stress and improve focus.',
    icon: <SelfImprovementIcon fontSize="large" color="primary" />,
    link: 'https://www.youtube.com/watch?v=Jyy0ra2WcQQ',
  },
  {
    title: 'Physical Exercise',
    description: 'Engage in regular physical activities like jogging or yoga to alleviate stress.',
    icon: <FitnessCenterIcon fontSize="large" color="secondary" />,
    link: 'https://darebee.com/workouts.html',
  },
  {
    title: 'Positive Affirmations',
    description: 'Use positive statements to challenge and overcome negative thoughts.',
    icon: <EmojiEmotionsIcon fontSize="large" color="success" />,
    link: 'https://easy-peasy.ai/templates/affirmation-generator',
  },
  {
    title: 'Pomodoro Technique',
    description: 'Use timed intervals (e.g., 25 minutes of work followed by a 5-minute break) to enhance productivity.',
    icon: <TimerIcon fontSize="large" color="error" />,
    link: 'https://pomofocus.io/',
  },
  {
    title: 'Deep Breathing Exercise',
    description: 'Calm your mind and reduce stress with guided deep breathing.',
    icon: <AirIcon fontSize="large" color="info" />,
    link: '', // Not needed if interactive
    interactive: true, // New property to indicate interactivity
  },
  // Add more techniques as needed
];

const binauralBeats = [
    {
      title: 'Focus and Concentration',
      description: 'Enhance your focus and concentration with this binaural beats track.',
      category: 'Studying',
      spotifyEmbedUrl: 'https://open.spotify.com/embed/track/1zdetTN33t0nM2XpKM1AlP', // Example track ID
    },
    {
      title: 'Deep Relaxation',
      description: 'Achieve deep relaxation and unwind with this soothing binaural beats track.',
      category: 'Relaxing',
      spotifyEmbedUrl: 'https://open.spotify.com/embed/track/3yXBrDKHwps3IPz0M72tus', // Example track ID
    },
    {
      title: 'Meditation',
      description: 'Facilitate your meditation sessions with calming binaural beats.',
      category: 'Meditation',
      spotifyEmbedUrl: 'https://open.spotify.com/embed/track/0Kod8ueTNkHRpHKtYUVhCo', // Example track ID
    },
    // Add more binaural beats as needed
  ];
const PsychologyPage = () => {
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [playing, setPlaying] = useState(null); // For global audio control

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const categories = ['All', 'Studying', 'Relaxing', 'Meditation'];

  const filteredBeats = selectedCategory === 'All'
    ? binauralBeats
    : binauralBeats.filter(beat => beat.category === selectedCategory);

  return (
    <Container maxWidth="lg" style={{ marginTop: '2rem', marginBottom: '2rem' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Psychological Techniques for Stress Relief
      </Typography>
      <Typography variant="subtitle1" align="center" gutterBottom>
        Explore various techniques to help manage and reduce stress effectively.
      </Typography>
      <Box mt={4}>
        <Grid container spacing={4}>
          {techniques.map((technique, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                elevation={3}
                style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                sx={{
                  '&:hover': {
                    boxShadow: 6,
                  },
                }}
              >
                <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
                  {technique.icon}
                </Box>
                <CardContent>
                  <Typography variant="h6" component="div" gutterBottom>
                    {technique.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {technique.description}
                  </Typography>
                </CardContent>
                <Box flexGrow={1} />
                <Box textAlign="center" mb={2}>
                  {technique.interactive ? (
                    <Button variant="contained" color="primary" onClick={handleOpen}>
                      Start Exercise
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      href={technique.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Learn More
                    </Button>
                  )}
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Deep Breathing Exercise Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Deep Breathing Exercise</DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            Follow these steps for a simple deep breathing exercise:
          </Typography>
          <ol>
            <li>Inhale deeply through your nose for 4 seconds.</li>
            <li>Hold your breath for 4 seconds.</li>
            <li>Exhale slowly through your mouth for 6 seconds.</li>
            <li>Repeat this cycle 5 times.</li>
          </ol>
          <Box display="flex" justifyContent="center" mt={2}>
            <Button variant="contained" color="secondary" onClick={handleClose}>
              Done
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Binaural Beats Section */}
      <Box mt={6}>
        <Typography variant="h5" align="center" gutterBottom>
          Binaural Beats for Different Activities
        </Typography>
        <Typography variant="subtitle1" align="center" gutterBottom>
          Listen to binaural beats tailored for various activities to enhance your experience.
        </Typography>
        <Box mt={4}>
          <Grid container spacing={4}>
            {binauralBeats.map((beat, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card elevation={3} style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardContent>
                    <Typography variant="h6" component="div" gutterBottom>
                      {beat.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {beat.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      Category: {beat.category}
                    </Typography>
                  </CardContent>
                  <Box flexGrow={1} />
                  <Box textAlign="center" mb={2}>
                    <iframe
                      src={beat.spotifyEmbedUrl}
                      width="100%"
                      height="80"
                      frameBorder="0"
                      allowtransparency="true"
                      allow="encrypted-media"
                      title={beat.title}
                    ></iframe>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default PsychologyPage;
